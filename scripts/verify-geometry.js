(async () => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const http = require("http");
  const fs = require("fs");
  const path = require("path");

  const CDP = Number(process.env.CDP_PORT || 9333);
  const TARGET_URL = process.env.TARGET_URL || "http://127.0.0.1:3050";
  const httpJson = (p) =>
    new Promise((res, rej) => {
      http
        .get({ host: "127.0.0.1", port: CDP, path: p }, (r) => {
          let d = "";
          r.on("data", (c) => (d += c));
          r.on("end", () => res(JSON.parse(d)));
        })
        .on("error", rej);
    });

  const list = await httpJson("/json/list");
  const page = list.find((t) => t.type === "page");
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  let id = 0;
  const pending = new Map();
  await new Promise((r) => ws.addEventListener("open", r));
  ws.addEventListener("message", (ev) => {
    const m = JSON.parse(ev.data);
    if (m.id && pending.has(m.id)) {
      const { res, rej } = pending.get(m.id);
      pending.delete(m.id);
      m.error ? rej(new Error(JSON.stringify(m.error))) : res(m.result);
    }
  });
  const send = (method, params = {}) => {
    const msgId = ++id;
    ws.send(JSON.stringify({ id: msgId, method, params }));
    return new Promise((res, rej) => {
      pending.set(msgId, { res, rej });
      setTimeout(() => {
        if (pending.has(msgId)) { pending.delete(msgId); rej(new Error("timeout " + method)); }
      }, 40000);
    });
  };

  await send("Page.enable");
  await send("Runtime.enable");
  await send("Emulation.setDeviceMetricsOverride", {
    width: 1280, height: 900, deviceScaleFactor: 1, mobile: false,
  });
  await send("Page.navigate", { url: TARGET_URL });
  await sleep(3500);

  // Verify rotation actually affects rendered geometry.
  // For an element of unrotated size w x h rotated by theta (no other transform),
  // the axis-aligned bounding box becomes:
  //   W = w*|cos t| + h*|sin t|,  H = w*|sin t| + h*|cos t|
  // Compare the measured AABB against this prediction.
  const check = await send("Runtime.evaluate", {
    returnByValue: true,
    expression: `(() => {
      const out = [];
      document.querySelectorAll('[class*="tilt-"]').forEach(el => {
        const cls = (typeof el.className === 'string' ? el.className : '')
          .split(/\\s+/).filter(c => c.startsWith('tilt-')).join(' ');
        if (!cls) return;
        const cs = getComputedStyle(el);
        const deg = parseFloat(cs.rotate);
        const r = el.getBoundingClientRect();
        // unrotated size = offsetWidth/offsetHeight (layout box, pre-transform)
        const w = el.offsetWidth, h = el.offsetHeight;
        const t = deg * Math.PI / 180;
        const predW = w * Math.abs(Math.cos(t)) + h * Math.abs(Math.sin(t));
        const predH = w * Math.abs(Math.sin(t)) + h * Math.abs(Math.cos(t));
        // also read the four corners to confirm the box is genuinely rotated
        out.push({
          cls,
          deg,
          layoutW: w, layoutH: h,
          aabbW: Math.round(r.width * 10) / 10,
          aabbH: Math.round(r.height * 10) / 10,
          predW: Math.round(predW * 10) / 10,
          predH: Math.round(predH * 10) / 10,
          matchW: Math.abs(r.width - predW) < 1.2,
          matchH: Math.abs(r.height - predH) < 1.2,
        });
      });
      return out;
    })()`,
  });

  const rows = check.result.value;
  let pass = 0, fail = 0;
  for (const r of rows) {
    const ok = r.matchW && r.matchH;
    ok ? pass++ : fail++;
    console.log(
      (ok ? "PASS" : "FAIL").padEnd(5) +
      r.cls.padEnd(9) +
      " deg=" + String(r.deg).padEnd(6) +
      " layout=" + r.layoutW + "x" + r.layoutH +
      "  aabb=" + r.aabbW + "x" + r.aabbH +
      "  predicted=" + r.predW + "x" + r.predH
    );
  }
  console.log("\nGEOMETRY: " + pass + " pass, " + fail + " fail (of " + rows.length + ")");

  // Hover test: does the tilt straighten to 0deg on hover?
  await send("Runtime.evaluate", {
    expression: `(() => {
      const el = document.querySelector('[class*="tilt-n3"]');
      el.dispatchEvent(new MouseEvent('mouseover', {bubbles: true}));
      return true;
    })()`,
  });
  await sleep(500);
  const hover = await send("Runtime.evaluate", {
    returnByValue: true,
    expression: `(() => {
      const el = document.querySelector('[class*="tilt-n3"]');
      el.classList.add('__hoverforce');
      return { rotate: getComputedStyle(el).rotate };
    })()`,
  });
  console.log("Hover rotate (class not hovered, static check):", hover.result.value.rotate);

  // Real hover via CDP Input. Pick an element that is actually in the viewport.
  const rectRes2 = await send("Runtime.evaluate", {
    returnByValue: true,
    expression: `(() => {
      const els = Array.from(document.querySelectorAll('[class*="tilt-n3"]'));
      // scroll the first one into view using instant behaviour
      const el = els[0];
      el.scrollIntoView({ block: 'center', behavior: 'instant' });
      return { count: els.length, rotate: getComputedStyle(el).rotate };
    })()`,
  });
  await sleep(1200);
  const posRes = await send("Runtime.evaluate", {
    returnByValue: true,
    expression: `(() => {
      const el = document.querySelector('[class*="tilt-n3"]');
      const r = el.getBoundingClientRect();
      return { x: r.left + r.width/2, y: r.top + r.height/2, rotate: getComputedStyle(el).rotate,
               top: r.top, left: r.left, vh: window.innerHeight, scrollY: window.scrollY };
    })()`,
  });
  const p = posRes.result.value;
  console.log("Before hover:", p.rotate, "at left=" + Math.round(p.left), "top=" + Math.round(p.top),
    "vh=" + p.vh, "scrollY=" + Math.round(p.scrollY));
  await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: p.x, y: p.y });
  await sleep(250);
  await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: p.x + 1, y: p.y + 1 });
  await sleep(900);
  const after = await send("Runtime.evaluate", {
    returnByValue: true,
    expression: `(() => {
      const el = document.querySelector('[class*="tilt-n3"]');
      return { rotate: getComputedStyle(el).rotate, hovered: el.matches(':hover') };
    })()`,
  });
  console.log("After hover:", JSON.stringify(after.result.value));

  ws.close();
  process.exit(0);
})().catch((e) => { console.error("FATAL", e); process.exit(1); });
