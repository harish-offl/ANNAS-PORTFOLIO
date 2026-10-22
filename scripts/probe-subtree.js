// Subtree bisect at a narrow width: hide one element at a time and record
// how documentElement.scrollWidth changes. Reveals exactly which subtree
// pushes the root scroll width past the viewport.
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

const SCAN = `(() => {
  const de = document.documentElement;
  const base = de.scrollWidth;
  const results = [];
  // Only look at reasonably shallow structural elements to keep it fast.
  const els = [...document.querySelectorAll("body *")].slice(0, 1200);
  for (const el of els) {
    const prev = el.style.display;
    el.style.display = "none";
    const sw = de.scrollWidth;
    el.style.display = prev;
    if (sw < base) {
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      results.push({
        tag: el.tagName,
        cls: (typeof el.className === "string" ? el.className : "").slice(0, 70),
        pos: cs.position,
        overflowX: cs.overflowX,
        rectW: Math.round(r.width),
        rectRight: Math.round(r.right),
        scrollWidthWithout: sw,
        delta: base - sw,
        depth: (() => { let d=0,n=el; while(n.parentElement){d++;n=n.parentElement;} return d; })(),
      });
    }
  }
  // Keep the most specific (deepest) offenders first.
  results.sort((a, b) => b.depth - a.depth);
  return { base, clientWidth: de.clientWidth, offenders: results.slice(0, 25) };
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
  const r = await tab.send("Runtime.evaluate", { expression: SCAN, returnByValue: true });
  console.log(JSON.stringify(r.result.value, null, 2));
  tab.ws.close();
  process.exit(0);
})();
