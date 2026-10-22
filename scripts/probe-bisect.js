// Live bisect at 320px: apply one mutation at a time and see which one makes
// documentElement.scrollWidth return to clientWidth (i.e. removes the 9px).
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
const MUTATIONS = [
  ["body min-width -> 0", `(() => { const o=document.body.style.minWidth; document.body.style.minWidth='0px'; return () => document.body.style.minWidth=o; })()`],
  ["body overflow-x -> visible", `(() => { const o=document.body.style.overflowX; document.body.style.overflowX='visible'; return () => document.body.style.overflowX=o; })()`],
  ["html border-width -> 0", `(() => { const o=document.documentElement.style.borderWidth; document.documentElement.style.borderWidth='0px'; return () => document.documentElement.style.borderWidth=o; })()`],
  ["body border-width -> 0", `(() => { const o=document.body.style.borderWidth; document.body.style.borderWidth='0px'; return () => document.body.style.borderWidth=o; })()`],
  ["body padding -> 0", `(() => { const o=document.body.style.padding; document.body.style.padding='0px'; return () => document.body.style.padding=o; })()`],
  ["hide header", `(() => { const h=document.querySelector('header'); const o=h.style.display; h.style.display='none'; return () => h.style.display=o; })()`],
  ["hide hero decor", `(() => { const d=document.querySelector('#home .pointer-events-none'); const o=d.style.display; d.style.display='none'; return () => d.style.display=o; })()`],
  ["all borders -> 0", `(() => { const els=[...document.querySelectorAll('*')]; const os=els.map(e=>e.style.borderWidth); els.forEach(e=>e.style.borderWidth='0px'); return () => els.forEach((e,i)=>e.style.borderWidth=os[i]); })()`],
  ["html overflow-x -> hidden", `(() => { const o=document.documentElement.style.overflowX; document.documentElement.style.overflowX='hidden'; return () => document.documentElement.style.overflowX=o; })()`],
  ["html overflow-x -> clip", `(() => { const o=document.documentElement.style.overflowX; document.documentElement.style.overflowX='clip'; return () => document.documentElement.style.overflowX=o; })()`],
  ["unset body min-width", `(() => { const o=document.body.style.cssText; document.body.style.cssText += ';min-width:initial'; return () => document.body.style.cssText=o; })()`],
];

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

  const base = await tab.send("Runtime.evaluate", {
    expression: `(() => { const de=document.documentElement,b=document.body; return {
      innerWidth:window.innerWidth, clientWidth:de.clientWidth, scrollWidth:de.scrollWidth,
      bodyScrollWidth:b.scrollWidth, htmlRect:Math.round(de.getBoundingClientRect().width),
      bodyRect:Math.round(b.getBoundingClientRect().width),
      vvWidth: window.visualViewport?window.visualViewport.width:null,
      vvScale: window.visualViewport?window.visualViewport.scale:null,
      screenW: window.screen.width,
      htmlOverflowX: getComputedStyle(de).overflowX,
      bodyMinWidth: getComputedStyle(b).minWidth,
      bodyOverflowX: getComputedStyle(b).overflowX,
      bodyWidth: getComputedStyle(b).width,
    }; })()`,
    returnByValue: true,
  });
  console.log("=== BASELINE @320 ===");
  console.log(JSON.stringify(base.result.value, null, 2));

  console.log("\n=== MUTATIONS ===");
  for (const [name, fn] of MUTATIONS) {
    const r = await tab.send("Runtime.evaluate", {
      expression: `(() => { const undo=(${fn})(); const de=document.documentElement;
        const v={scrollWidth:de.scrollWidth,clientWidth:de.clientWidth,bodyScrollWidth:document.body.scrollWidth};
        undo(); return v; })()`,
      returnByValue: true,
    });
    const v = r.result.value;
    const fixed = v.scrollWidth <= v.clientWidth + 1;
    console.log(`${fixed ? ">>> FIXES" : "        "} ${name.padEnd(32)} scrollW=${v.scrollWidth} clientW=${v.clientWidth} bodyScrollW=${v.bodyScrollWidth}`);
  }
  tab.ws.close();
  process.exit(0);
})();
