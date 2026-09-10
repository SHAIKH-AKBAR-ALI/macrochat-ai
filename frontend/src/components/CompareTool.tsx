import { useState } from "preact/hooks";

type NutKey = "kcal" | "protein" | "carb" | "fat" | "fiber" | "sugar" | "sodium" | "satfat";
interface Food {
  slug: string; name: string;
  kcal: number; protein: number; carb: number; fat: number;
  fiber: number | null; sugar: number | null; sodium: number | null; satfat: number | null;
}
interface Nut { key: NutKey; label: string; unit: string; lowerIsLeaner: boolean }
interface Serving { label: string; grams: number }

const num = (s: string) => {
  const n = parseFloat(s);
  return Number.isFinite(n) && n > 0 ? n : 0;
};

export default function CompareTool({
  a, b, nutrients, servingA, servingB,
}: {
  a: Food; b: Food; nutrients: Nut[];
  servingA?: Serving; servingB?: Serving;
}) {
  const [gA, setGA] = useState(100);
  const [gB, setGB] = useState(100);
  // "100" | "serving" | "custom" — drives which quick-button looks active
  const [mode, setMode] = useState<"100" | "serving" | "custom">("100");

  const set100 = () => { setGA(100); setGB(100); setMode("100"); };
  const setServing = () => {
    setGA(servingA?.grams ?? 100);
    setGB(servingB?.grams ?? 100);
    setMode("serving");
  };
  const bothServings = servingA && servingB;

  const scaled = (f: Food, g: number, k: NutKey): number | null => {
    const v = f[k];
    if (v == null) return null;
    return Math.round(v * g / 100 * 10) / 10;
  };

  const rows = nutrients
    .filter((n) => a[n.key] != null && b[n.key] != null)
    .map((n) => {
      const av = scaled(a, gA, n.key)!, bv = scaled(b, gB, n.key)!;
      const max = Math.max(av, bv, 0.0001);
      let winner: "a" | "b" | "tie" = "tie";
      if (Math.abs(av - bv) > max * 0.02) {
        const aBetter = n.lowerIsLeaner ? av < bv : av > bv;
        winner = aBetter ? "a" : "b";
      }
      return { ...n, av, bv, aPct: (av / max) * 100, bPct: (bv / max) * 100, winner };
    });

  const kcalA = scaled(a, gA, "kcal")!, kcalB = scaled(b, gB, "kcal")!;

  return (
    <div>
      <div class="ptool">
        <div class="ptool__modes" role="group" aria-label="Portion size">
          <button type="button" class={mode === "100" ? "is-on" : ""} onClick={set100}>Per 100 g</button>
          {bothServings && (
            <button type="button" class={mode === "serving" ? "is-on" : ""} onClick={setServing}>
              Per serving
            </button>
          )}
          <button type="button" class={mode === "custom" ? "is-on" : ""} onClick={() => setMode("custom")}>
            Custom
          </button>
        </div>
        <div class="ptool__inputs">
          <label>
            <span>{a.name}{servingA && mode === "serving" ? ` · ${servingA.label}` : ""}</span>
            <span class="ptool__g">
              <input type="number" min="1" max="2000" value={gA}
                onInput={(e) => { setGA(num((e.target as HTMLInputElement).value)); setMode("custom"); }} /> g
            </span>
          </label>
          <label>
            <span>{b.name}{servingB && mode === "serving" ? ` · ${servingB.label}` : ""}</span>
            <span class="ptool__g">
              <input type="number" min="1" max="2000" value={gB}
                onInput={(e) => { setGB(num((e.target as HTMLInputElement).value)); setMode("custom"); }} /> g
            </span>
          </label>
        </div>
      </div>

      <p class="ptool__sum mono">
        {gA} g {a.name} = <b>{kcalA} kcal</b> · {gB} g {b.name} = <b>{kcalB} kcal</b>
      </p>

      <div class="cmp">
        <div class="cmp__head">
          <span></span>
          <span class="cmp__name">{a.name}</span>
          <span class="cmp__name">{b.name}</span>
        </div>
        {rows.map((r) => (
          <div class="cmp__row">
            <div class="cmp__label">{r.label}<span class="cmp__unit">{r.unit}</span></div>
            <div class={`cmp__side${r.winner === "a" ? " is-win" : ""}`}>
              <div class="cmp__bar"><i style={`width:${r.aPct}%`}></i></div>
              <span class="cmp__val">{r.av}</span>
            </div>
            <div class={`cmp__side${r.winner === "b" ? " is-win" : ""}`}>
              <div class="cmp__bar"><i style={`width:${r.bPct}%`}></i></div>
              <span class="cmp__val">{r.bv}</span>
            </div>
          </div>
        ))}
      </div>
      <p class="cmp__key mono">
        Filled bar = higher value · <span class="cmp__key-win">tinted cell</span> = better for a lean / high-protein goal
      </p>
    </div>
  );
}
