import { useEffect, useState } from "preact/hooks";
import {
  bmrMifflin,
  bmrKatchMcArdle,
  tdee,
  lbToKg,
  inToCm,
  ACTIVITY_FACTORS,
  type Activity,
  type Sex,
} from "../lib/macros.ts";

export type Mode = "tdee" | "bmr" | "protein" | "deficit";

type Units = "metric" | "imperial";

interface State {
  units: Units;
  sex: Sex;
  age: string;
  weight: string;
  heightCm: string;
  heightFt: string;
  heightIn: string;
  activity: Activity;
  bodyFat: string;
  goalWeight: string; // deficit mode
  deficit: string; // deficit mode, kcal/day
}

const DEFAULTS: State = {
  units: "metric",
  sex: "male",
  age: "30",
  weight: "75",
  heightCm: "178",
  heightFt: "5",
  heightIn: "10",
  activity: "moderate",
  bodyFat: "",
  goalWeight: "70",
  deficit: "500",
};

const KEY = "mc_calc_mini";

function load(): State {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch {
    /* unavailable / corrupt */
  }
  return DEFAULTS;
}

const num = (s: string) => {
  const n = parseFloat(s);
  return Number.isFinite(n) ? n : 0;
};
const sel = (e: Event) => (e.target as HTMLSelectElement).value;
const inp = (e: Event) => (e.target as HTMLInputElement).value;

