// Trace the ancestor chain of the elements that make the root scroll width
// exceed the viewport, and report fixed/sticky ancestors (which escape an
// ancestor's overflow clip and therefore reach the root scroller).
const http = require("http");
const CDP = Number(process.env.CDP_PORT || 9333);
const TARGET_URL = process.env.TARGET_URL || "http://127.0.0.1:3040";
const WIDTH = Number(process.env.PROBE_WIDTH || 320);

function httpJson(path, method = "GET") {
  return new Promise((resolve, reject) => {
    const req = http.request({ host: "127.0.0.1", port: CDP, path, method }, (res) => {
      let d = "";
      res.on("data", (c) => (d += c));
      res.on("end", () => { try { resolve(JSON.parse(d)); } catch (e) { resolve({ raw: d }); } });
    });
    req.on("error", reject);
    req.end();
  });
}

function connect(wsUrl) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(wsUrl);
    let id = 0;
    const pending = new Map();
    ws.addEventListener("open", () => resolve({
      ws,
      send(method, params = {}) {
        const msgId = ++id;
        ws.send(JSON.stringify({ id: msgId, method, params }));
        return new Promise((res, rej) => {
          pending.set(msgId, { res, rej });
          setTimeout(() => {
            if (pending.has(msgId)) { pending.delete(msgId); rej(new Error("timeout " + method)); }
          }, 45000);
        });
      },
    }));
    ws.addEventListener("error", reject);
    ws.addEventListener("message", (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.id && pending.has(msg.id)) {
        const { res, rej } = pending.get(msg.id);
        pending.delete(msg.id);
        if (msg.error) rej(new Error(JSON.stringify(msg.error))); else res(msg.result);
      }
    });
  });
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const TRACE = `(() => {
  const de = document.documentElement;
  const base = de.scrollWidth;

  // Find an offending element: hiding it reduces root scrollWidth.
  let culprit = null;
  for (const el of document.querySelectorAll("body *")) {
    const prev = el.style.display;
    el.style.display = "none";
    const sw = de.scrollWidth;
    el.style.display = prev;
    if (sw < base) { culprit = el; break; }
  }
  if (!culprit) return { note: "no single-element culprit", base };

  const chain = [];
  let n = culprit;
  while (n && n !== document.documentElement.parentElement) {
    const cs = getComputedStyle(n);
    const r = n.getBoundingClientRect();
    chain.push({
      tag: n.tagName,
      cls: (typeof n.className === "string" ? n.className : (n.getAttribute && n.getAttribute("class")) || "").slice(0, 80),
      pos: cs.position,
      overflowX: cs.overflowX,
      overflowY: cs.overflowY,
      width: Math.round(r.width),
      left: Math.round(r.left),
      right: Math.round(r.right),
      scrollWidth: n.scrollWidth,
      clientWidth: n.clientWidth,
      display: cs.display,
    });
    n = n.parentElement;
  }
  return { base, clientWidth: de.clientWidth, chain };
})()`;

(async () => {
  const created = await httpJson("/json/new?about:blank", "PUT");
  const target = created.webSocketDebuggerUrl ? created : (await httpJson("/json/list")).find((t) => t.type === "page");
  const tab = await connect(target.webSocketDebuggerUrl);
  await tab.send("Page.enable");
  await tab.send("Runtime.enable");
  await tab.send("Emulation.setDeviceMetricsOverride", { width: WIDTH, height: 800, deviceScaleFactor: 1, mobile: true });
  await sleep(400);
  await tab.send("Page.navigate", { url: TARGET_URL });
  await sleep(3200);
  const r = await tab.send("Runtime.evaluate", { expression: TRACE, returnByValue: true });
  console.log(JSON.stringify(r.result.value, null, 2));
  tab.ws.close();
  process.exit(0);
})();
