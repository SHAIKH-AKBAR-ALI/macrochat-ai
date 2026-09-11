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

export default function FullCalc({ t }: { t: Record<string, string> }) {
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
          <span>{t.units}</span>
          <select value={s.units} onChange={(e) => set({ units: sel(e) as Units })}>
            <option value="metric">{t["units.metric"]}</option>
            <option value="imperial">{t["units.imperial"]}</option>
          </select>
        </label>

        <label class="field">
          <span>{t.sex}</span>
          <select value={s.sex} onChange={(e) => set({ sex: sel(e) as Sex })}>
            <option value="male">{t["sex.male"]}</option>
            <option value="female">{t["sex.female"]}</option>
          </select>
        </label>

        <label class="field">
          <span>{t.age}</span>
          <input type="number" inputMode="numeric" min="14" max="100" value={s.age}
            onInput={(e) => set({ age: inp(e) })} />
        </label>

        <label class="field">
          <span>{t.weight} ({s.units === "metric" ? "kg" : "lb"})</span>
          <input type="number" inputMode="decimal" min="0" value={s.weight}
            onInput={(e) => set({ weight: inp(e) })} />
        </label>

        {s.units === "metric" ? (
          <label class="field">
            <span>{t.heightCm}</span>
            <input type="number" inputMode="decimal" min="0" value={s.heightCm}
              onInput={(e) => set({ heightCm: inp(e) })} />
          </label>
        ) : (
          <div class="field qc__hrow">
            <span>{t.height}</span>
            <div>
              <input type="number" inputMode="numeric" min="0" aria-label={t["height.feet"]}
                value={s.heightFt} onInput={(e) => set({ heightFt: inp(e) })} />
              <input type="number" inputMode="numeric" min="0" max="11" aria-label={t["height.inches"]}
                value={s.heightIn} onInput={(e) => set({ heightIn: inp(e) })} />
            </div>
          </div>
        )}

        <label class="field">
          <span>{t.activity}</span>
          <select value={s.activity} onChange={(e) => set({ activity: sel(e) as Activity })}>
            <option value="sedentary">{t["act.sedentaryLong"]}</option>
            <option value="light">{t["act.lightLong"]}</option>
            <option value="moderate">{t["act.moderateLong"]}</option>
            <option value="active">{t["act.activeLong"]}</option>
            <option value="very_active">{t["act.veryActiveLong"]}</option>
          </select>
        </label>

        <label class="field">
          <span>{t.goal}</span>
          <select value={s.goal} onChange={(e) => set({ goal: sel(e) as Goal })}>
            <option value="lose">{t["goal.lose"]}</option>
            <option value="maintain">{t["goal.maintain"]}</option>
            <option value="gain">{t["goal.gain"]}</option>
          </select>
        </label>

        <details class="qc__adv">
          <summary>{t.advanced}</summary>
          <label class="field">
            <span>{t.bodyfat}</span>
            <input type="number" inputMode="decimal" min="0" max="60" placeholder={t.optional}
              value={s.bodyFat} onInput={(e) => set({ bodyFat: inp(e) })} />
          </label>
          <label class="field">
            <span>{t.experience}</span>
            {/* ponytail: collected for guidance copy, not part of the formula */}
            <select value={s.experience} onChange={(e) => set({ experience: sel(e) as Experience })}>
              <option value="beginner">{t["exp.beginner"]}</option>
              <option value="intermediate">{t["exp.intermediate"]}</option>
              <option value="advanced">{t["exp.advanced"]}</option>
            </select>
          </label>
        </details>
      </div>

      <div class="facts" aria-live="polite">
        <div class="facts__title">{t.yourTarget}</div>
        <div class="facts__row facts__row--hero">
          <b>{t.calories}</b>
          <span class="num">{r ? `${r.calories} kcal` : "—"}</span>
        </div>
        <div class="facts__row">
          <span>{t.bmr} <small>({r?.formula === "katch" ? "Katch-McArdle" : "Mifflin-St Jeor"})</small></span>
          <span class="num">{r ? `${r.bmr} kcal` : "—"}</span>
        </div>
        <div class="facts__row">
          <span>{t.tdeeMaint}</span>
          <span class="num">{r ? `${r.tdee} kcal` : "—"}</span>
        </div>
        <div class="facts__row">
          <span>{t.bmiWater}</span>
          <span class="num">
            {valid ? `${bodyMassIndex.toFixed(1)} · ${(water / 1000).toFixed(1)} L` : "—"}
          </span>
        </div>
        <div class="facts__note">{t["fc.note"]}</div>
        <a class="btn btn--ghost qc__full" href="/signup">{t["qc.save"]}</a>
      </div>

      <div class="split-wrap">
        <MacroSplit kcal={r ? r.calories : 0} t={t} />
      </div>
    </div>
  );
}
