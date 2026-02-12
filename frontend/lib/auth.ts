
export type DemoUser = { name: string; email: string };

const KEY = "demoUser";

export function getDemoUser(): DemoUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as DemoUser) : null;
  } catch {
    return null;
  }
}

export function setDemoUser(user: DemoUser) {
  window.localStorage.setItem(KEY, JSON.stringify(user));
}

export function clearDemoUser() {
  window.localStorage.removeItem(KEY);
}
