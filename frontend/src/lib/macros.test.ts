// Run: node src/lib/macros.test.ts   (Node 24 strips types natively)
// Parity: expected values are app/db.py `daily_goals` output for the same stats.
import assert from "node:assert/strict";
import {
  dailyGoals, bmrKatchMcArdle, bmi, macroBreakdown, splitMacros,
  rebalanceSplit, gramsFromSplit, DIET_PRESETS, type Split, type SplitKey,
} from "./macros.ts";

const cases = [
  {
    in: { heightCm: 178, weightKg: 75, age: 30, sex: "male", activity: "moderate", goal: "maintain" },
    out: { calories: 2662, protein: 135, carbs: 364, fat: 74, bmr: 1718, tdee: 2662, formula: "mifflin" },
  },
  {
    in: { heightCm: 165, weightKg: 62, age: 28, sex: "female", activity: "light", goal: "lose" },
    out: { calories: 1357, protein: 112, carbs: 143, fat: 38, bmr: 1350, tdee: 1857, formula: "mifflin" },
  },
  {
    in: { heightCm: 183, weightKg: 88, age: 41, sex: "male", activity: "very_active", goal: "gain" },
    out: { calories: 3765, protein: 158, carbs: 548, fat: 105, bmr: 1824, tdee: 3465, formula: "mifflin" },
  },
] as const;

for (const c of cases) {
  assert.deepEqual(dailyGoals(c.in), c.out, `dailyGoals ${JSON.stringify(c.in)}`);
}

// body-fat % switches the formula and moves BMR off the Mifflin value.
{
  const base = { heightCm: 178, weightKg: 75, age: 30, sex: "male", activity: "moderate", goal: "maintain" } as const;
  const mifflin = dailyGoals(base);
  const katch = dailyGoals({ ...base, bodyFatPct: 18 });
  assert.equal(mifflin.formula, "mifflin");
  assert.equal(katch.formula, "katch");
  assert.notEqual(katch.bmr, mifflin.bmr);
  assert.equal(katch.bmr, Math.round(bmrKatchMcArdle(75, 18)));
}

// BMI + macroBreakdown sanity
assert.equal(Math.round(bmi(178, 75) * 10) / 10, 23.7);
{
  const b = macroBreakdown(135, 364, 74);
  assert.equal(b.protein.kcal, 540);
  assert.equal(b.protein.pct + b.carbs.pct + b.fat.pct >= 99, true);
}

// splitMacros sums back to the calorie target (4/4/9 kcal per gram).
{
  const { proteinG, fatG, carbG } = splitMacros(2000, 75);
  assert.ok(Math.abs(proteinG * 4 + fatG * 9 + carbG * 4 - 2000) < 1e-6);
}

// Katch-McArdle: 80kg @ 20% BF -> 370 + 21.6*64 = 1752.4
assert.equal(Math.round(bmrKatchMcArdle(80, 20)), 1752);

// --- macro split (R4) ---
const sum = (s: Split) => s.protein + s.carbs + s.fat;
const noLock: Record<SplitKey, boolean> = { protein: false, carbs: false, fat: false };

// every preset is a valid 100% split
for (const p of DIET_PRESETS) assert.equal(sum(p.split), 100, `preset ${p.id}`);

// dragging one macro keeps the total at exactly 100 across the whole range
{
  let s: Split = { protein: 30, carbs: 40, fat: 30 };
  for (let v = 0; v <= 100; v += 7) {
    s = rebalanceSplit(s, noLock, "protein", v);
    assert.equal(sum(s), 100, `sum after protein=${v}`);
    assert.ok(s.protein >= 0 && s.carbs >= 0 && s.fat >= 0);
  }
}

// a locked macro never moves; the other unlocked one absorbs the change
{
  const locked: Record<SplitKey, boolean> = { protein: false, carbs: true, fat: false };
  const s = rebalanceSplit({ protein: 30, carbs: 40, fat: 30 }, locked, "protein", 50);
  assert.equal(s.carbs, 40, "locked carbs held");
  assert.equal(s.protein, 50);
  assert.equal(s.fat, 10);
  assert.equal(sum(s), 100);
}

// both others locked -> no change possible
{
  const locked: Record<SplitKey, boolean> = { protein: false, carbs: true, fat: true };
  const before: Split = { protein: 30, carbs: 40, fat: 30 };
  assert.deepEqual(rebalanceSplit(before, locked, "protein", 80), before);
}

// grams from split: 2000 kcal @ 30/40/30 -> P150 C200 F67
{
  const g = gramsFromSplit(2000, { protein: 30, carbs: 40, fat: 30 });
  assert.deepEqual(g, { protein: 150, carbs: 200, fat: 67 });
}

console.log("macros.test.ts: all assertions passed");
