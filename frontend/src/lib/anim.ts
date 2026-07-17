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
