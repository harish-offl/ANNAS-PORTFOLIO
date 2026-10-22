// Is the innerWidth(329) - clientWidth(320) delta the vertical scrollbar?
//
// Tests, in order:
//  A. Measure the real scrollbar width using the standard offsetWidth-clientWidth trick.
//  B. Compare innerWidth against clientWidth + scrollbarWidth.
//  C. Make the page SHORT (no vertical overflow) -> if innerWidth drops to 320
//     the delta is definitively the scrollbar.
//  D. Same test with mobile:false emulation for comparison.
//  E. NO-OP mutation: force a pure reflow without changing layout and see
//     whether innerWidth flips (which would prove a measurement artefact).
const http = require("http");

const CDP = Number(process.env.CDP_PORT || 9333);
const TARGET_URL = process.env.TARGET_URL || "http://127.0.0.1:3040";
const W = Number(process.env.PROBE_WIDTH || 320);
const H = Number(process.env.PROBE_HEIGHT || 800);

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

const SCROLLBAR_W = `(() => {
  const d = document.createElement("div");
  d.style.cssText = "position:absolute;top:-9999px;left:-9999px;width:100px;height:100px;overflow:scroll";
  document.body.appendChild(d);
  const w = d.offsetWidth - d.clientWidth;
  d.remove();
  return w;
})()`;

const SNAP = `(() => {
  const de = document.documentElement, b = document.body;
  return {
    inner: window.innerWidth,
    client: de.clientWidth,
    docScroll: de.scrollWidth,
    bodyScroll: b.scrollWidth,
    vScrollable: de.scrollHeight > de.clientHeight,
    docScrollH: de.scrollHeight,
    clientH: de.clientHeight,
    bodyBoxW: Math.round(b.getBoundingClientRect().width * 100) / 100,
    rootBoxW: Math.round(de.getBoundingClientRect().width * 100) / 100,
  };
})()`;

async function openTab(mobile, url) {
  const created = await httpJson("/json/new?about:blank", "PUT");
  const target = created.webSocketDebuggerUrl ? created : (await httpJson("/json/list")).find((t) => t.type === "page");
  const tab = await connect(target.webSocketDebuggerUrl);
  await tab.send("Page.enable");
  await tab.send("Runtime.enable");
  await tab.send("Emulation.setDeviceMetricsOverride", { width: W, height: H, deviceScaleFactor: 1, mobile });
  await tab.send("Page.navigate", { url });
  await sleep(4000);
  return tab;
}

async function ev(tab, expr) {
  const r = await tab.send("Runtime.evaluate", { expression: expr, returnByValue: true, awaitPromise: true });
  return r.result && r.result.value;
}

(async () => {
  console.log("TARGET:", TARGET_URL, "W=" + W, "H=" + H);

  for (const mobile of [true, false]) {
    console.log("\n================ mobile: " + mobile + " ================");
    const tab = await openTab(mobile, TARGET_URL);
    const sb = await ev(tab, SCROLLBAR_W);
    console.log("  scrollbar width   :", sb);
    let s = await ev(tab, SNAP);
    console.log("  full page         :", JSON.stringify(s));
    console.log("  inner - client    :", s.inner - s.client, " | client + sb =", s.client + sb,
      " | inner == client+sb ?", s.inner === s.client + sb);
    console.log("  docScroll - inner :", s.docScroll - s.inner);

    for (let i = 1; i <= 3; i++) {
      await ev(tab, `(() => { void document.body.offsetHeight; return true; })()`);
      await sleep(200);
      const m = await ev(tab, SNAP);
      console.log("  no-op reflow #" + i + "   : inner=" + m.inner + " client=" + m.client +
        " docScroll=" + m.docScroll + " bodyScroll=" + m.bodyScroll);
    }

    await ev(tab, `(() => {
      document.documentElement.style.setProperty("overflow", "hidden", "important");
      document.body.style.setProperty("overflow", "hidden", "important");
      document.body.style.height = "100px";
      return true;
    })()`);
    await sleep(500);
    const short = await ev(tab, SNAP);
    console.log("  page clipped short: " + JSON.stringify(short));
    console.log("  >>> inner collapsed to 320? ", short.inner === W ? "YES -> delta IS the scrollbar" : "no");

    await ev(tab, `(() => {
      document.documentElement.style.removeProperty("overflow");
      document.body.style.removeProperty("overflow");
      document.body.style.height = "";
      return true;
    })()`);
    await sleep(300);
    await ev(tab, `(() => { document.body.innerHTML = "<p>x</p>"; return true; })()`);
    await sleep(500);
    const empty = await ev(tab, SNAP);
    console.log("  body emptied      : " + JSON.stringify(empty));
    console.log("  >>> inner collapsed to 320? ", empty.inner === W ? "YES" : "no");

    tab.ws.close();
  }

  console.log("\n================ control: about:blank ================");
  const tab = await openTab(true, "about:blank");
  await ev(tab, `(() => { document.body.innerHTML = "<div style='height:2000px'>tall</div>"; return true; })()`);
  await sleep(400);
  const c = await ev(tab, SNAP);
  console.log("  " + JSON.stringify(c));
  console.log("  inner - client:", c.inner - c.client);
  tab.ws.close();

  process.exit(0);
})().catch((e) => { console.error("FATAL", e); process.exit(1); });
