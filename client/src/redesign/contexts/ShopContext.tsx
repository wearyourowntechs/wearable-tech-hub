import React, { createContext, useContext, useEffect, useState } from "react";

interface ShopState {
  saved: string[];
  compared: string[];
  ready: boolean;
  toggleSaved: (id: string) => void;
  toggleCompared: (id: string) => void;
  setCompared: (ids: string[]) => void;
  clearCompared: () => void;
  notice: string;
}
const ShopContext = createContext<ShopState | null>(null);
export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [saved, setSaved] = useState<string[]>([]);
  const [compared, updateCompared] = useState<string[]>([]);
  const [notice, setNotice] = useState("");
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      const read = (key: string): string[] => {
        const value = JSON.parse(localStorage.getItem(key) || "[]");
        return Array.isArray(value) ? Array.from(new Set(value.filter((id) => typeof id === "string"))) : [];
      };
      setSaved(read("wyot-saved"));
      updateCompared(read("wyot-compare").slice(0, 3));
    } catch { /* Browsing still works when storage is disabled. */ }
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem("wyot-saved", JSON.stringify(saved));
      localStorage.setItem("wyot-compare", JSON.stringify(compared));
    } catch { /* Browser privacy settings may block storage. */ }
  }, [saved, compared, ready]);
  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(""), 3000);
    return () => clearTimeout(timer);
  }, [notice]);
  const toggleSaved = (id: string) => {
    setSaved((ids) => ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id]);
    setNotice(saved.includes(id) ? "Removed from your saved picks." : "Added to your saved picks.");
  };
  const setCompared = (ids: string[]) => updateCompared(Array.from(new Set(ids.filter(Boolean))).slice(0, 3));
  const toggleCompared = (id: string) => {
    if (!compared.includes(id) && compared.length >= 3) {
      setNotice("Compare up to 3 products. Remove one to add another.");
      return;
    }
    updateCompared((ids) => ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id]);
  };
  return <ShopContext.Provider value={{ saved, compared, ready, toggleSaved, toggleCompared, setCompared, clearCompared: () => updateCompared([]), notice }}>{children}</ShopContext.Provider>;
}
export function useShop() {
  const value = useContext(ShopContext);
  if (!value) throw new Error("ShopProvider is required");
  return value;
}
