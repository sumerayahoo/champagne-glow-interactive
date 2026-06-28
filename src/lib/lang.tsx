import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

type Lang = "en" | "ar";

type Ctx = {
  lang: Lang;
  isAr: boolean;
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: (en: string, ar: string) => string;
};

const LangContext = createContext<Ctx | null>(null);

const KEY = "zab-lang";

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(KEY) as Lang | null;
      if (saved === "ar" || saved === "en") setLangState(saved);
    } catch {}
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try { window.localStorage.setItem(KEY, l); } catch {}
  }, []);

  const toggle = useCallback(() => setLang(lang === "ar" ? "en" : "ar"), [lang, setLang]);
  const t = useCallback((en: string, ar: string) => (lang === "ar" ? ar : en), [lang]);

  return (
    <LangContext.Provider value={{ lang, isAr: lang === "ar", setLang, toggle, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside LangProvider");
  return ctx;
}

export function LangToggle({ className = "" }: { className?: string }) {
  const { isAr, toggle } = useLang();
  return (
    <button
      type="button"
      onClick={toggle}
      className={
        "rounded-full border border-primary/40 bg-card/40 px-4 py-2 text-sm backdrop-blur-md hover:bg-primary hover:text-primary-foreground transition-all " +
        className
      }
      aria-label="Toggle language"
    >
      {isAr ? "English" : "العربية"}
    </button>
  );
}
