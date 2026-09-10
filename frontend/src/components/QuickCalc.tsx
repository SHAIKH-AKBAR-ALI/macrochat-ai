import { useEffect, useState } from "preact/hooks";
import {
  dailyGoals,
  lbToKg,
  inToCm,
  type Activity,
  type Goal,
  type Sex,
} from "../lib/macros.ts";

type Units = "metric" | "imperial";

interface State {
  units: Units;
  sex: Sex;
  age: string;
  weight: string; // kg or lb per units
  heightCm: string;
  heightFt: string;
  heightIn: string;
  activity: Activity;
  goal: Goal;
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
};

const KEY = "mc_calc";

function load(): State {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch {
    /* unavailable or corrupt — fall through to defaults */
  }
  return DEFAULTS;
}

function num(s: string): number {
  const n = parseFloat(s);
  return Number.isFinite(n) ? n : 0;
}

export default function QuickCalc() {
  const [s, setS] = useState<State>(DEFAULTS);

  // Restore after mount so SSR markup and first client render match.
  useEffect(() => setS(load()), []);
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(s));
    } catch {
      /* ignore quota / private mode */
    }
  }, [s]);

  const set = (patch: Partial<State>) => setS((p) => ({ ...p, ...patch }));

  const weightKg = s.units === "metric" ? num(s.weight) : lbToKg(num(s.weight));
  const heightCm =
    s.units === "metric"
      ? num(s.heightCm)
      : inToCm(num(s.heightFt) * 12 + num(s.heightIn));
  const age = num(s.age);

  const valid = weightKg > 0 && heightCm > 0 && age > 0;
  const r = valid
    ? dailyGoals({
        weightKg,
        heightCm,
        age,
        sex: s.sex,
        activity: s.activity,
        goal: s.goal,
      })
    : null;

  return (
    <div class="qc">
      <div class="qc__form">
        <label class="field">
          <span>Units</span>
          <select
            value={s.units}
            onChange={(e) => set({ units: (e.target as HTMLSelectElement).value as Units })}
          >
            <option value="metric">Metric (kg, cm)</option>
            <option value="imperial">Imperial (lb, ft/in)</option>
          </select>
        </label>

        <label class="field">
          <span>Sex</span>
          <select
            value={s.sex}
            onChange={(e) => set({ sex: (e.target as HTMLSelectElement).value as Sex })}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>

        <label class="field">
          <span>Age</span>
          <input
            type="number"
            inputMode="numeric"
            min="14"
            max="100"
            value={s.age}
            onInput={(e) => set({ age: (e.target as HTMLInputElement).value })}
          />
        </label>

        <label class="field">
          <span>Weight ({s.units === "metric" ? "kg" : "lb"})</span>
          <input
            type="number"
            inputMode="decimal"
            min="0"
            value={s.weight}
            onInput={(e) => set({ weight: (e.target as HTMLInputElement).value })}
          />
        </label>

        {s.units === "metric" ? (
          <label class="field">
            <span>Height (cm)</span>
            <input
              type="number"
              inputMode="decimal"
              min="0"
              value={s.heightCm}
              onInput={(e) => set({ heightCm: (e.target as HTMLInputElement).value })}
            />
          </label>
        ) : (
          <div class="field qc__hrow">
            <span>Height</span>
            <div>
              <input
                type="number"
                inputMode="numeric"
                min="0"
                aria-label="Height feet"
                value={s.heightFt}
                onInput={(e) => set({ heightFt: (e.target as HTMLInputElement).value })}
              />
              <input
                type="number"
                inputMode="numeric"
                min="0"
                max="11"
                aria-label="Height inches"
                value={s.heightIn}
                onInput={(e) => set({ heightIn: (e.target as HTMLInputElement).value })}
              />
            </div>
          </div>
        )}

        <label class="field">
          <span>Activity</span>
          <select
            value={s.activity}
            onChange={(e) =>
              set({ activity: (e.target as HTMLSelectElement).value as Activity })
            }
          >
            <option value="sedentary">Sedentary — desk job, little exercise</option>
            <option value="light">Light — 1–3 workouts/week</option>
            <option value="moderate">Moderate — 3–5 workouts/week</option>
            <option value="active">Active — 6–7 workouts/week</option>
            <option value="very_active">Very active — hard training / physical job</option>
          </select>
        </label>

        <label class="field">
          <span>Goal</span>
          <select
            value={s.goal}
            onChange={(e) => set({ goal: (e.target as HTMLSelectElement).value as Goal })}
          >
            <option value="lose">Lose fat (−500 kcal)</option>
            <option value="maintain">Maintain</option>
            <option value="gain">Gain (+300 kcal)</option>
          </select>
        </label>
      </div>

      <div class="facts" aria-live="polite">
        <div class="facts__title">Your daily target</div>
        <div class="facts__row facts__row--hero">
          <b>Calories</b>
          <span class="num">{r ? `${r.calories} kcal` : "—"}</span>
        </div>
        <div class="facts__row facts__row--thick">
          <span>BMR {r ? `${r.bmr}` : "—"} · TDEE {r ? `${r.tdee}` : "—"}</span>
          <span class="num" />
        </div>
        <div class="facts__row">
          <b>Protein</b>
          <span class="num">{r ? `${r.protein} g` : "—"}</span>
        </div>
        <div class="facts__row">
          <b>Carbs</b>
          <span class="num">{r ? `${r.carbs} g` : "—"}</span>
        </div>
        <div class="facts__row">
          <b>Fat</b>
          <span class="num">{r ? `${r.fat} g` : "—"}</span>
        </div>
        <div class="facts__note">
          Mifflin-St Jeor · protein 1.8 g/kg · fat 25% of calories. Saved on this
          device, no account.
        </div>
        <a class="btn btn--ghost qc__full" href="/calculator">
          Use the full calculator →
        </a>
      </div>
    </div>
  );
}
