// Build-time helpers for the /foods/ + /compare/ SEO pages.
import foodsData from "../data/seo-foods.json";

export interface Food {
  slug: string;
  name: string;
  source: "USDA" | "INDB";
  kcal: number;
  protein: number;
  carb: number;
  fat: number;
  fiber: number | null;
  sugar: number | null;
  sodium: number | null;
  satfat: number | null;
}

export const FOODS: Food[] = foodsData as Food[];
export const bySlug = (slug: string) => FOODS.find((f) => f.slug === slug);

// Recognisable foods people actually compare — drives the /compare/ page set.
export const POPULAR = [
  "chicken-breast", "chicken-thigh", "ground-beef", "salmon", "tuna", "shrimp",
  "cod", "turkey-breast", "pork-chop", "bacon", "ham", "sausage", "ground-turkey",
  "sardines", "tofu", "egg",
  "milk", "skim-milk", "greek-yogurt", "cheddar-cheese", "mozzarella",
  "cottage-cheese", "cream-cheese", "butter", "sour-cream",
  "white-rice", "brown-rice", "quinoa", "oats", "pasta", "whole-wheat-bread",
  "white-bread", "potato", "sweet-potato", "corn",
  "banana", "apple", "orange", "strawberries", "blueberries", "grapes", "mango",
  "pineapple", "watermelon", "avocado", "peach", "pear",
  "broccoli", "spinach", "kale", "carrot", "tomato", "cucumber", "onion",
  "bell-pepper", "mushrooms", "cauliflower", "green-peas", "zucchini", "lettuce",
  "black-beans", "chickpeas", "kidney-beans", "lentils", "edamame",
  "almonds", "peanut-butter", "walnuts", "cashews", "olive-oil",
  "honey", "sugar", "maple-syrup", "dark-chocolate",
  // Indian dishes — a corner of /compare/ almost nobody else covers
  "roti", "naan", "dal-makhani", "butter-chicken", "palak-paneer",
  "vegetable-biryani", "masala-dosa", "idli", "samosa", "poha",
  "chicken-curry", "paratha", "plain-pulao", "rajma", "khichdi",
].filter((s) => bySlug(s));

export function comparePairs(): [Food, Food][] {
  const out: [Food, Food][] = [];
  for (let i = 0; i < POPULAR.length; i++)
    for (let j = i + 1; j < POPULAR.length; j++)
      out.push([bySlug(POPULAR[i])!, bySlug(POPULAR[j])!]);
  return out;
}

/** URL slug for a pair, ordered the same way comparePairs() emits it (by POPULAR index). */
export function pairSlug(x: string, y: string): string | null {
  const i = POPULAR.indexOf(x), j = POPULAR.indexOf(y);
  if (i < 0 || j < 0 || i === j) return null;
  return i < j ? `${x}-vs-${y}` : `${y}-vs-${x}`;
}

/** Up to `n` other POPULAR foods to compare `slug` against (for the related grid). */
export function relatedFor(slug: string, n = 6): { name: string; href: string }[] {
  const self = POPULAR.indexOf(slug);
  if (self < 0) return [];
  const others = POPULAR.filter((_, i) => i !== self);
  // spread the picks across the list rather than all neighbours
  const step = Math.max(1, Math.floor(others.length / n));
  const out: { name: string; href: string }[] = [];
  for (let k = 0; k < others.length && out.length < n; k += step) {
    const s = pairSlug(slug, others[k]);
    const f = bySlug(others[k]);
    if (s && f) out.push({ name: f.name, href: `/compare/${s}/` });
  }
  return out;
}

// --- comparison maths ---

export const proteinDensity = (f: Food) => (f.kcal ? (f.protein / f.kcal) * 100 : 0);

export type NutKey = "kcal" | "protein" | "carb" | "fat" | "fiber" | "sugar" | "sodium" | "satfat";

export const NUTRIENTS: { key: NutKey; label: string; unit: string; lowerIsLeaner: boolean }[] = [
  { key: "kcal", label: "Calories", unit: "kcal", lowerIsLeaner: true },
  { key: "protein", label: "Protein", unit: "g", lowerIsLeaner: false },
  { key: "carb", label: "Carbs", unit: "g", lowerIsLeaner: true },
  { key: "fat", label: "Fat", unit: "g", lowerIsLeaner: true },
  { key: "fiber", label: "Fiber", unit: "g", lowerIsLeaner: false },
  { key: "sugar", label: "Sugars", unit: "g", lowerIsLeaner: true },
  { key: "satfat", label: "Saturated fat", unit: "g", lowerIsLeaner: true },
  { key: "sodium", label: "Sodium", unit: "mg", lowerIsLeaner: true },
];

/** Percentage difference of the larger value over the smaller, as a rounded int. */
export function pctMore(a: number, b: number): number {
  const lo = Math.min(a, b), hi = Math.max(a, b);
  if (lo <= 0) return 0;
  return Math.round(((hi - lo) / lo) * 100);
}

/** "3.1x" when the gap is big, else "42% more". */
export function gapPhrase(a: number, b: number): string {
  const lo = Math.min(a, b), hi = Math.max(a, b);
  if (lo <= 0) return hi > 0 ? "all of it" : "the same";
  const ratio = hi / lo;
  return ratio >= 2 ? `${ratio.toFixed(1)}x` : `${Math.round((ratio - 1) * 100)}% more`;
}

export function verdict(a: Food, b: Food): string {
  const lean = a.kcal <= b.kcal ? a : b;
  const other = lean === a ? b : a;
  const protein = proteinDensity(a) >= proteinDensity(b) ? a : b;
  const parts: string[] = [];
  if (Math.abs(a.kcal - b.kcal) > 5) {
    parts.push(
      `Per 100 g, ${lean.name} has ${gapPhrase(a.kcal, b.kcal)} fewer calories ` +
      `(${lean.kcal} vs ${other.kcal} kcal) — the easier fit in a calorie deficit.`
    );
  } else {
    parts.push(`Per 100 g the two are close on calories (${a.kcal} vs ${b.kcal} kcal).`);
  }
  if (Math.abs(proteinDensity(a) - proteinDensity(b)) > 1) {
    parts.push(
      `${protein.name} is more protein-dense — ${proteinDensity(protein).toFixed(1)} g ` +
      `protein per 100 kcal vs ${proteinDensity(protein === a ? b : a).toFixed(1)} g — so it's ` +
      `the better pick for muscle gain or staying full on a cut.`
    );
  } else {
    parts.push(`They carry protein at a similar rate per calorie.`);
  }
  return parts.join(" ");
}

export function nutritionJsonLd(f: Food) {
  const j: Record<string, string> = {
    "@context": "https://schema.org",
    "@type": "NutritionInformation",
    name: `${f.name} — per 100 g`,
    servingSize: "100 g",
    calories: `${f.kcal} kcal`,
    proteinContent: `${f.protein} g`,
    carbohydrateContent: `${f.carb} g`,
    fatContent: `${f.fat} g`,
  };
  if (f.fiber != null) j.fiberContent = `${f.fiber} g`;
  if (f.sugar != null) j.sugarContent = `${f.sugar} g`;
  if (f.sodium != null) j.sodiumContent = `${f.sodium} mg`;
  if (f.satfat != null) j.saturatedFatContent = `${f.satfat} g`;
  return JSON.stringify(j);
}

export function faqJsonLd(qa: { q: string; a: string }[]) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: qa.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  });
}
