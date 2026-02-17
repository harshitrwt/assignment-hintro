export const storage = {
  get<T>(key: string, fallback: T): T {
    if (typeof window === "undefined") return fallback;
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : fallback;
    } catch {
      return fallback;
    }
  },

  set(key: string, value: unknown) {
    if (typeof window === "undefined") return;
    localStorage.setItem(key, JSON.stringify(value));
  },

  remove(key: string) {
    if (typeof window === "undefined") return;
    localStorage.removeItem(key);
  },

  getSession<T>(key: string, fallback: T): T {
    if (typeof window === "undefined") return fallback;
    try {
      const value = sessionStorage.getItem(key);
      return value ? JSON.parse(value) : fallback;
    } catch {
      return fallback;
    }
  },

  setSession(key: string, value: unknown) {
    if (typeof window === "undefined") return;
    sessionStorage.setItem(key, JSON.stringify(value));
  },

  removeSession(key: string) {
    if (typeof window === "undefined") return;
    sessionStorage.removeItem(key);
  },
};
