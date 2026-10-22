(async () => {
  // Scroll through the page so every whileInView animation completes
  window.scrollTo(0, document.body.scrollHeight);
  await new Promise((r) => setTimeout(r, 1000));
  window.scrollTo(0, 0);
  await new Promise((r) => setTimeout(r, 800));

  const de = document.documentElement;
  const scrollW = de.scrollWidth;
  const clientW = de.clientWidth;
  // window.innerWidth is the LAYOUT viewport. Under Chrome's mobile device
  // emulation the layout viewport is widened by the vertical-scrollbar
  // allowance (320 -> 329) while clientWidth stays at the device width (320).
  // Comparing scrollWidth against clientWidth therefore reports a false
  // overflow. The scrollable content area is the layout viewport, so compare
  // against innerWidth and additionally verify the page truly cannot scroll.
  const layoutW = window.innerWidth;
  const scrollbarAllowance = layoutW - clientW;

  // Real horizontal scrollability: can the user actually pan sideways?
  const prevX = window.scrollX;
  window.scrollTo(9999, 0);
  const maxScrollX = window.scrollX;
  window.scrollTo(prevX, 0);

  const overflowing = [];
  document.querySelectorAll("*").forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) return;
    if (r.right > layoutW + 1.5 || r.left < -1.5) {
      const cls =
        typeof el.className === "string" ? el.className : "";
      overflowing.push({
        tag: el.tagName,
        cls: cls.split(/\s+/).filter((c) => c.startsWith("tilt-") || c.startsWith("sticky-note") || c.startsWith("absolute")).join(" "),
        left: Math.round(r.left),
        right: Math.round(r.right),
        w: Math.round(r.width),
      });
    }
  });

  const tilts = [];
  document.querySelectorAll('[class*="tilt-"]').forEach((el) => {
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    const cls = typeof el.className === "string" ? el.className : "";
    tilts.push({
      cls: cls.split(/\s+/).filter((c) => c.startsWith("tilt-")).join(" "),
      rotate: cs.rotate,
      transform: cs.transform === "none" ? "none" : cs.transform.slice(0, 50),
      opacity: cs.opacity,
      w: Math.round(r.width),
      h: Math.round(r.height),
    });
  });

  const headings = [];
  document.querySelectorAll("h1, h2").forEach((h) => {
    const cs = getComputedStyle(h);
    const r = h.getBoundingClientRect();
    const lh = parseFloat(cs.lineHeight) || 1;
    headings.push({
      tag: h.tagName,
      text: h.textContent.trim().slice(0, 38),
      fs: cs.fontSize,
      lh: cs.lineHeight,
      ls: cs.letterSpacing,
      tw: cs.textWrap || cs.textWrapStyle,
      lines: Math.round(r.height / lh),
      overflowX: r.right > layoutW + 1.5,
    });
  });

  const h1 = document.querySelector("h1");
  const hero = h1
    ? {
        text: h1.textContent.trim().slice(0, 60),
        fs: getComputedStyle(h1).fontSize,
        lines: Math.round(
          h1.getBoundingClientRect().height / (parseFloat(getComputedStyle(h1).lineHeight) || 1)
        ),
        w: Math.round(h1.getBoundingClientRect().width),
        overflowX: h1.getBoundingClientRect().right > layoutW + 1.5,
      }
    : null;

  const collage = document.querySelector("#showcase .grid");
  const collageItems = collage
    ? Array.from(collage.children).map((el) => {
        const r = el.getBoundingClientRect();
        const cls = typeof el.className === "string" ? el.className : "";
        return {
          cls: cls.split(/\s+/).filter((c) => c.startsWith("tilt-")).join(" "),
          rotate: getComputedStyle(el).rotate,
          top: Math.round(r.top),
          left: Math.round(r.left),
        };
      })
    : [];

  const fonts = ["font-display", "font-space", "font-caveat", "font-grotesk"].map((cls) => {
    const el = document.querySelector("." + cls);
    return { cls, family: el ? getComputedStyle(el).fontFamily.slice(0, 42) : "MISSING" };
  });

  return {
    scrollW,
    clientW,
    layoutW,
    scrollbarAllowance,
    maxScrollX,
    // A genuine horizontal overflow means the page can actually be panned
    // sideways, not merely that scrollWidth is larger than clientWidth.
    horizontalOverflow: maxScrollX > 0,
    scrollWExceedsLayout: scrollW > layoutW + 1,
    overflowingCount: overflowing.length,
    overflowing: overflowing.slice(0, 10),
    tiltCount: tilts.length,
    tilts,
    headings,
    hero,
    collageItems,
    fonts,
  };
})()
