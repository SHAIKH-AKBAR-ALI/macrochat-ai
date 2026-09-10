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

// Weekly kcal bar chart vs a goal band. Today's bar is emphasised; over-goal days
// turn coral. Hover any bar for the exact number (native SVG <title>).
export function weekChart(
  series: { date: string; kcal: number }[],
  goal: number,
): HTMLElement {
  const W = 300, H = 132, padX = 6, padTop = 10, padBot = 6;
  const plotH = H - padTop - padBot;
  const max = Math.max(goal * 1.25, ...series.map((d) => d.kcal), 1);
  const slot = (W - padX * 2) / series.length;
  const bw = Math.min(slot * 0.52, 30);
  const y = (v: number) => padTop + plotH - (v / max) * plotH;

  const svg = document.createElementNS(SVGNS, "svg");
  svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
  svg.setAttribute("class", "weekchart__svg");
  svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", `Calories per day for ${series.length} days, goal ${goal} kcal`);

  const rect = (x: number, yy: number, w: number, h: number, cls: string, r = 0) => {
    const el = document.createElementNS(SVGNS, "rect");
    el.setAttribute("x", String(x)); el.setAttribute("y", String(yy));
    el.setAttribute("width", String(w)); el.setAttribute("height", String(Math.max(h, 0)));
    if (r) { el.setAttribute("rx", String(r)); el.setAttribute("ry", String(r)); }
    el.setAttribute("class", cls);
    return el;
  };

  // goal band (±8%) + centre line
  svg.append(rect(padX, y(goal * 1.08), W - padX * 2, y(goal * 0.92) - y(goal * 1.08), "weekchart__band"));
  const gline = document.createElementNS(SVGNS, "line");
  gline.setAttribute("x1", String(padX)); gline.setAttribute("x2", String(W - padX));
  gline.setAttribute("y1", String(y(goal))); gline.setAttribute("y2", String(y(goal)));
  gline.setAttribute("class", "weekchart__goal");
  svg.append(gline);

  // baseline
  const base = document.createElementNS(SVGNS, "line");
  base.setAttribute("x1", String(padX)); base.setAttribute("x2", String(W - padX));
  base.setAttribute("y1", String(padTop + plotH)); base.setAttribute("y2", String(padTop + plotH));
  base.setAttribute("class", "weekchart__base");
  svg.append(base);

  series.forEach((d, i) => {
    const cx = padX + slot * i + slot / 2;
    const x = cx - bw / 2;
    const g = document.createElementNS(SVGNS, "g");
    const isToday = i === series.length - 1;
    if (!d.kcal) {
      const stub = rect(x, padTop + plotH - 3, bw, 3, "weekchart__stub", 1.5);
      g.append(stub);
    } else {
      const h = padTop + plotH - y(d.kcal);
      let cls = "weekchart__bar";
      if (d.kcal > goal * 1.08) cls += " is-over";
      if (isToday) cls += " is-today";
      g.append(rect(x, y(d.kcal), bw, h, cls, 3));
    }
    const t = document.createElementNS(SVGNS, "title");
    t.textContent = `${new Date(d.date + "T00:00").toLocaleDateString(undefined, { weekday: "short", day: "numeric" })}: ${Math.round(d.kcal)} kcal`;
    g.append(t);
    svg.append(g);
  });

  const wrap = document.createElement("div");
  wrap.className = "weekchart";
  wrap.append(svg);
  const labels = document.createElement("div");
  labels.className = "weekchart__labels";
  series.forEach((d, i) => {
    const s = document.createElement("span");
    if (i === series.length - 1) s.className = "is-today";
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
