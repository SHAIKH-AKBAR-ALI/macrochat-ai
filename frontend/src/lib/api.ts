export const API =
  import.meta.env.PUBLIC_API_URL || `http://${location.hostname}:8000`;

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

export async function jsonPost(path: string, body: unknown) {
  const res = await fetch(API + path, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.detail || `Request failed (${res.status})`);
  return data;
}
