// Diagnostic: find what forces the 320px layout to exceed the layout viewport.
const http = require("http");
const fs = require("fs");

const CDP = Number(process.env.CDP_PORT || 9333);
const TARGET_URL = process.env.TARGET_URL || "http://127.0.0.1:3040";
const WIDTH = Number(process.env.PROBE_WIDTH || 320);

function httpJson(path, method = "GET") {
  return new Promise((resolve, reject) => {
    const req = http.request(
      { host: "127.0.0.1", port: CDP, path, method },
      (res) => {
        let d = "";
        res.on("data", (c) => (d += c));
        res.on("end", () => {
          try { resolve(JSON.parse(d)); } catch (e) { resolve({ raw: d }); }
        });
      }
    );
    req.on("error", reject);
    req.end();
  });
}

function connect(wsUrl) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(wsUrl);
    let id = 0;
    const pending = new Map();
    ws.addEventListener("open", () =>
      resolve({
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
      })
    );
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
  await tab.send("Emulation.setDeviceMetricsOverride", {
    width: WIDTH, height: 800, deviceScaleFactor: 1, mobile: true,
  });
  await sleep(400);
  await tab.send("Page.navigate", { url: TARGET_URL });
  await sleep(3500);

  const expr = `(() => {
    const de = document.documentElement;
    const scale = window.visualViewport ? window.visualViewport.scale : 1;
    const inv = 1 / scale;
    const rows = [];
    document.querySelectorAll("*").forEach((el) => {
      const cs = getComputedStyle(el);
      if (cs.display === "none" || cs.visibility === "hidden") return;
      const r = el.getBoundingClientRect();
      if (r.width === 0 && r.height === 0) return;
      const w = r.width * inv;
      const left = r.left * inv;
      const right = r.right * inv;
      if (w > ${WIDTH} + 0.5 || right > ${WIDTH} + 0.5 || left < -0.5) {
        rows.push({
          tag: el.tagName,
          cls: (typeof el.className === "string" ? el.className : "").slice(0, 90),
          depth: (() => { let d=0,n=el; while(n.parentElement){d++;n=n.parentElement;} return d; })(),
          w: Math.round(w * 10) / 10,
          left: Math.round(left * 10) / 10,
          right: Math.round(right * 10) / 10,
          text: (el.childElementCount === 0 ? (el.textContent || "").trim().slice(0, 40) : ""),
        });
      }
    });
    rows.sort((a, b) => b.depth - a.depth);
    return {
      inner: window.innerWidth,
      client: de.clientWidth,
      scrollW: de.scrollWidth,
      bodyScrollW: document.body.scrollWidth,
      scale,
      total: rows.length,
      deepest: rows.slice(0, 25),
    };
  })()`;

  const r = await tab.send("Runtime.evaluate", { expression: expr, returnByValue: true });
  console.log(JSON.stringify(r.result.value, null, 2));
  tab.ws.close();
  process.exit(0);
})();
