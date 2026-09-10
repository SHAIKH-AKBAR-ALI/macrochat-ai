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

export default function MiniCalc({ mode, t, calcHref = "/calculator" }: {
  mode: Mode;
  t: Record<string, string>;
  calcHref?: string;
}) {
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
        { label: t.bmr, value: `${Math.round(bmr)} ${t["unit.kcalDay"]}` },
        { label: t.formula, value: bf > 0 ? "Katch-McArdle" : "Mifflin-St Jeor" },
      ];
    } else if (mode === "tdee") {
      out = [
        { label: t.tdeeMaint, value: `${Math.round(maint)} ${t["unit.kcalDay"]}` },
        { label: t.bmr, value: `${Math.round(bmr)} ${t["unit.kcalDay"]}` },
        { label: t["mini.activityFactor"], value: `×${ACTIVITY_FACTORS[s.activity]}` },
      ];
    } else if (mode === "protein") {
      out = [
        { label: t["mini.proteinTarget"], value: `${Math.round(1.8 * wKg)} ${t["unit.gDay"]}` },
        {
          label: t["mini.range"],
          value: `${Math.round(1.6 * wKg)}–${Math.round(2.2 * wKg)} ${t["unit.gDay"]}`,
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
        { label: t["mini.dailyCalories"], value: `${Math.round(target)} ${t["unit.kcalDay"]}` },
        { label: t["mini.maintenance"], value: `${Math.round(maint)} ${t["unit.kcalDay"]}` },
        { label: t["mini.weeklyRate"], value: `${weeklyKg.toFixed(2)} ${t["unit.kgWeek"]}` },
        {
          label: t["mini.timeToGoal"],
          value: weeks
            ? `${Math.ceil(weeks)} ${t["unit.weeks"]} · ${date}`
            : t["mini.setLower"],
        },
      ];
    }
  }

  const wLabel = s.units === "metric" ? "kg" : "lb";

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

        {mode !== "protein" && (
          <label class="field">
            <span>{t.sex}</span>
            <select value={s.sex} onChange={(e) => set({ sex: sel(e) as Sex })}>
              <option value="male">{t["sex.male"]}</option>
              <option value="female">{t["sex.female"]}</option>
            </select>
          </label>
        )}

        <label class="field">
          <span>{t.age}</span>
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
          ))}

        {(mode === "tdee" || mode === "deficit") && (
          <label class="field">
            <span>{t.activity}</span>
            <select value={s.activity} onChange={(e) => set({ activity: sel(e) as Activity })}>
              <option value="sedentary">{t["act.sedentary"]}</option>
              <option value="light">{t["act.lightLong"]}</option>
              <option value="moderate">{t["act.moderateLong"]}</option>
              <option value="active">{t["act.activeLong"]}</option>
              <option value="very_active">{t["act.veryActive"]}</option>
            </select>
          </label>
        )}

        {(mode === "bmr" || mode === "tdee" || mode === "deficit") && (
          <label class="field">
            <span>{t.bodyfatShort}</span>
            <input type="number" inputMode="decimal" min="0" max="60" placeholder={t.optional}
              value={s.bodyFat} onInput={(e) => set({ bodyFat: inp(e) })} />
          </label>
        )}

        {mode === "deficit" && (
          <>
            <label class="field">
              <span>{t["mini.goalWeight"]} ({wLabel})</span>
              <input type="number" inputMode="decimal" min="0" value={s.goalWeight}
                onInput={(e) => set({ goalWeight: inp(e) })} />
            </label>
            <label class="field">
              <span>{t["mini.dailyDeficit"]}</span>
              <input type="number" inputMode="numeric" min="0" step="50" value={s.deficit}
                onInput={(e) => set({ deficit: inp(e) })} />
            </label>
          </>
        )}
      </div>

      <div class="facts" aria-live="polite">
        <div class="facts__title">{t.result}</div>
        {out.length ? (
          out.map((o, i) => (
            <div class={`facts__row${i === 0 ? " facts__row--hero" : ""}`}>
              <b>{o.label}</b>
              <span class="num">{o.value}</span>
            </div>
          ))
        ) : (
          <div class="facts__row"><span>{t.fillFields}</span><span class="num">—</span></div>
        )}
        <div class="facts__note">
          Runs in your browser — saved on this device, no account. Sign up to track
          meals against these numbers.
        </div>
        <a class="btn btn--ghost qc__full" href={calcHref}>{t["qc.fullMini"]}</a>
      </div>
    </div>
  );
}
