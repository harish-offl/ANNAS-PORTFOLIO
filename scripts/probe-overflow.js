// Decisive probe: is the 320px "overflow" real content overflow, or just the
// custom scrollbar gutter being counted into documentElement.scrollWidth?
const http = require("http");

const CDP = Number(process.env.CDP_PORT || 9333);
const TARGET_URL = process.env.TARGET_URL || "http://127.0.0.1:3040";
const WIDTHS = (process.env.PROBE_WIDTHS || "320,360,390,768,1024,1280")
  .split(",")
  .map(Number);

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

const PROBE = `(() => {
  const de = document.documentElement;
  const body = document.body;

  // 1) Can the page actually be scrolled horizontally?
  window.scrollTo(9999, window.scrollY);
  const scrolledX = window.scrollX;
  window.scrollTo(0, window.scrollY);

  // 2) Scrollbar gutter size actually applied to the viewport.
  const scrollbarW = window.innerWidth - de.clientWidth;

  // 3) Is the document root's scrollable width larger than the viewport
  //    INCLUDING the scrollbar gutter? That is the true overflow test.
  const overflowVsViewport = de.scrollWidth > window.innerWidth + 1;

  // 4) Widest right edge among elements NOT clipped by any ancestor.
  let worst = null;
  document.querySelectorAll("*").forEach((el) => {
    const cs = getComputedStyle(el);
    if (cs.display === "none" || cs.visibility === "hidden") return;
    const r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) return;

    // Walk ancestors: if any clips horizontally, this element cannot cause
    // a viewport-level overflow.
    let clipped = false;
    let n = el.parentElement;
    while (n && n !== de) {
      const ns = getComputedStyle(n);
      if (ns.overflowX === "hidden" || ns.overflowX === "clip" ||
          ns.overflowX === "auto" || ns.overflowX === "scroll") { clipped = true; break; }
      n = n.parentElement;
    }
    if (clipped) return;

    const right = r.right + window.scrollX;
    if (!worst || right > worst.right) {
      worst = {
        tag: el.tagName,
        cls: (typeof el.className === "string" ? el.className : "").slice(0, 80),
        pos: cs.position,
        right: Math.round(right),
        clippedByViewport: false,
      };
    }
  });

  return {
    innerWidth: window.innerWidth,
    clientWidth: de.clientWidth,
    scrollWidth: de.scrollWidth,
    bodyScrollWidth: body.scrollWidth,
    bodyRectWidth: Math.round(body.getBoundingClientRect().width),
    scrollbarGutter: scrollbarW,
    canScrollX: scrolledX,
    overflowVsViewport,
    worstUnclipped: worst,
  };
})()`;

(async () => {
  const out = [];
  for (const width of WIDTHS) {
    const created = await httpJson("/json/new?about:blank", "PUT");
    const target = created.webSocketDebuggerUrl
      ? created
      : (await httpJson("/json/list")).find((t) => t.type === "page");
    const tab = await connect(target.webSocketDebuggerUrl);
    await tab.send("Page.enable");
    await tab.send("Runtime.enable");
    await tab.send("Emulation.setDeviceMetricsOverride", {
      width, height: 800, deviceScaleFactor: 1, mobile: width < 768,
    });
    await sleep(400);
    await tab.send("Page.navigate", { url: TARGET_URL });
    await sleep(3200);
    const r = await tab.send("Runtime.evaluate", { expression: PROBE, returnByValue: true });
    out.push({ requestedWidth: width, ...r.result.value });
    tab.ws.close();
    await sleep(300);
  }
  console.log(JSON.stringify(out, null, 2));
  process.exit(0);
})();
