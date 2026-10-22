(async () => {
  const http = require("http");
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
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  await send("Page.enable");
  await send("Runtime.enable");
  await send("Emulation.setDeviceMetricsOverride", {
    width: 1280, height: 900, deviceScaleFactor: 1, mobile: false,
  });
  await send("Page.navigate", { url: TARGET_URL });
  await sleep(2000);

  // Scroll to the showcase grid and sample the collage items WHILE they animate in.
  await send("Runtime.evaluate", {
    expression: `document.querySelector('#showcase').scrollIntoView({block:'start'})`,
  });

  const samples = [];
  for (let i = 0; i < 14; i++) {
    const r = await send("Runtime.evaluate", {
      returnByValue: true,
      expression: `(() => {
        const g = document.querySelector('#showcase .grid');
        if (!g) return [];
        return Array.from(g.children).slice(0,3).map(el => {
          const cs = getComputedStyle(el);
          return { rotate: cs.rotate, transform: cs.transform === 'none' ? 'none' : cs.transform, opacity: cs.opacity };
        });
      })()`,
    });
    samples.push(r.result.value);
    await sleep(180);
  }

  // Look for a frame where a tilt element has BOTH a non-none transform AND a rotate
  let composed = 0, rotateAlways = 0, total = 0;
  for (const s of samples) {
    for (const el of s) {
      total++;
      if (el.rotate && el.rotate !== "none" && el.rotate !== "0deg") rotateAlways++;
      if (el.rotate && el.rotate !== "none" && el.transform !== "none") composed++;
    }
  }
  console.log("Samples collected:", samples.length);
  console.log("Element-frames total:", total);
  console.log("Frames where rotate stayed applied:", rotateAlways, "/", total);
  console.log("Frames where transform AND rotate were composed:", composed, "/", total);
  console.log("\nRepresentative frames:");
  [0, 2, 4, 6, 9, 13].forEach((i) => {
    if (samples[i]) {
      console.log("  t=" + i, JSON.stringify(samples[i][0]));
    }
  });

  // Verify the transition-colors elements still animate colour (AboutSection skill chips)
  await send("Runtime.evaluate", {
    expression: `document.querySelector('#about').scrollIntoView({block:'start'})`,
  });
  await sleep(1200);
  const chip = await send("Runtime.evaluate", {
    returnByValue: true,
    expression: `(() => {
      const el = document.querySelector('#about .tilt-n1');
      if (!el) return null;
      const cs = getComputedStyle(el);
      return {
        transitionProperty: cs.transitionProperty,
        transitionDuration: cs.transitionDuration,
        bg: cs.backgroundColor,
        rotate: cs.rotate,
      };
    })()`,
  });
  console.log("\nAbout skill chip computed style:", JSON.stringify(chip.result.value));

  ws.close();
  process.exit(0);
})().catch((e) => { console.error("FATAL", e); process.exit(1); });
