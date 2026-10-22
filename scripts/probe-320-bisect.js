// 320px bisect: find WHICH element expands the layout viewport from 320 to 329.
//
// Method: at 320px, enumerate every element whose border box extends past the
// viewport, then hide each one in isolation and re-measure window.innerWidth.
// If hiding element X collapses innerWidth 329 -> 320, X is the cause.
// Also reports the nearest clipping ancestor, so we can tell which overflow is
// already neutralised by overflow-x: clip / hidden.
const http = require("http");

const CDP = Number(process.env.CDP_PORT || 9333);
const TARGET_URL = process.env.TARGET_URL || "http://127.0.0.1:3040";
const W = Number(process.env.PROBE_WIDTH || 320);
const H = Number(process.env.PROBE_HEIGHT || 800);
const MOBILE = process.env.PROBE_MOBILE !== "false";

function httpJson(p, method = "GET") {
  return new Promise((resolve, reject) => {
    const req = http.request({ host: "127.0.0.1", port: CDP, path: p, method }, (res) => {
      let d = "";
      res.on("data", (c) => (d += c));
      res.on("end", () => { try { resolve(JSON.parse(d)); } catch (e) { resolve({ raw: d }); } });
    });
    req.on("error", reject);
    req.end();
  });
}

function connect(url) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(url);
    let id = 0;
    const pending = new Map();
    ws.addEventListener("open", () => resolve({
      ws,
      send(method, params = {}) {
        const mid = ++id;
        ws.send(JSON.stringify({ id: mid, method, params }));
        return new Promise((res, rej) => {
          pending.set(mid, { res, rej });
          setTimeout(() => { if (pending.has(mid)) { pending.delete(mid); rej(new Error("timeout " + method)); } }, 45000);
        });
      },
    }));
    ws.addEventListener("error", reject);
    ws.addEventListener("message", (ev) => {
      const m = JSON.parse(ev.data);
      if (m.id && pending.has(m.id)) {
        const { res, rej } = pending.get(m.id);
        pending.delete(m.id);
        m.error ? rej(new Error(JSON.stringify(m.error))) : res(m.result);
      }
    });
  });
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const BRIEF = `(() => {
  const de = document.documentElement, b = document.body;
  return {
    inner: window.innerWidth,
    client: de.clientWidth,
    docScroll: de.scrollWidth,
    bodyScroll: b.scrollWidth,
    bodyBoxW: Math.round(b.getBoundingClientRect().width * 100) / 100,
  };
})()`;

// Tag each candidate with a unique id so we can hide it precisely.
const TAG = `(() => {
  const de = document.documentElement;
  const limit = de.clientWidth;
  const out = [];
  let n = 0;
  for (const el of document.querySelectorAll("*")) {
    const r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) continue;
    if (r.right <= limit + 0.5 && r.left >= -0.5) continue;
    const id = "__bs" + (n++);
    el.setAttribute("data-bs-id", id);
    // nearest ancestor that clips horizontally
    let clipper = null, p = el.parentElement;
    while (p) {
      const cs = getComputedStyle(p);
      if (cs.overflowX === "hidden" || cs.overflowX === "clip" || cs.overflowX === "auto" || cs.overflowX === "scroll") {
        clipper = p.tagName.toLowerCase() + (p.id ? "#" + p.id : "") +
          (typeof p.className === "string" && p.className.trim() ? "." + p.className.trim().split(/\\s+/).slice(0,3).join(".") : "") +
          "[" + cs.overflowX + "]";
        break;
      }
      p = p.parentElement;
    }
    out.push({
      id,
      tag: el.tagName,
      cls: (typeof el.className === "string" ? el.className : "").slice(0, 80),
      left: Math.round(r.left * 10) / 10,
      right: Math.round(r.right * 10) / 10,
      w: Math.round(r.width * 10) / 10,
      pos: getComputedStyle(el).position,
      clipper,
    });
  }
  out.sort((a, z) => z.right - a.right);
  return out;
})()`;

(async () => {
  const created = await httpJson("/json/new?about:blank", "PUT");
  const target = created.webSocketDebuggerUrl ? created : (await httpJson("/json/list")).find((t) => t.type === "page");
  const tab = await connect(target.webSocketDebuggerUrl);
  await tab.send("Page.enable");
  await tab.send("Runtime.enable");
  await tab.send("Emulation.setDeviceMetricsOverride", { width: W, height: H, deviceScaleFactor: 1, mobile: MOBILE });
  await tab.send("Page.navigate", { url: TARGET_URL });
  await sleep(4000);

  const ev = async (expr) => {
    const r = await tab.send("Runtime.evaluate", { expression: expr, returnByValue: true, awaitPromise: true });
    return r.result && r.result.value;
  };

  console.log("TARGET:", TARGET_URL, "W=" + W, "mobile=" + MOBILE);
  console.log("baseline:", JSON.stringify(await ev(BRIEF)));

  const cands = await ev(TAG);
  console.log("\ncandidates extending past viewport: " + cands.length);
  for (const c of cands) {
    console.log("  " + c.id.padEnd(7) + c.tag.padEnd(7) + "L=" + String(c.left).padStart(7) +
      " R=" + String(c.right).padStart(7) + " w=" + String(c.w).padStart(7) +
      " pos=" + c.pos.padEnd(9) + " clip=" + (c.clipper || "NONE"));
    console.log("         cls: " + c.cls);
  }

  console.log("\n--- hide each candidate individually, re-measure ---");
  const results = [];
  for (const c of cands) {
    await ev(`(() => { const el = document.querySelector('[data-bs-id="${c.id}"]'); if (el) el.style.display = 'none'; return true; })()`);
    await sleep(220);
    const m = await ev(BRIEF);
    await ev(`(() => { const el = document.querySelector('[data-bs-id="${c.id}"]'); if (el) el.style.display = ''; return true; })()`);
    await sleep(160);
    results.push({ c, m });
    console.log("  hide " + c.id.padEnd(7) + c.tag.padEnd(7) +
      " -> inner=" + String(m.inner).padStart(4) +
      " client=" + String(m.client).padStart(4) +
      " docScroll=" + String(m.docScroll).padStart(4) +
      " bodyScroll=" + String(m.bodyScroll).padStart(4) +
      " bodyBoxW=" + String(m.bodyBoxW).padStart(6) +
      (m.inner === W ? "   <<< COLLAPSES TO 320" : ""));
  }

  // Also test hiding whole subtrees of the top-level sections one at a time.
  console.log("\n--- hide top-level sections one at a time ---");
  const sections = await ev(`(() => Array.from(document.body.children).map((el,i) => ({
    i, tag: el.tagName, id: el.id||"", cls: (typeof el.className==='string'?el.className:'').slice(0,60)
  })))()`);
  for (const s of sections) {
    await ev(`(() => { const el = document.body.children[${s.i}]; if (el) el.style.display='none'; return true; })()`);
    await sleep(240);
    const m = await ev(BRIEF);
    await ev(`(() => { const el = document.body.children[${s.i}]; if (el) el.style.display=''; return true; })()`);
    await sleep(160);
    console.log("  hide body[" + s.i + "] " + (s.tag + (s.id ? "#" + s.id : "") + " ." + s.cls).padEnd(52) +
      " -> inner=" + String(m.inner).padStart(4) + " docScroll=" + String(m.docScroll).padStart(4) +
      (m.inner === W ? "   <<< COLLAPSES TO 320" : ""));
  }

  tab.ws.close();
  process.exit(0);
})().catch((e) => { console.error("FATAL", e); process.exit(1); });
