"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

import {
  type Lang,
  type StringKey,
  type Translate,
  type Vars,
  STORAGE_KEY,
  isLang,
  translate,
} from "@/lib/i18n";

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  t: Translate;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

/**
 * Holds the chosen language and hands every consumer a bound `t`.
 *
 * The first render always uses `en` so the server and client markup agree; the
 * stored choice is applied in an effect straight after mount.
 */
export default function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (isLang(stored)) setLangState(stored);
    } catch {
      /* storage blocked — English it is */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* choice just will not persist */
    }
  }, []);

  const toggleLang = useCallback(
    () => setLang(lang === "en" ? "sw" : "en"),
    [lang, setLang]
  );

  const t = useCallback(
    (key: StringKey, vars?: Vars) => translate(lang, key, vars),
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useI18n(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useI18n must be used inside <LanguageProvider>");
  return ctx;
}
