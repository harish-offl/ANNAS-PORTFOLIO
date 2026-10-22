// Decisive 320px diagnostic.
// Applies a series of controlled mutations and reports viewport metrics after
// each, to separate a scrollbar-gutter artefact from genuine content overflow.
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

const METRICS = `(() => {
  const de = document.documentElement, b = document.body, vv = window.visualViewport;
  const cs = (el) => getComputedStyle(el);
  const before = window.scrollX;
  window.scrollTo(9999, 0);
  const maxScrollX = window.scrollX;
  window.scrollTo(before, 0);
  return {
    inner: window.innerWidth,
    client: de.clientWidth,
    docScroll: de.scrollWidth,
    bodyScroll: b.scrollWidth,
    bodyClient: b.clientWidth,
    rootBoxW: Math.round(de.getBoundingClientRect().width * 100) / 100,
    bodyBoxW: Math.round(b.getBoundingClientRect().width * 100) / 100,
    bodyMinW: cs(b).minWidth,
    htmlOverflowX: cs(de).overflowX,
    bodyOverflowX: cs(b).overflowX,
    htmlOverflowY: cs(de).overflowY,
    bodyOverflowY: cs(b).overflowY,
    vvW: vv ? Math.round(vv.width * 100) / 100 : -1,
    vvScale: vv ? vv.scale : -1,
    screenW: screen.width,
    maxScrollX,
    docScrollVsInner: de.scrollWidth - window.innerWidth,
    docScrollVsClient: de.scrollWidth - de.clientWidth,
  };
})()`;

// Each mutation changes one thing, so the delta in docScroll is attributable.
const MUTATIONS = [
  ["baseline (no change)", `() => {}`],
  ["html overflow-x -> hidden", `() => { document.documentElement.style.overflowX = 'hidden'; }`],
  ["html overflow-x -> clip", `() => { document.documentElement.style.overflowX = 'clip'; }`],
  ["html overflow-x -> visible", `() => { document.documentElement.style.overflowX = 'visible'; }`],
  ["body overflow-x -> visible", `() => { document.body.style.overflowX = 'visible'; }`],
  ["body overflow-x -> clip", `() => { document.body.style.overflowX = 'clip'; }`],
  ["body min-width -> 0", `() => { document.body.style.minWidth = '0px'; }`],
  ["body width -> 320px", `() => { document.body.style.width = '320px'; }`],
  ["body margin -> 0", `() => { document.body.style.margin = '0px'; }`],
  ["html width -> 320px", `() => { document.documentElement.style.width = '320px'; }`],
  ["header width -> 320px", `() => { const h = document.querySelector('header'); if (h) h.style.width = '320px'; }`],
  ["body font-size -> 16px", `() => { document.body.style.fontSize = '16px'; }`],
  ["scrollbar-gutter stable", `() => { document.documentElement.style.scrollbarGutter = 'stable'; }`],
  ["scrollbar-gutter auto", `() => { document.documentElement.style.scrollbarGutter = 'auto'; }`],
  ["hide fixed header", `() => { const h = document.querySelector('header'); if (h) h.style.display = 'none'; }`],
  ["restore header", `() => { const h = document.querySelector('header'); if (h) h.style.display = ''; }`],
];

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

  console.log("TARGET:", TARGET_URL, " W=" + W, " mobile=" + MOBILE);
  console.log("\n--- baseline metrics ---");
  const b = await ev(METRICS);
  console.log(JSON.stringify(b, null, 2));

  console.log("\n--- controlled mutations (cumulative) ---");
  for (const [name, fn] of MUTATIONS) {
    await ev("(" + fn + ")()");
    await sleep(350);
    const m = await ev(METRICS);
    console.log(
      name.padEnd(32) +
      " inner=" + String(m.inner).padStart(4) +
      " client=" + String(m.client).padStart(4) +
      " docScroll=" + String(m.docScroll).padStart(4) +
      " bodyScroll=" + String(m.bodyScroll).padStart(4) +
      " maxScrollX=" + String(m.maxScrollX).padStart(3) +
      " d(inner)=" + String(m.docScrollVsInner).padStart(4) +
      " d(client)=" + String(m.docScrollVsClient).padStart(4) +
      " ovx=" + m.htmlOverflowX + "/" + m.bodyOverflowX
    );
  }

  tab.ws.close();
  process.exit(0);
})().catch((e) => { console.error("FATAL", e); process.exit(1); });
