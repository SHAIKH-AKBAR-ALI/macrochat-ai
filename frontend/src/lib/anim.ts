// Shared motion utilities. All animation here respects prefers-reduced-motion.
export const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;

const fmtNum = (n: number) => n.toLocaleString("en-US");

// Count a number up from 0 to its data-count target. Instant when reduced motion.
export function countUp(el: HTMLElement) {
  if (el.dataset.counted) return;
  el.dataset.counted = "1";
  const target = Number(el.dataset.count || "0");
  const suffix = el.dataset.suffix || "";
  if (REDUCED || !target) {
    el.textContent = fmtNum(target) + suffix;
    return;
  }
  const dur = 700;
  const t0 = performance.now();
  const tick = (t: number) => {
    const p = Math.min((t - t0) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = fmtNum(Math.round(target * eased)) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

const SVGNS = "http://www.w3.org/2000/svg";

// Weekly kcal bar chart: one bar per day vs a goal line. Bars over goal turn coral.
export function weekChart(
  series: { date: string; kcal: number }[],
  goal: number,
): HTMLElement {
  const W = 100, H = 44, pad = 2;
  const max = Math.max(goal, ...series.map((d) => d.kcal), 1) * 1.1;
  const bw = (W - pad * 2) / series.length;
  const svg = document.createElementNS(SVGNS, "svg");
  svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
  svg.setAttribute("class", "weekchart__svg");
  svg.setAttribute("preserveAspectRatio", "none");
  svg.setAttribute("role", "img");
  svg.setAttribute("aria-label",
    `Calories per day for ${series.length} days, goal ${goal}`);

  series.forEach((d, i) => {
    const h = (d.kcal / max) * (H - pad * 2);
    const r = document.createElementNS(SVGNS, "rect");
    r.setAttribute("x", String(pad + i * bw + bw * 0.15));
    r.setAttribute("y", String(H - pad - h));
    r.setAttribute("width", String(bw * 0.7));
    r.setAttribute("height", String(Math.max(h, 0.5)));
    r.setAttribute("rx", "0.6");
    r.setAttribute("fill", d.kcal > goal ? "var(--burnt)" : "var(--amber)");
    if (!d.kcal) r.setAttribute("fill", "var(--border, #ccc)");
    svg.append(r);
  });

  const gy = H - pad - (goal / max) * (H - pad * 2);
  const line = document.createElementNS(SVGNS, "line");
  line.setAttribute("x1", String(pad));
  line.setAttribute("x2", String(W - pad));
  line.setAttribute("y1", String(gy));
  line.setAttribute("y2", String(gy));
  line.setAttribute("stroke", "var(--ink)");
  line.setAttribute("stroke-width", "0.5");
  line.setAttribute("stroke-dasharray", "1.5 1.5");
  line.setAttribute("opacity", "0.5");
  svg.append(line);

  const wrap = document.createElement("div");
  wrap.className = "weekchart";
  wrap.append(svg);
  const labels = document.createElement("div");
  labels.className = "weekchart__labels";
  series.forEach((d) => {
    const s = document.createElement("span");
    s.textContent = new Date(d.date + "T00:00").toLocaleDateString(undefined, { weekday: "narrow" });
    labels.append(s);
  });
  wrap.append(labels);
  return wrap;
}

// Macro donut: protein/carbs/fat as share of kcal (4/4/9 per gram).
// Returns null when any macro is missing (photo miss) — caller skips the row.
export function donut(p: number | null, c: number | null, f: number | null): HTMLElement | null {
  if (p == null || c == null || f == null) return null;
  const kcal = [p * 4, c * 4, f * 9];
  const total = kcal[0] + kcal[1] + kcal[2];
  if (total <= 0) return null;
  const pct = kcal.map((k) => (k / total) * 100);
  const colors = ["var(--amber)", "var(--burnt)", "var(--mute)"];
  const labels = ["Protein", "Carbs", "Fat"];

  const svg = document.createElementNS(SVGNS, "svg");
  svg.setAttribute("viewBox", "0 0 42 42");
  svg.setAttribute("class", "donut__svg");
  svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", labels.map((l, i) => `${l} ${Math.round(pct[i])}%`).join(", "));
  let offset = 0;
  pct.forEach((share, i) => {
    const circle = document.createElementNS(SVGNS, "circle");
    circle.setAttribute("cx", "21");
    circle.setAttribute("cy", "21");
    circle.setAttribute("r", "15.5");
    circle.setAttribute("fill", "none");
    circle.setAttribute("stroke", colors[i]);
    circle.setAttribute("stroke-width", "9");
    circle.setAttribute("pathLength", "100");
    // gap-free ring: each segment draws its share, rotated past the previous ones
    circle.setAttribute("stroke-dasharray", `${share} ${100 - share}`);
    circle.setAttribute("stroke-dashoffset", String(-offset));
    circle.setAttribute("transform", "rotate(-90 21 21)");
    offset += share;
    svg.append(circle);
  });

  const wrap = document.createElement("div");
  wrap.className = "donut";
  wrap.append(svg);
  const legend = document.createElement("div");
  legend.className = "donut__legend";
  labels.forEach((l, i) => {
    const item = document.createElement("span");
    const swatch = document.createElement("i");
    swatch.style.background = colors[i];
    item.append(swatch, `${l} ${Math.round(pct[i])}%`);
    legend.append(item);
  });
  wrap.append(legend);
  if (!REDUCED) {
    wrap.classList.add("donut--anim");
    requestAnimationFrame(() => requestAnimationFrame(() => wrap.classList.add("donut--in")));
  }
  return wrap;
}
