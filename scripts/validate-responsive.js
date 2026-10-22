// Headless Chrome validation for the portfolio build.
// Checks: horizontal overflow, tilt rotation rendering, heading typography,
// hero wrapping, and element collisions at multiple viewport widths.
const http = require("http");

const CDP_PORT = Number(process.env.CDP_PORT || 9333);
const URL = process.env.TARGET_URL || "http://127.0.0.1:3050";

const VIEWPORTS = [
  { name: "mobile-320", width: 320, height: 800 },
  { name: "mobile-360", width: 360, height: 800 },
  { name: "mobile-390", width: 390, height: 844 },
  { name: "mobile-414", width: 414, height: 896 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "tablet-1024", width: 1024, height: 768 },
  { name: "laptop-1280", width: 1280, height: 900 },
  { name: "desktop-1536", width: 1536, height: 960 },
  { name: "desktop-1920", width: 1920, height: 1080 },
];

function httpJson(path, method = "GET") {
  return new Promise((resolve, reject) => {
    const req = http.request(
      { host: "127.0.0.1", port: CDP_PORT, path, method },
      (res) => {
        let d = "";
        res.on("data", (c) => (d += c));
        res.on("end", () => {
          try {
            resolve(JSON.parse(d));
          } catch (e) {
            resolve({ raw: d });
          }
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
    const events = [];
    ws.addEventListener("open", () =>
      resolve({
        ws,
        events,
        send(method, params = {}) {
          const msgId = ++id;
          ws.send(JSON.stringify({ id: msgId, method, params }));
          return new Promise((res, rej) => {
            pending.set(msgId, { res, rej });
            setTimeout(() => {
              if (pending.has(msgId)) {
                pending.delete(msgId);
                rej(new Error("timeout: " + method));
              }
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
        if (msg.error) rej(new Error(JSON.stringify(msg.error)));
        else res(msg.result);
      } else if (msg.method) {
        events.push(msg);
      }
    });
  });
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const fs = require("fs");
const path = require("path");

const AUDIT_JS = fs.readFileSync(
  path.join(__dirname, "audit-snippet.js"),
  "utf8"
);

const SHOTS = [
  { name: "desktop-1280", width: 1280, height: 900 },
  { name: "mobile-390", width: 390, height: 844 },
];

(async () => {
  const targets = await httpJson("/json/list");
  let page = targets.find((t) => t.type === "page");
  if (!page) {
    const created = await httpJson("/json/new?about:blank");
    page = created.type === "page" ? created : (await httpJson("/json/list")).find((t) => t.type === "page");
  }
  const cdp = await connect(page.webSocketDebuggerUrl);
  await cdp.send("Page.enable");
  await cdp.send("Runtime.enable");
  await cdp.send("Log.enable");

  // Warm-up navigation so the very first viewport override isn't racing
  // the initial page load / viewport-meta handling.
  await cdp.send("Emulation.setDeviceMetricsOverride", {
    width: 1280, height: 900, deviceScaleFactor: 1, mobile: false,
  });
  await cdp.send("Page.navigate", { url: URL });
  await sleep(3000);

  const results = [];

  // A fresh tab per viewport: reusing one tab leaks Chrome's emulation state
  // between navigations (e.g. a 320px viewport inheriting a 758px layout width),
  // which produces false horizontal-overflow readings.
  for (const vp of VIEWPORTS) {
    // Modern Chrome requires PUT for /json/new
    const created = await httpJson("/json/new?about:blank", "PUT");
    const target =
      created.webSocketDebuggerUrl
        ? created
        : (await httpJson("/json/list")).find(
            (t) => t.type === "page" && t.webSocketDebuggerUrl
          );
    const tab = await connect(target.webSocketDebuggerUrl);
    await tab.send("Page.enable");
    await tab.send("Runtime.enable");
    await tab.send("Log.enable");

    await tab.send("Emulation.setDeviceMetricsOverride", {
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: 1,
      mobile: vp.width < 768,
    });
    await sleep(500);
    await tab.send("Page.navigate", { url: URL });
    await sleep(3500);
    const vpCheck = await tab.send("Runtime.evaluate", {
      returnByValue: true,
      expression: `({ inner: window.innerWidth, client: document.documentElement.clientWidth,
                      layoutW: window.innerWidth, deviceW: ${vp.width} })`,
    });
    const applied = vpCheck.result.value;

    const r = await tab.send("Runtime.evaluate", {
      expression: AUDIT_JS,
      awaitPromise: true,
      returnByValue: true,
    });

    const val = r.result && r.result.value;
    if (!val) {
      results.push({ viewport: vp.name, error: JSON.stringify(r).slice(0, 300) });
      tab.ws.close();
      continue;
    }
    const entry = {
      viewport: vp.name + " (" + vp.width + "x" + vp.height + ")",
      appliedViewport: applied,
      ...val,
    };

    const errs = tab.events
      .filter((e) => e.method === "Log.entryAdded" && e.params.entry.level === "error")
      .map((e) => e.params.entry.text);
    if (errs.length) entry.consoleErrors = errs.slice(0, 5);
    results.push(entry);
    tab.ws.close();
    await sleep(400);
  }

  console.log(JSON.stringify(results, null, 2));

  // Screenshots for visual verification
  const shotDir = path.join(__dirname, "..", "screenshots");
  if (!fs.existsSync(shotDir)) fs.mkdirSync(shotDir, { recursive: true });

  for (const vp of SHOTS) {
    await cdp.send("Emulation.setDeviceMetricsOverride", {
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: 1,
      mobile: vp.width < 768,
    });
    await cdp.send("Page.navigate", { url: URL });
    await sleep(3000);

    // Full page screenshot
    const metrics = await cdp.send("Page.getLayoutMetrics");
    const cs = metrics.cssContentSize || metrics.contentSize;
    const h = Math.min(Math.ceil(cs.height), 20000);
    const shot = await cdp.send("Page.captureScreenshot", {
      format: "png",
      captureBeyondViewport: true,
      clip: { x: 0, y: 0, width: vp.width, height: h, scale: 1 },
    });
    fs.writeFileSync(
      path.join(shotDir, "full-" + vp.name + ".png"),
      Buffer.from(shot.data, "base64")
    );

    // Showcase section close-up (the collage with tilts)
    const box = await cdp.send("Runtime.evaluate", {
      expression:
        '(()=>{const e=document.querySelector("#showcase");if(!e)return null;const r=e.getBoundingClientRect();return {x:0,y:r.top+window.scrollY,w:innerWidth,h:Math.min(r.height,1400)};})()',
      returnByValue: true,
    });
    const b = box.result && box.result.value;
    if (b) {
      const s2 = await cdp.send("Page.captureScreenshot", {
        format: "png",
        captureBeyondViewport: true,
        clip: { x: 0, y: b.y, width: vp.width, height: b.h, scale: 1 },
      });
      fs.writeFileSync(
        path.join(shotDir, "showcase-" + vp.name + ".png"),
        Buffer.from(s2.data, "base64")
      );
    }
    console.error("captured " + vp.name);
  }

  cdp.ws.close();
  process.exit(0);
})().catch((e) => {
  console.error("FATAL", e);
  process.exit(1);
});

