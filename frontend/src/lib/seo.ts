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
}

export const FOODS: Food[] = foodsData as Food[];
export const bySlug = (slug: string) => FOODS.find((f) => f.slug === slug);

// Pairs for /compare/ — a curated popular subset keeps the page count sane.
export const POPULAR = [
  "chicken-breast", "white-rice", "brown-rice", "egg", "banana", "apple",
  "oats", "salmon", "greek-yogurt", "almonds", "sweet-potato", "broccoli",
  "peanut-butter", "avocado", "quinoa", "tofu",
].filter((s) => bySlug(s));

export function comparePairs(): [Food, Food][] {
  const out: [Food, Food][] = [];
  for (let i = 0; i < POPULAR.length; i++)
    for (let j = i + 1; j < POPULAR.length; j++)
      out.push([bySlug(POPULAR[i])!, bySlug(POPULAR[j])!]);
  return out;
}

/** protein grams per 100 kcal — the "how much protein am I getting for the calories" number. */
export const proteinDensity = (f: Food) => (f.kcal ? (f.protein / f.kcal) * 100 : 0);

export function verdict(a: Food, b: Food): string {
  const lean = a.kcal <= b.kcal ? a : b;
  const other = lean === a ? b : a;
  const pdA = proteinDensity(a), pdB = proteinDensity(b);
  const protein = pdA >= pdB ? a : b;
  const parts: string[] = [];
  if (Math.abs(a.kcal - b.kcal) > 5) {
    parts.push(
      `Per 100 g, ${lean.name} has fewer calories (${lean.kcal} vs ${other.kcal} kcal) — ` +
      `the easier fit in a calorie deficit.`
    );
  } else {
    parts.push(`Per 100 g the two are close on calories (${a.kcal} vs ${b.kcal} kcal).`);
  }
  parts.push(
    `${protein.name} is more protein-dense (${proteinDensity(protein).toFixed(1)} g protein ` +
    `per 100 kcal), so it's the better pick when you're prioritising protein — ` +
    `muscle gain or staying full on a cut.`
  );
  return parts.join(" ");
}

export function nutritionJsonLd(f: Food) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "NutritionInformation",
    name: `${f.name} — per 100 g`,
    servingSize: "100 g",
    calories: `${f.kcal} kcal`,
    proteinContent: `${f.protein} g`,
    carbohydrateContent: `${f.carb} g`,
    fatContent: `${f.fat} g`,
  });
}
