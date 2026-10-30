import { useEffect, useState, useCallback } from "react";

export type BookmarkKind = "job" | "course" | "internship" | "career";
const KEY = "acg:bookmarks:v1";

type Store = Record<BookmarkKind, string[]>;
const empty: Store = { job: [], course: [], internship: [], career: [] };

function read(): Store {
  if (typeof window === "undefined") return empty;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? { ...empty, ...JSON.parse(raw) } : empty;
  } catch {
    return empty;
  }
}
function write(s: Store) {
  localStorage.setItem(KEY, JSON.stringify(s));
  window.dispatchEvent(new Event("acg:bookmarks"));
}

export function useBookmarks(kind: BookmarkKind) {
  const [ids, setIds] = useState<string[]>([]);
  useEffect(() => {
    const sync = () => setIds(read()[kind]);
    sync();
    window.addEventListener("acg:bookmarks", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("acg:bookmarks", sync);
      window.removeEventListener("storage", sync);
    };
  }, [kind]);

  const toggle = useCallback((id: string) => {
    const s = read();
    const set = new Set(s[kind]);
    if (set.has(id)) set.delete(id);
    else set.add(id);
    s[kind] = [...set];
    write(s);
  }, [kind]);

  const has = useCallback((id: string) => ids.includes(id), [ids]);
  return { ids, has, toggle };
}

export function useAllBookmarks() {
  const [store, setStore] = useState<Store>(empty);
  useEffect(() => {
    const sync = () => setStore(read());
    sync();
    window.addEventListener("acg:bookmarks", sync);
    return () => window.removeEventListener("acg:bookmarks", sync);
  }, []);
  return store;
}
