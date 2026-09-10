import { useEffect, useState } from "preact/hooks";
import {
  dailyGoals,
  bmi,
  waterMl,
  lbToKg,
  inToCm,
  type Activity,
  type Goal,
  type Sex,
} from "../lib/macros.ts";
import MacroSplit from "./MacroSplit.tsx";

type Units = "metric" | "imperial";
type Experience = "beginner" | "intermediate" | "advanced";

interface State {
  units: Units;
  sex: Sex;
  age: string;
  weight: string;
  heightCm: string;
  heightFt: string;
  heightIn: string;
  activity: Activity;
  goal: Goal;
  bodyFat: string; // "" = use Mifflin
  experience: Experience;
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
  goal: "maintain",
  bodyFat: "",
  experience: "intermediate",
};

const KEY = "mc_calc_full";

function load(): State {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch {
    /* unavailable / corrupt */
  }
  return DEFAULTS;
}

function num(s: string): number {
  const n = parseFloat(s);
  return Number.isFinite(n) ? n : 0;
}

const sel = (e: Event) => (e.target as HTMLSelectElement).value;
const inp = (e: Event) => (e.target as HTMLInputElement).value;

export default function FullCalc() {
  const [s, setS] = useState<State>(DEFAULTS);

  useEffect(() => setS(load()), []);
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(s));
    } catch {
      /* ignore */
    }
  }, [s]);

  const set = (patch: Partial<State>) => setS((p) => ({ ...p, ...patch }));

  const weightKg = s.units === "metric" ? num(s.weight) : lbToKg(num(s.weight));
  const heightCm =
    s.units === "metric"
      ? num(s.heightCm)
      : inToCm(num(s.heightFt) * 12 + num(s.heightIn));
  const age = num(s.age);
  const bf = num(s.bodyFat);

  const valid = weightKg > 0 && heightCm > 0 && age > 0;
  const r = valid
    ? dailyGoals({
        weightKg,
        heightCm,
        age,
        sex: s.sex,
        activity: s.activity,
        goal: s.goal,
        bodyFatPct: bf > 0 ? bf : undefined,
      })
    : null;
  const bodyMassIndex = valid ? bmi(heightCm, weightKg) : 0;
  const water = valid ? waterMl(weightKg) : 0;

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

        <label class="field">
          <span>Sex</span>
          <select value={s.sex} onChange={(e) => set({ sex: sel(e) as Sex })}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>

        <label class="field">
          <span>Age</span>
          <input type="number" inputMode="numeric" min="14" max="100" value={s.age}
            onInput={(e) => set({ age: inp(e) })} />
        </label>

        <label class="field">
          <span>Weight ({s.units === "metric" ? "kg" : "lb"})</span>
          <input type="number" inputMode="decimal" min="0" value={s.weight}
            onInput={(e) => set({ weight: inp(e) })} />
        </label>

        {s.units === "metric" ? (
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
        )}

        <label class="field">
          <span>Activity</span>
          <select value={s.activity} onChange={(e) => set({ activity: sel(e) as Activity })}>
            <option value="sedentary">Sedentary — desk job, little exercise</option>
            <option value="light">Light — 1–3 workouts/week</option>
            <option value="moderate">Moderate — 3–5 workouts/week</option>
            <option value="active">Active — 6–7 workouts/week</option>
            <option value="very_active">Very active — hard training / physical job</option>
          </select>
        </label>

        <label class="field">
          <span>Goal</span>
          <select value={s.goal} onChange={(e) => set({ goal: sel(e) as Goal })}>
            <option value="lose">Lose fat (−500 kcal)</option>
            <option value="maintain">Maintain</option>
            <option value="gain">Gain (+300 kcal)</option>
          </select>
        </label>

        <details class="qc__adv">
          <summary>Advanced options</summary>
          <label class="field">
            <span>Body fat % (enables Katch-McArdle)</span>
            <input type="number" inputMode="decimal" min="0" max="60" placeholder="optional"
              value={s.bodyFat} onInput={(e) => set({ bodyFat: inp(e) })} />
          </label>
          <label class="field">
            <span>Training experience</span>
            {/* ponytail: collected for guidance copy, not part of the formula */}
            <select value={s.experience} onChange={(e) => set({ experience: sel(e) as Experience })}>
              <option value="beginner">Beginner (&lt; 1 yr)</option>
              <option value="intermediate">Intermediate (1–3 yr)</option>
              <option value="advanced">Advanced (3+ yr)</option>
            </select>
          </label>
        </details>
      </div>

      <div class="facts" aria-live="polite">
        <div class="facts__title">Your daily target</div>
        <div class="facts__row facts__row--hero">
          <b>Calories</b>
          <span class="num">{r ? `${r.calories} kcal` : "—"}</span>
        </div>
        <div class="facts__row">
          <span>BMR <small>({r?.formula === "katch" ? "Katch-McArdle" : "Mifflin-St Jeor"})</small></span>
          <span class="num">{r ? `${r.bmr} kcal` : "—"}</span>
        </div>
        <div class="facts__row">
          <span>TDEE (maintenance)</span>
          <span class="num">{r ? `${r.tdee} kcal` : "—"}</span>
        </div>
        <div class="facts__row">
          <span>BMI · Water</span>
          <span class="num">
            {valid ? `${bodyMassIndex.toFixed(1)} · ${(water / 1000).toFixed(1)} L` : "—"}
          </span>
        </div>
        <div class="facts__note">
          Pick a diet style or drag the split below. Saved on this device — no
          account. Sign up to track meals against this target.
        </div>
        <a class="btn btn--ghost qc__full" href="/signup">Save to your account →</a>
      </div>

      <div class="split-wrap">
        <MacroSplit kcal={r ? r.calories : 0} />
      </div>
    </div>
  );
}
