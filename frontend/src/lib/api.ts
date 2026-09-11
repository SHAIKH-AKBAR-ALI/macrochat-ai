// `location` is undefined during SSR/prerender (islands evaluate this module then).
export const API =
  import.meta.env.PUBLIC_API_URL ||
  `http://${typeof location !== "undefined" ? location.hostname : "localhost"}:8000`;

// Drop an expired JWT before it's ever sent — otherwise a stale token from a prior
// login tags along into guest-mode requests and trips a misleading "session expired"
// notice mid guest analysis. exp is read from the JWT locally (no network); the
// backend still validates as the real safety net.
export const token = () => {
  const t = localStorage.getItem("mc_token");
  if (!t) return null;
  try {
    const { exp } = JSON.parse(atob(t.split(".")[1]));
    if (exp && exp * 1000 < Date.now()) {
      localStorage.removeItem("mc_token");
      return null;
    }
  } catch {
    /* unreadable token — let the server decide */
  }
  return t;
};

export function authHeaders(): Record<string, string> {
  const t = token();
  return t ? { Authorization: `Bearer ${t}` } : {};
}

// FastAPI sends a plain string `detail` for our own HTTPExceptions, but a LIST of
// {loc, msg} objects for a 422 body-validation failure. Throwing that list gave the
// user "[object Object]" and hid which field was actually wrong — name the field.
function errorMessage(data: any, status: number): string {
  const d = data?.detail;
  if (typeof d === "string") return d;
  if (Array.isArray(d) && d.length) {
    return d
      .map((e) => {
        const field = Array.isArray(e?.loc) ? e.loc[e.loc.length - 1] : null;
        return field ? `${field}: ${e.msg}` : e?.msg;
      })
      .filter(Boolean)
      .join(" · ");
  }
  return `Request failed (${status})`;
}

export async function jsonPost(path: string, body: unknown) {
  const res = await fetch(API + path, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(errorMessage(data, res.status));
  return data;
}
