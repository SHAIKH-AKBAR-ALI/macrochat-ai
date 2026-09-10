// Shared meal-row renderer with inline edit (grams) + delete. Used by the
// dashboard today-list and the /history page. No LLM, no re-lookup — PATCH scales
// stored per-item macros on the backend.
import { API, authHeaders } from "./api";

type Item = { name: string; portion_grams?: number };
type Meal = {
  id: string;
  created_at: string;
  items: Item[] | null;
  total_calories: number;
};

const el = (t: string, c = "", txt = "") => {
  const n = document.createElement(t);
  if (c) n.className = c;
  if (txt) n.textContent = txt;
  return n;
};

async function send(method: string, path: string, body?: unknown) {
  const res = await fetch(API + path, {
    method,
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const d = await res.json().catch(() => ({}));
    throw new Error(d.detail || `${method} ${path} failed (${res.status})`);
  }
  return res.json();
}

export function mealRowEl(m: Meal, onChange: () => void): HTMLElement {
  const items = m.items || [];
  const names = items.map((i) => i.name).filter(Boolean).join(", ") || "meal";
  const time = new Date(m.created_at).toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });

  const row = el("div", "meal-row");
  const main = el("div", "meal-row__main");
  const n = el("span", "meal-row__name");
  n.textContent = names;
  const meta = el("span", "meal-row__meta");
  meta.textContent = `${Math.round(m.total_calories)} kcal · ${time}`;

  const editBtn = el("button", "meal-row__act", "Edit") as HTMLButtonElement;
  const delBtn = el("button", "meal-row__act meal-row__act--del", "Delete") as HTMLButtonElement;
  editBtn.type = delBtn.type = "button";

  main.append(n, meta, editBtn, delBtn);
  row.append(main);

  const editor = el("div", "meal-row__editor");
  editor.hidden = true;
  row.append(editor);

  editBtn.addEventListener("click", () => {
    if (!editor.hidden) {
      editor.hidden = true;
      editBtn.textContent = "Edit";
      return;
    }
    editor.hidden = false;
    editBtn.textContent = "Close";
    editor.innerHTML = "";
    const inputs: HTMLInputElement[] = [];
    items.forEach((it, i) => {
      const line = el("label", "meal-row__editline");
      line.append(el("span", "", it.name));
      const g = el("input") as HTMLInputElement;
      g.type = "number";
      g.min = "1";
      g.step = "1";
      g.value = String(Math.round(it.portion_grams || 0));
      inputs[i] = g;
      line.append(g, el("span", "", "g"));
      editor.append(line);
    });
    const save = el("button", "btn", "Save") as HTMLButtonElement;
    save.type = "button";
    const err = el("p", "form-error");
    save.addEventListener("click", async () => {
      const grams: Record<string, number> = {};
      inputs.forEach((g, i) => {
        const v = Number(g.value);
        if (v > 0 && v !== Math.round(items[i].portion_grams || 0)) grams[i] = v;
      });
      if (!Object.keys(grams).length) { editor.hidden = true; editBtn.textContent = "Edit"; return; }
      save.disabled = true;
      try {
        await send("PATCH", `/meals/${m.id}`, { grams });
        onChange();
      } catch (e) {
        err.textContent = e instanceof Error ? e.message : String(e);
        err.classList.add("show");
        save.disabled = false;
      }
    });
    editor.append(save, err);
  });

  delBtn.addEventListener("click", async () => {
    if (delBtn.dataset.armed !== "1") {
      delBtn.dataset.armed = "1";
      delBtn.textContent = "Confirm?";
      setTimeout(() => {
        delBtn.dataset.armed = "";
        delBtn.textContent = "Delete";
      }, 3000);
      return;
    }
    delBtn.disabled = true;
    try {
      await send("DELETE", `/meals/${m.id}`);
      onChange();
    } catch {
      delBtn.disabled = false;
      delBtn.dataset.armed = "";
      delBtn.textContent = "Delete";
    }
  });

  return row;
}
