import { useEffect, useState } from "preact/hooks";
import { API } from "../lib/api.ts";

interface Row {
  name: string;
  grams: string;
}

interface Item {
  name: string;
  grams: number;
  matched: string | null;
  source?: string;
  kcal?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
}

interface Result {
  items: Item[];
  totals: { kcal: number; protein: number; carbs: number; fat: number };
  unmatched: string[];
}

const KEY = "mc_recipe";
const BLANK: Row[] = [
  { name: "chicken breast", grams: "150" },
  { name: "white rice, cooked", grams: "100" },
  { name: "olive oil", grams: "14" },
];

function load(): Row[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const r = JSON.parse(raw);
      if (Array.isArray(r) && r.length) return r;
    }
  } catch {
    /* ignore */
  }
  return BLANK;
}

export default function RecipeCalc() {
  const [rows, setRows] = useState<Row[]>(BLANK);
  const [res, setRes] = useState<Result | null>(null);
  const [busy, setBusy] = useState(false);
  const [slow, setSlow] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => setRows(load()), []);
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(rows));
    } catch {
      /* ignore */
    }
  }, [rows]);

  const setRow = (i: number, p: Partial<Row>) =>
    setRows((rs) => rs.map((r, j) => (j === i ? { ...r, ...p } : r)));
  const addRow = () => setRows((rs) => [...rs, { name: "", grams: "" }]);
  const delRow = (i: number) => setRows((rs) => rs.filter((_, j) => j !== i));

  async function calc(e: Event) {
    e.preventDefault();
    const ingredients = rows
      .map((r) => ({ name: r.name.trim(), grams: parseFloat(r.grams) }))
      .filter((r) => r.name && Number.isFinite(r.grams) && r.grams > 0);
    if (!ingredients.length) {
      setErr("Add at least one ingredient with a gram amount.");
      return;
    }
    setBusy(true);
    setErr("");
    setRes(null);
    const slowTimer = setTimeout(() => setSlow(true), 4000);
    try {
      const r = await fetch(API + "/foods/lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients }),
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(data.detail || `Request failed (${r.status})`);
      setRes(data as Result);
    } catch (e) {
      const m = e instanceof Error ? e.message : String(e);
      setErr(
        m.includes("Failed to fetch")
          ? "Couldn't reach the server. The free tier sleeps when idle — wait ~50s and try again."
          : m,
      );
    } finally {
      clearTimeout(slowTimer);
      setBusy(false);
      setSlow(false);
    }
  }

  return (
    <div class="qc">
      <form class="qc__form recipe__form" onSubmit={calc}>
        {rows.map((r, i) => (
          <div class="recipe__row">
            <input
              type="text"
              placeholder="Ingredient (e.g. paneer, oats, banana)"
              value={r.name}
              onInput={(e) => setRow(i, { name: (e.target as HTMLInputElement).value })}
            />
            <input
              type="number"
              inputMode="decimal"
              min="0"
              placeholder="g"
              value={r.grams}
              onInput={(e) => setRow(i, { grams: (e.target as HTMLInputElement).value })}
            />
            <button
              type="button"
              class="recipe__del"
              aria-label={`Remove ${r.name || "ingredient"}`}
              onClick={() => delRow(i)}
              disabled={rows.length === 1}
            >
              ×
            </button>
          </div>
        ))}
        <div class="recipe__actions">
          <button type="button" class="btn btn--ghost" onClick={addRow}>+ Add ingredient</button>
          <button type="submit" class="btn" disabled={busy}>
            {busy ? (slow ? "Waking the server…" : "Calculating…") : "Calculate macros"}
          </button>
        </div>
        {err && <p class="form-error show">{err}</p>}
      </form>

      <div class="facts" aria-live="polite">
        <div class="facts__title">Recipe total</div>
        {res ? (
          <>
            <div class="facts__row facts__row--hero">
              <b>Calories</b>
              <span class="num">{res.totals.kcal} kcal</span>
            </div>
            {res.items.map((it) =>
              it.matched ? (
                <div class="facts__row">
                  <span>
                    {it.name} · {it.grams} g{" "}
                    <span class={`tag${it.source === "USDA" ? " tag--usda" : ""}`}>{it.source}</span>
                  </span>
                  <span class="num">{it.kcal} kcal</span>
                </div>
              ) : (
                <div class="facts__row">
                  <span>{it.name} · {it.grams} g <span class="tag">no match</span></span>
                  <span class="num">—</span>
                </div>
              ),
            )}
            <div class="facts__row facts__row--thick"><b>Protein</b><span class="num">{res.totals.protein} g</span></div>
            <div class="facts__row"><b>Carbs</b><span class="num">{res.totals.carbs} g</span></div>
            <div class="facts__row"><b>Fat</b><span class="num">{res.totals.fat} g</span></div>
            {res.unmatched.length > 0 && (
              <div class="facts__note">
                Not found: {res.unmatched.join(", ")}. Total excludes these — try a
                plainer name (e.g. "rice" not "basmati rice pulao").
              </div>
            )}
          </>
        ) : (
          <div class="facts__row"><span>Add ingredients and calculate</span><span class="num">—</span></div>
        )}
        <div class="facts__note">
          Numbers from USDA + INDB — the same databases MacroChat uses to log a
          meal. No AI guessing.
        </div>
      </div>
    </div>
  );
}
