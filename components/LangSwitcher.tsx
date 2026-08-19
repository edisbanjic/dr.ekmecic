"use client";

import { usePathname } from "next/navigation";
import { useLocale } from "@/components/LocaleProvider";
import { pageTitle, switchLocalePath, type Locale } from "@/lib/i18n";

const pillStyle = (active: boolean): React.CSSProperties => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "5px 11px",
  borderRadius: "999px",
  fontWeight: 800,
  fontSize: "12.5px",
  letterSpacing: ".06em",
  textDecoration: "none",
  background: active ? "#F5F0E8" : "transparent",
  color: active ? "#243038" : "inherit",
  opacity: active ? 1 : 0.7,
  cursor: active ? "default" : "pointer",
});

/**
 * BS/EN toggle (in the footer). Switching swaps the dictionary in place via
 * LocaleProvider and only replaces the URL with history.replaceState — no
 * navigation, so the page keeps its DOM, scroll position and animations.
 * The hrefs still point to the real alternate URLs for crawlers/new tabs.
 */
export default function LangSwitcher() {
  const pathname = usePathname() ?? "/";
  const { locale, setLocale } = useLocale();

  const switchTo = (e: React.MouseEvent<HTMLAnchorElement>, to: Locale) => {
    e.preventDefault();
    if (to === locale) return;
    const target = switchLocalePath(window.location.pathname, to);
    setLocale(to);
    window.history.replaceState(null, "", target + window.location.search + window.location.hash);
    const title = pageTitle(target, to);
    if (title) document.title = title;
  };

  return (
    <span
      id="lang-switch"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "2px",
        border: "2px solid rgba(245,240,232,.3)",
        borderRadius: "999px",
        padding: "2px",
      }}
    >
      <a
        href={switchLocalePath(pathname, "bs")}
        hrefLang="bs"
        onClick={(e) => switchTo(e, "bs")}
        aria-current={locale === "bs" ? "true" : undefined}
        style={pillStyle(locale === "bs")}
      >
        BS
      </a>
      <a
        href={switchLocalePath(pathname, "en")}
        hrefLang="en"
        onClick={(e) => switchTo(e, "en")}
        aria-current={locale === "en" ? "true" : undefined}
        style={pillStyle(locale === "en")}
      >
        EN
      </a>
    </span>
  );
}
