// Definitive 320px probe.
//  1. Installs a sampler via Page.addScriptToEvaluateOnNewDocument so it runs
//     from the FIRST script in the real document (no missed early frames).
//  2. Records per sample: root/body scroll widths, inner/client widths,
//     visual-viewport metrics and the element with the greatest right edge.
//  3. Repeats for mobile:true and mobile:false emulation so we can tell an
//     emulated-scrollbar artefact from a real layout overflow.
const http = require("http");
const CDP = Number(process.env.CDP_PORT || 9333);
const TARGET_URL = process.env.TARGET_URL || "http://127.0.0.1:3040";
const WIDTH = Number(process.env.PROBE_WIDTH || 320);
const HEIGHT = Number(process.env.PROBE_HEIGHT || 800);
const DURATION = Number(process.env.PROBE_DURATION || 5000);

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

// Runs inside the page before any of the app's own scripts.
const PAGE_SAMPLER = `(() => {
  window.__early = [];
  const t0 = performance.now();
  const sample = () => {
    const de = document.documentElement;
    const vv = window.visualViewport;
    let worst = null;
    try {
      for (const el of document.querySelectorAll("*")) {
        const r = el.getBoundingClientRect();
        if (r.width === 0 && r.height === 0) continue;
        if (!worst || r.right > worst.right) {
          worst = {
            right: Math.round(r.right * 10) / 10,
            left: Math.round(r.left * 10) / 10,
            tag: el.tagName,
            cls: (typeof el.className === "string" ? el.className : (el.getAttribute && el.getAttribute("class")) || "").slice(0, 60),
            pos: getComputedStyle(el).position,
          };
        }
      }
    } catch (e) {}
    window.__early.push({
      t: Math.round(performance.now() - t0),
      inner: window.innerWidth,
      client: de.clientWidth,
      docScroll: de.scrollWidth,
      bodyScroll: document.body ? document.body.scrollWidth : -1,
      scrollX: Math.round(window.scrollX),
      vvW: vv ? Math.round(vv.width * 10) / 10 : -1,
      vvScale: vv ? vv.scale : -1,
      bodyMinW: document.body ? getComputedStyle(document.body).minWidth : "",
      htmlOverflowX: getComputedStyle(de).overflowX,
      bodyOverflowX: document.body ? getComputedStyle(document.body).overflowX : "",
      worst,
    });
  };
  sample();
  const iv = setInterval(sample, 50);
  setTimeout(() => clearInterval(iv), ${DURATION});
})();`;

async function runOne(mobile) {
  const created = await httpJson("/json/new?about:blank", "PUT");
  const target = created.webSocketDebuggerUrl ? created : (await httpJson("/json/list")).find((t) => t.type === "page");
  const tab = await connect(target.webSocketDebuggerUrl);
  await tab.send("Page.enable");
  await tab.send("Runtime.enable");
  await tab.send("Page.addScriptToEvaluateOnNewDocument", { source: PAGE_SAMPLER });
  await tab.send("Emulation.setDeviceMetricsOverride", {
    width: WIDTH, height: HEIGHT, deviceScaleFactor: 1, mobile,
  });
  await tab.send("Page.navigate", { url: TARGET_URL });
  await sleep(DURATION + 1500);
  const r = await tab.send("Runtime.evaluate", {
    returnByValue: true,
    expression: `({ early: window.__early || null, finalScrollX: (() => {
      window.scrollTo(9999, 0); const v = window.scrollX; window.scrollTo(0,0); return v;
    })() })`,
  });
  const v = r.result.value || {};
  tab.ws.close();
  return { mobile, samples: v.early || [], maxScrollX: v.finalScrollX };
}

(async () => {
  for (const mobile of [true, false]) {
    const { samples, maxScrollX } = await runOne(mobile);
    console.log("\n================ mobile: " + mobile + " ================");
    if (!samples.length) { console.log("  NO SAMPLES"); continue; }
    const docScrolls = [...new Set(samples.map((s) => s.docScroll))];
    const inners = [...new Set(samples.map((s) => s.inner))];
    const clients = [...new Set(samples.map((s) => s.client))];
    console.log("  docScroll values :", docScrolls.join(", "));
    console.log("  innerWidth values:", inners.join(", "));
    console.log("  clientWidth vals :", clients.join(", "));
    console.log("  htmlOverflowX    :", samples[0].htmlOverflowX, "| bodyOverflowX:", samples[0].bodyOverflowX, "| bodyMinW:", samples[0].bodyMinW);
    console.log("  visualViewport.w :", samples[0].vvW, "| scale:", samples[0].vvScale);
    console.log("  max scrollX      :", maxScrollX);
    console.log("  --- first 6 samples ---");
    for (const s of samples.slice(0, 6)) {
      console.log("   t=" + String(s.t).padStart(4),
        "inner=" + s.inner, "client=" + s.client, "docScroll=" + s.docScroll,
        "bodyScroll=" + s.bodyScroll, "worst.right=" + (s.worst ? s.worst.right : "-"),
        "[" + (s.worst ? s.worst.tag + "." + s.worst.cls.split(" ").slice(0,3).join(".") : "-") + "]");
    }
    const over = samples.filter((s) => s.docScroll > s.client + 0.5);
    if (over.length) {
      console.log("  --- samples where docScroll > client (" + over.length + "/" + samples.length + ") ---");
      for (const s of over.slice(0, 8)) {
        console.log("   t=" + String(s.t).padStart(4),
          "inner=" + s.inner, "client=" + s.client, "docScroll=" + s.docScroll,
          "worst.right=" + (s.worst ? s.worst.right : "-"),
          "[" + (s.worst ? s.worst.tag + "." + s.worst.cls.split(" ").slice(0,3).join(".") + " pos=" + s.worst.pos : "-") + "]");
      }
      console.log("   ... last over-sample t=" + over[over.length - 1].t);
    } else {
      console.log("  *** NO sample ever had docScroll > clientWidth ***");
    }
  }
  process.exit(0);
})().catch((e) => { console.error("FATAL", e); process.exit(1); });
