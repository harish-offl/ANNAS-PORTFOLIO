// Timeline probe: sample root/body scroll widths repeatedly at a narrow width
// to distinguish a PERSISTENT overflow from a TRANSIENT one (e.g. a layout
// shift during font load or an intro animation that has not settled yet).
const http = require("http");
const CDP = Number(process.env.CDP_PORT || 9333);
const TARGET_URL = process.env.TARGET_URL || "http://127.0.0.1:3040";
const WIDTH = Number(process.env.PROBE_WIDTH || 320);
const SAMPLES = Number(process.env.PROBE_SAMPLES || 40);

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

(async () => {
  const created = await httpJson("/json/new?about:blank", "PUT");
  const target = created.webSocketDebuggerUrl ? created : (await httpJson("/json/list")).find((t) => t.type === "page");
  const tab = await connect(target.webSocketDebuggerUrl);
  await tab.send("Page.enable");
  await tab.send("Runtime.enable");
  await tab.send("Emulation.setDeviceMetricsOverride", { width: WIDTH, height: 800, deviceScaleFactor: 1, mobile: true });
  await sleep(400);
  await tab.send("Page.navigate", { url: TARGET_URL });

  // Install an in-page sampler that records a timeline, then read it back.
  const SAMPLER = `(() => {
    window.__samples = [];
    const t0 = performance.now();
    const tick = () => {
      const de = document.documentElement;
      window.__samples.push({
        t: Math.round(performance.now() - t0),
        inner: window.innerWidth,
        client: de.clientWidth,
        docScroll: de.scrollWidth,
        bodyScroll: document.body ? document.body.scrollWidth : -1,
        scrollX: Math.round(window.scrollX),
        fontsStatus: document.fonts ? document.fonts.status : "n/a",
      });
      if (window.__samples.length < ${SAMPLES}) setTimeout(tick, 100);
    };
    tick();
    return "ok";
  })()`;
  await tab.send("Runtime.evaluate", { expression: SAMPLER, returnByValue: true });

  await sleep(SAMPLES * 100 + 800);

  const r = await tab.send("Runtime.evaluate", {
    expression: `({ samples: window.__samples, scrollX: window.scrollX, maxScrollX: (() => {
      window.scrollTo(9999, 0);
      const v = window.scrollX;
      window.scrollTo(0, 0);
      return v;
    })() })`,
    returnByValue: true,
  });

  const out = r.result.value;
  const s = out.samples || [];
  const distinct = [...new Set(s.map((x) => x.docScroll))];
  console.log("timeline (docScroll values seen):", distinct.join(", "));
  console.log("first 12 samples:");
  for (const x of s.slice(0, 12)) console.log("  ", JSON.stringify(x));
  console.log("last 8 samples:");
  for (const x of s.slice(-8)) console.log("  ", JSON.stringify(x));
  console.log("maxScrollX after scrollTo(9999,0):", out.maxScrollX);
  tab.ws.close();
  process.exit(0);
})();
