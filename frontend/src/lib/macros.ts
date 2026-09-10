// Client-side macro math. Ported from app/db.py `daily_goals` — numbers must stay
// identical to the backend (see macros.test.ts parity assert).
//
// ponytail: JS Math.round is half-up; Python round() is banker's rounding. They
// only disagree when a value lands exactly on .5, which daily_goals outputs
// almost never do. If a real body-stat combo ever hits it, add a roundHalfEven.

export type Sex = "male" | "female";
export type Activity = "sedentary" | "light" | "moderate" | "active" | "very_active";
export type Goal = "lose" | "maintain" | "gain";

export const ACTIVITY_FACTORS: Record<Activity, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
};

export const GOAL_KCAL_ADJUST: Record<Goal, number> = {
  lose: -500,
  maintain: 0,
  gain: 300,
};

/** Mifflin-St Jeor BMR (kcal/day). */
export function bmrMifflin(heightCm: number, weightKg: number, age: number, sex: Sex): number {
  return 10 * weightKg + 6.25 * heightCm - 5 * age + (sex === "male" ? 5 : -161);
}

/** Katch-McArdle BMR — needs body-fat %. Used by the full calculator (R3). */
export function bmrKatchMcArdle(weightKg: number, bodyFatPct: number): number {
  const leanKg = weightKg * (1 - bodyFatPct / 100);
  return 370 + 21.6 * leanKg;
}

export function tdee(bmr: number, activity: Activity): number {
  return bmr * ACTIVITY_FACTORS[activity];
}

export function goalAdjust(tdeeKcal: number, goal: Goal): number {
  return tdeeKcal + GOAL_KCAL_ADJUST[goal];
}

/**
 * Split a calorie target into grams the same way app/db.py does:
 * protein = 1.8 g/kg, fat = 25% of kcal, carbs = remainder.
 */
export function splitMacros(kcal: number, weightKg: number) {
  const proteinG = 1.8 * weightKg;
  const fatG = (kcal * 0.25) / 9;
  const carbG = (kcal - proteinG * 4 - fatG * 9) / 4;
  return { proteinG, fatG, carbG };
}

export interface CalcInput {
  heightCm: number;
  weightKg: number;
  age: number;
  sex: Sex;
  activity: Activity;
  goal: Goal;
  /** Optional. When > 0, BMR uses Katch-McArdle instead of Mifflin-St Jeor. */
  bodyFatPct?: number;
}

export interface CalcResult {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  bmr: number;
  tdee: number;
  formula: "mifflin" | "katch";
}

/** Full daily-target result, rounded like the backend (app/db.py). */
export function dailyGoals(i: CalcInput): CalcResult {
  const useKatch = (i.bodyFatPct ?? 0) > 0;
  const bmr = useKatch
    ? bmrKatchMcArdle(i.weightKg, i.bodyFatPct as number)
    : bmrMifflin(i.heightCm, i.weightKg, i.age, i.sex);
  const maintain = tdee(bmr, i.activity);
  const kcal = goalAdjust(maintain, i.goal);
  const { proteinG, fatG, carbG } = splitMacros(kcal, i.weightKg);
  return {
    calories: Math.round(kcal),
    protein: Math.round(proteinG),
    carbs: Math.round(carbG),
    fat: Math.round(fatG),
    bmr: Math.round(bmr),
    tdee: Math.round(maintain),
    formula: useKatch ? "katch" : "mifflin",
  };
}

/** Body Mass Index (kg/m²). */
export function bmi(heightCm: number, weightKg: number): number {
  const m = heightCm / 100;
  return m > 0 ? weightKg / (m * m) : 0;
}

/** Rough daily water target — 35 ml per kg bodyweight. */
export function waterMl(weightKg: number): number {
  return weightKg * 35;
}

/** Per-macro grams → kcal + % of total, for the results table. */
export function macroBreakdown(protein: number, carbs: number, fat: number) {
  const pk = protein * 4;
  const ck = carbs * 4;
  const fk = fat * 9;
  const total = pk + ck + fk || 1;
  return {
    protein: { g: protein, kcal: Math.round(pk), pct: Math.round((pk / total) * 100) },
    carbs: { g: carbs, kcal: Math.round(ck), pct: Math.round((ck / total) * 100) },
    fat: { g: fat, kcal: Math.round(fk), pct: Math.round((fk / total) * 100) },
  };
}

// --- macro-split control (R4) ---

/** Percent of daily calories from each macro. Always sums to 100. */
export interface Split {
  protein: number;
  carbs: number;
  fat: number;
}

export type SplitKey = keyof Split;
const SPLIT_KEYS: SplitKey[] = ["protein", "carbs", "fat"];

/** Diet presets — labelled C/P/F the way the cards read, stored as a Split. */
export const DIET_PRESETS: { id: string; name: string; label: string; split: Split }[] = [
  { id: "balanced", name: "Balanced", label: "40C / 30P / 30F", split: { protein: 30, carbs: 40, fat: 30 } },
  { id: "low-carb", name: "Low-Carb", label: "25C / 35P / 40F", split: { protein: 35, carbs: 25, fat: 40 } },
  { id: "keto", name: "Keto", label: "5C / 30P / 65F", split: { protein: 30, carbs: 5, fat: 65 } },
  { id: "high-protein", name: "High-Protein", label: "35C / 40P / 25F", split: { protein: 40, carbs: 35, fat: 25 } },
  { id: "plant-based", name: "Plant-Based", label: "50C / 25P / 25F", split: { protein: 25, carbs: 50, fat: 25 } },
];

const clamp = (n: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, n));

/**
 * Set one macro to `raw` %, keep the total at 100 by moving the unlocked others
 * in proportion to their current size. Locked macros never move. If every other
 * macro is locked, the split is returned unchanged.
 */
export function rebalanceSplit(
  cur: Split,
  locked: Record<SplitKey, boolean>,
  key: SplitKey,
  raw: number,
): Split {
  const others = SPLIT_KEYS.filter((k) => k !== key && !locked[k]);
  if (others.length === 0) return cur;

  const lockedSum = SPLIT_KEYS.filter((k) => k !== key && locked[k])
    .reduce((s, k) => s + cur[k], 0);
  const val = clamp(Math.round(raw), 0, 100 - lockedSum);
  const pool = 100 - val - lockedSum;
  const oldSum = others.reduce((s, k) => s + cur[k], 0);

  const next: Split = { ...cur, [key]: val };
  others.forEach((k, i) => {
    next[k] = oldSum > 0
      ? Math.round((pool * cur[k]) / oldSum)
      : Math.round(pool / others.length) + (i === 0 ? pool % others.length : 0);
  });
  // absorb rounding drift into the first unlocked other
  const drift = 100 - (next.protein + next.carbs + next.fat);
  next[others[0]] += drift;
  return next;
}

/** Split % + calorie target → grams per macro (protein/carbs 4 kcal/g, fat 9). */
export function gramsFromSplit(kcal: number, s: Split) {
  return {
    protein: Math.round((kcal * s.protein) / 100 / 4),
    carbs: Math.round((kcal * s.carbs) / 100 / 4),
    fat: Math.round((kcal * s.fat) / 100 / 9),
  };
}

// --- unit helpers for the lb/ft toggle ---
export const lbToKg = (lb: number) => lb * 0.45359237;
export const inToCm = (inch: number) => inch * 2.54;