export default function MiniCalc({ mode }: { mode: Mode }) {
  const [s, setS] = useState<State>(DEFAULTS);
  useEffect(() => setS(load()), []);
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(s));
    } catch {
      /* ignore */
    }
  }, [s]);
  const set = (p: Partial<State>) => setS((v) => ({ ...v, ...p }));

  const wKg = s.units === "metric" ? num(s.weight) : lbToKg(num(s.weight));
  const hCm =
    s.units === "metric"
      ? num(s.heightCm)
      : inToCm(num(s.heightFt) * 12 + num(s.heightIn));
  const age = num(s.age);
  const bf = num(s.bodyFat);
  const needsHeight = mode !== "protein";
  const valid = wKg > 0 && age > 0 && (!needsHeight || hCm > 0);

  const bmr = bf > 0 ? bmrKatchMcArdle(wKg, bf) : bmrMifflin(hCm, wKg, age, s.sex);
  const maint = tdee(bmr, s.activity);

  let out: { label: string; value: string }[] = [];
  if (valid) {
    if (mode === "bmr") {
      out = [
        { label: "BMR", value: `${Math.round(bmr)} kcal/day` },
        { label: "Formula", value: bf > 0 ? "Katch-McArdle" : "Mifflin-St Jeor" },
      ];
    } else if (mode === "tdee") {
      out = [
        { label: "TDEE (maintenance)", value: `${Math.round(maint)} kcal/day` },
        { label: "BMR", value: `${Math.round(bmr)} kcal/day` },
        { label: "Activity factor", value: `×${ACTIVITY_FACTORS[s.activity]}` },
      ];
    } else if (mode === "protein") {
      out = [
        { label: "Target (1.8 g/kg)", value: `${Math.round(1.8 * wKg)} g/day` },
        {
          label: "Reasonable range",
          value: `${Math.round(1.6 * wKg)}–${Math.round(2.2 * wKg)} g/day`,
        },
      ];
    } else {
      // deficit
      const gw = s.units === "metric" ? num(s.goalWeight) : lbToKg(num(s.goalWeight));
      const d = num(s.deficit);
      const target = maint - d;
      const weeklyKg = (d * 7) / 7700; // ~7700 kcal per kg of fat
      const toLoseKg = wKg - gw;
      const weeks = weeklyKg > 0 && toLoseKg > 0 ? toLoseKg / weeklyKg : 0;
      const date = weeks
        ? new Date(Date.now() + weeks * 7 * 864e5).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        : "—";
      out = [
        { label: "Daily calories", value: `${Math.round(target)} kcal/day` },
        { label: "Maintenance", value: `${Math.round(maint)} kcal/day` },
        { label: "Weekly rate", value: `${weeklyKg.toFixed(2)} kg/week` },
        {
          label: "Time to goal",
          value: weeks ? `${Math.ceil(weeks)} weeks · ${date}` : "set a lower goal weight",
        },
      ];
    }
  }

  const wLabel = s.units === "metric" ? "kg" : "lb";

  return (
    <div class="qc">
      <div class="qc__form">
        <label class="field">
          <span>Units</span>
          <select value={s.units} onChange={(e) => set({ units: sel(e) as Units })}>
            <option value="metric">Metric (kg, cm)</option>
            <option value="imperial">Imperial (lb, ft/in)</option>
          </select>
        </label>

        {mode !== "protein" && (
          <label class="field">
            <span>Sex</span>
            <select value={s.sex} onChange={(e) => set({ sex: sel(e) as Sex })}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>
        )}

        <label class="field">
          <span>Age</span>
          <input type="number" inputMode="numeric" min="14" max="100" value={s.age}
            onInput={(e) => set({ age: inp(e) })} />
        </label>

        <label class="field">
          <span>Weight ({wLabel})</span>
          <input type="number" inputMode="decimal" min="0" value={s.weight}
            onInput={(e) => set({ weight: inp(e) })} />
        </label>

        {needsHeight &&
          (s.units === "metric" ? (
            <label class="field">
              <span>Height (cm)</span>
              <input type="number" inputMode="decimal" min="0" value={s.heightCm}
                onInput={(e) => set({ heightCm: inp(e) })} />
            </label>
          ) : (
            <div class="field qc__hrow">
              <span>Height</span>
              <div>
                <input type="number" inputMode="numeric" min="0" aria-label="Height feet"
                  value={s.heightFt} onInput={(e) => set({ heightFt: inp(e) })} />
                <input type="number" inputMode="numeric" min="0" max="11" aria-label="Height inches"
                  value={s.heightIn} onInput={(e) => set({ heightIn: inp(e) })} />
              </div>
            </div>
          ))}

        {(mode === "tdee" || mode === "deficit") && (
          <label class="field">
            <span>Activity</span>
            <select value={s.activity} onChange={(e) => set({ activity: sel(e) as Activity })}>
              <option value="sedentary">Sedentary</option>
              <option value="light">Light — 1–3 workouts/week</option>
              <option value="moderate">Moderate — 3–5 workouts/week</option>
              <option value="active">Active — 6–7 workouts/week</option>
              <option value="very_active">Very active</option>
            </select>
          </label>
        )}

        {(mode === "bmr" || mode === "tdee" || mode === "deficit") && (
          <label class="field">
            <span>Body fat % (optional → Katch-McArdle)</span>
            <input type="number" inputMode="decimal" min="0" max="60" placeholder="optional"
              value={s.bodyFat} onInput={(e) => set({ bodyFat: inp(e) })} />
          </label>
        )}

        {mode === "deficit" && (
          <>
            <label class="field">
              <span>Goal weight ({wLabel})</span>
              <input type="number" inputMode="decimal" min="0" value={s.goalWeight}
                onInput={(e) => set({ goalWeight: inp(e) })} />
            </label>
            <label class="field">
              <span>Daily deficit (kcal)</span>
              <input type="number" inputMode="numeric" min="0" step="50" value={s.deficit}
                onInput={(e) => set({ deficit: inp(e) })} />
            </label>
          </>
        )}
      </div>

      <div class="facts" aria-live="polite">
        <div class="facts__title">Result</div>
        {out.length ? (
          out.map((o, i) => (
            <div class={`facts__row${i === 0 ? " facts__row--hero" : ""}`}>
              <b>{o.label}</b>
              <span class="num">{o.value}</span>
            </div>
          ))
        ) : (
          <div class="facts__row"><span>Fill in the fields</span><span class="num">—</span></div>
        )}
        <div class="facts__note">
          Runs in your browser — saved on this device, no account. Sign up to track
          meals against these numbers.
        </div>
        <a class="btn btn--ghost qc__full" href="/calculator">Full macro calculator →</a>
      </div>
    </div>
  );
}
