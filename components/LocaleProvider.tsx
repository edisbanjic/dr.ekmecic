"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

/**
 * Client-side locale state, seeded by the server with the URL's locale.
 * Switching updates text in place (React only touches text nodes, so the
 * DOM — and every running animation — survives) plus <html lang>.
 */
export function LocaleProvider({ initial, children }: { initial: Locale; children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(initial);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

/** Current locale; falls back to the default outside a provider (e.g. admin). */
export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  return ctx ?? { locale: DEFAULT_LOCALE, setLocale: () => {} };
}
