// Summarises logs/responsive.out.json into a compact per-viewport table.
const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "..", "logs", "responsive.out.json");
let raw = fs.readFileSync(file, "utf8");
const start = raw.indexOf("[");
const end = raw.lastIndexOf("]");
const data = JSON.parse(raw.slice(start, end + 1));

const r320 = data.find((r) => r.viewport.startsWith("mobile-320"));
if (!r320) { console.log("no 320 entry"); process.exit(0); }
console.log("VIEWPORT :", r320.viewport);
console.log("applied  :", JSON.stringify(r320.appliedViewport));
console.log("scrollW  :", r320.scrollW, " clientW:", r320.clientW, " hOverflow:", r320.horizontalOverflow);
console.log("overflowingCount:", r320.overflowingCount);
console.log("\n--- elements whose rect exceeds clientWidth (320) ---");
console.log("tag".padEnd(8), "left".padStart(6), "right".padStart(7), "w".padStart(6), "  cls");
for (const o of r320.overflowing) {
  console.log(
    o.tag.padEnd(8),
    String(o.left).padStart(6),
    String(o.right).padStart(7),
    String(o.w).padStart(6),
    "  " + (o.cls || "(none)")
  );
}
console.log("\n--- hero / headings ---");
console.log("hero:", JSON.stringify(r320.hero));
for (const h of r320.headings) {
  console.log(" ", h.tag, JSON.stringify(h.text), "fs=" + h.fs, "lines=" + h.lines, "overflowX=" + h.overflowX);
}
console.log("\nconsoleErrors:", JSON.stringify(r320.consoleErrors || []));

const pad = (s, n) => String(s).padEnd(n);
console.log(
  pad("viewport", 24) + pad("inner", 7) + pad("client", 8) +
  pad("scrollW", 9) + pad("hOverflow", 10) + pad("overCnt", 8) +
  pad("tilts", 7) + pad("h1fs", 9) + "fontOk"
);
console.log("-".repeat(95));
let anyOverflow = 0;
for (const r of data) {
  const h1fs = r.hero ? r.hero.fs : "-";
  const fonts = r.fonts.map((f) => (f.family || "").split(",")[0].replace(/"/g, ""));
  const fontOk = fonts.join("|");
  if (r.horizontalOverflow) anyOverflow++;
  console.log(
    pad(r.viewport, 24) +
    pad((r.appliedViewport && r.appliedViewport.inner) || "-", 7) +
    pad((r.appliedViewport && r.appliedViewport.client) || "-", 8) +
    pad(r.scrollW, 9) +
    pad(String(r.horizontalOverflow), 10) +
    pad(r.overflowingCount, 8) +
    pad(r.tiltCount, 7) +
    pad(h1fs, 9) +
    fontOk
  );
}
console.log("\nviewports tested :", data.length);
console.log("viewports w/ real horizontal overflow:", anyOverflow);
console.log("tilt counts     :", data.map((r) => r.tiltCount).join(", "));
console.log("headings clipped:", data.map((r) => r.headings.filter((h) => h.overflowX).length).join(", "));
console.log("hero overflowX  :", data.map((r) => (r.hero && r.hero.overflowX)).join(", "));
