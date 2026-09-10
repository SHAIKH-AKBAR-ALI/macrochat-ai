import { useEffect, useState } from "preact/hooks";
import {
  rebalanceSplit,
  gramsFromSplit,
  DIET_PRESETS,
  type Split,
  type SplitKey,
} from "../lib/macros.ts";

const KEY = "mc_split";
const KEYS: SplitKey[] = ["protein", "carbs", "fat"];
const LABEL: Record<SplitKey, string> = { protein: "Protein", carbs: "Carbs", fat: "Fat" };
const KCAL_PER_G: Record<SplitKey, number> = { protein: 4, carbs: 4, fat: 9 };

interface Stored {
  split: Split;
  locked: Record<SplitKey, boolean>;
  preset: string; // "" = custom
}

const DEFAULT: Stored = {
  split: DIET_PRESETS[0].split,
  locked: { protein: false, carbs: false, fat: false },
  preset: DIET_PRESETS[0].id,
};

function load(): Stored {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...DEFAULT, ...JSON.parse(raw) };
  } catch {
    /* unavailable / corrupt */
  }
  return DEFAULT;
}

export default function MacroSplit({ kcal }: { kcal: number }) {
  const [st, setSt] = useState<Stored>(DEFAULT);

  useEffect(() => setSt(load()), []);
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(st));
    } catch {
      /* ignore */
    }
  }, [st]);

  const drag = (key: SplitKey, raw: number) =>
    setSt((p) => ({
      ...p,
      split: rebalanceSplit(p.split, p.locked, key, raw),
      preset: "",
    }));

  const toggleLock = (key: SplitKey) =>
    setSt((p) => ({ ...p, locked: { ...p.locked, [key]: !p.locked[key] } }));

  const pickPreset = (id: string) => {
    const preset = DIET_PRESETS.find((d) => d.id === id);
    if (!preset) return;
    setSt({ split: preset.split, locked: { protein: false, carbs: false, fat: false }, preset: id });
  };

  const grams = gramsFromSplit(kcal, st.split);

  return (
    <div class="split">
      <fieldset class="split__presets">
        <legend>Diet style</legend>
        {DIET_PRESETS.map((d) => (
          <label class={`split__card${st.preset === d.id ? " is-on" : ""}`}>
            <input
              type="radio"
              name="diet-preset"
              value={d.id}
              checked={st.preset === d.id}
              onChange={() => pickPreset(d.id)}
            />
            <b>{d.name}</b>
            <span>{d.label}</span>
          </label>
        ))}
      </fieldset>

      <div class="split__sliders">
        {KEYS.map((k) => (
          <div class="split__row">
            <div class="split__head">
              <button
                type="button"
                class={`split__lock${st.locked[k] ? " is-locked" : ""}`}
                aria-pressed={st.locked[k]}
                aria-label={`${st.locked[k] ? "Unlock" : "Lock"} ${LABEL[k]}`}
                onClick={() => toggleLock(k)}
              >
                {st.locked[k] ? "🔒" : "🔓"}
              </button>
              <label for={`sl-${k}`}>{LABEL[k]}</label>
              <span class="split__pct">{st.split[k]}%</span>
            </div>
            <input
              id={`sl-${k}`}
              type="range"
              min="0"
              max="100"
              step="1"
              value={st.split[k]}
              disabled={st.locked[k]}
              onInput={(e) => drag(k, Number((e.target as HTMLInputElement).value))}
            />
          </div>
        ))}
      </div>

      <div class="facts" aria-live="polite">
        <div class="facts__title">Daily target summary</div>
        <div class="facts__row facts__row--hero">
          <b>Calories</b>
          <span class="num">{kcal ? `${kcal} kcal` : "—"}</span>
        </div>
        {KEYS.map((k) => (
          <div class={`facts__row${k === "fat" ? "" : ""}`}>
            <span>{LABEL[k]}</span>
            <span class="num">
              {grams[k]} g · {st.split[k]}% · {Math.round((kcal * st.split[k]) / 100)} kcal
            </span>
          </div>
        ))}
        <div class="facts__note">
          Lock a macro to pin it while you drag the others — the split always
          totals 100%. Grams use {KCAL_PER_G.protein}/{KCAL_PER_G.carbs}/
          {KCAL_PER_G.fat} kcal per gram.
        </div>
      </div>
    </div>
  );
}
