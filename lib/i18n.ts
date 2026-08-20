import { parseDate } from "./appointments";
import bs from "@/locales/bs.json";
import en from "@/locales/en.json";

export type Locale = "bs" | "en";
export const LOCALES: Locale[] = ["bs", "en"];
export const DEFAULT_LOCALE: Locale = "bs";

/** All UI copy lives in locales/*.json; both files share this shape. */
export type Dict = typeof bs;

const DICTS: Record<Locale, Dict> = { bs, en: en as Dict };

export function getDict(locale: Locale): Dict {
  return DICTS[locale];
}

/** Home page URL for a locale — Bosnian is the default at the root. */
export function homePath(locale: Locale): string {
  return locale === "bs" ? "/" : "/en";
}

/** Tips index URL — Bosnian keeps its localized /savjeti URL (rewritten to /tips). */
export function tipsPath(locale: Locale): string {
  return locale === "bs" ? "/savjeti" : "/en/tips";
}

export function postPath(locale: Locale, slug: string): string {
  return `${tipsPath(locale)}/${slug}`;
}

/** Contact URL — Bosnian keeps its localized /kontakt URL (rewritten to /contact). */
export function contactPath(locale: Locale): string {
  return locale === "bs" ? "/kontakt" : "/en/contact";
}

/** Link to a home-page section: plain anchor on the home page itself. */
export function homeAnchor(locale: Locale, id: string, onHome: boolean): string {
  return onHome ? `#${id}` : `${homePath(locale)}#${id}`;
}

/** "2026-08-20" → "20. august 2026." (bs) or "20 August 2026" (en). */
export function formatPrettyDate(date: string, locale: Locale = "bs"): string {
  const d = parseDate(date);
  const month = getDict(locale).months[d.getMonth()];
  return locale === "bs"
    ? `${d.getDate()}. ${month.toLowerCase()} ${d.getFullYear()}.`
    : `${d.getDate()} ${month} ${d.getFullYear()}`;
}

/** Document title for a public path — applied when the language is switched in place. */
export function pageTitle(pathname: string, locale: Locale): string | null {
  const t = getDict(locale).meta;
  if (pathname === "/" || pathname === "/en") return t.home.title;
  if (pathname === "/savjeti" || pathname === "/tips" || pathname === "/en/tips") return t.tips.title;
  if (pathname === "/kontakt" || pathname === "/contact" || pathname === "/en/contact") return t.contact.title;
  return null;
}

/** Equivalent URL of the current page in the other locale (for the language switcher). */
export function switchLocalePath(pathname: string, to: Locale): string {
  if (to === "en") {
    if (pathname === "/" || pathname === "") return "/en";
    if (pathname === "/savjeti" || pathname === "/tips") return "/en/tips";
    if (pathname.startsWith("/savjeti/")) return `/en/tips/${pathname.slice("/savjeti/".length)}`;
    if (pathname.startsWith("/tips/")) return `/en/tips/${pathname.slice("/tips/".length)}`;
    if (pathname === "/kontakt" || pathname === "/contact") return "/en/contact";
    return "/en";
  }
  if (pathname === "/en" || pathname === "/en/") return "/";
  if (pathname === "/en/tips") return "/savjeti";
  if (pathname.startsWith("/en/tips/")) return `/savjeti/${pathname.slice("/en/tips/".length)}`;
  if (pathname === "/en/contact") return "/kontakt";
  return "/";
}
