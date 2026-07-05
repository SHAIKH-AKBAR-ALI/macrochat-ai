export const API =
  import.meta.env.PUBLIC_API_URL || `http://${location.hostname}:8000`;

export const token = () => localStorage.getItem("mc_token");

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
