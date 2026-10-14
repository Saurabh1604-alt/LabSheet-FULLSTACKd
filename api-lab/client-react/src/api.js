// All config comes from environment variables (see .env)
export const API_URL = import.meta.env.VITE_API_URL;
export const API_KEY = import.meta.env.VITE_API_KEY;

// Wraps fetch: turns network failures and 401/404/etc. into readable Error messages
export async function request(path, options = {}) {
  let res;
  try {
    res = await fetch(`${API_URL}${path}`, options);
  } catch {
    throw new Error("Cannot reach the server. Is it running?");
  }
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const message = res.status === 401
      ? "Unauthorized: missing or wrong API key"
      : data?.error?.message || "Request failed";
    throw new Error(`${message} (${res.status})`);
  }
  return data;
}
