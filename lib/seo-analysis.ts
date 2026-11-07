// SEO checks for the post editor (admin → Objave). Pure functions, client-safe.
import { slugify } from "./slug";

export type SeoCheckStatus = "good" | "ok" | "bad";
export type SeoCheck = { id: string; status: SeoCheckStatus; message: string };

export type SeoAnalysisInput = {
  /** What goes into <title> (SEO title, or the post title + site name). */
  title: string;
  /** Meta description (SEO description, or the summary). */
  description: string;
  slug: string;
  contentHtml: string;
  focusKeyword: string;
  coverImage: string | null;
  coverImageAlt: string;
  ogImage: string | null;
};

export type SeoAnalysis = { score: number; checks: SeoCheck[]; wordCount: number };

export const SEO_LIMITS = {
  title: { min: 30, max: 60 },
  description: { min: 120, max: 160 },
} as const;

const SITE_HOST = /dr-kamalaekmecic\.com/i;

const ENTITIES: Record<string, string> = {
  "&nbsp;": " ", "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'",
};

export function htmlToPlainText(html: string | null | undefined): string {
  if (!html) return "";
  return html
    .replace(/<(br|\/p|\/h[1-6]|\/li|\/blockquote)[^>]*>/gi, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/&[a-z#0-9]+;/gi, (m) => ENTITIES[m] ?? " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function countWords(text: string): number {
  return text ? text.split(/\s+/).filter(Boolean).length : 0;
}

/** Plain-text excerpt for meta descriptions, cut on a word boundary. */
export function excerpt(html: string, max = 160): string {
  const text = htmlToPlainText(html);
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).replace(/\s+\S*$/, "")}…`;
}

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/đ/g, "dj")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function tokens(text: string): string[] {
  return normalize(text).split(/[^a-z0-9]+/).filter(Boolean);
}

/**
 * Bosnian inflects word endings ("zubar" / "zubara" / "zubaru"), so words are
 * compared by stem: the shared prefix minus the last 2 letters. Words of ≤ 3
 * letters ("u", "za") must match exactly.
 */
function sameStem(a: string, b: string): boolean {
  if (a.length <= 3 || b.length <= 3) return a === b;
  const n = Math.max(3, Math.min(a.length, b.length) - 2);
  return a.slice(0, n) === b.slice(0, n);
}

/** Token positions where the phrase occurs in the text. */
function phraseMatches(text: string, phrase: string): number[] {
  const hay = tokens(text);
  const needle = tokens(phrase);
  if (!needle.length) return [];
  const hits: number[] = [];
  for (let i = 0; i + needle.length <= hay.length; i++) {
    if (needle.every((w, j) => sameStem(w, hay[i + j]))) hits.push(i);
  }
  return hits;
}

const contains = (text: string, phrase: string) => phraseMatches(text, phrase).length > 0;

function lengthCheck(id: string, label: string, value: string, limits: { min: number; max: number }): SeoCheck {
  const len = value.trim().length;
  if (!len) return { id, status: "bad", message: `${label} nije postavljen.` };
  if (len >= limits.min && len <= limits.max) {
    return { id, status: "good", message: `${label} ima ${len} znakova — idealno.` };
  }
  if (len < limits.min) {
    return { id, status: "ok", message: `${label} je kratak (${len}). Preporuka: ${limits.min}–${limits.max} znakova.` };
  }
  return {
    id,
    status: len > limits.max + 15 ? "bad" : "ok",
    message: `${label} je predug (${len}) i Google će ga skratiti. Preporuka: do ${limits.max} znakova.`,
  };
}

const WEIGHT: Record<SeoCheckStatus, number> = { good: 1, ok: 0.5, bad: 0 };

export function analyzeSeo(input: SeoAnalysisInput): SeoAnalysis {
  const checks: SeoCheck[] = [];
  const plain = htmlToPlainText(input.contentHtml);
  const wordCount = countWords(plain);
  const kw = normalize(input.focusKeyword);

  checks.push(lengthCheck("title-length", "SEO naslov", input.title, SEO_LIMITS.title));
  checks.push(lengthCheck("description-length", "Meta opis", input.description, SEO_LIMITS.description));

  // --- focus keyword ---
  if (!kw) {
    checks.push({
      id: "keyword",
      status: "bad",
      message: "Upišite ključnu riječ — ono što bi pacijent ukucao u Google (npr. „strah od zubara“).",
    });
  } else {
    const titleHits = phraseMatches(input.title, kw);
    checks.push(
      titleHits[0] === 0
        ? { id: "kw-title", status: "good", message: "Ključna riječ je na početku naslova." }
        : titleHits.length
          ? { id: "kw-title", status: "good", message: "Ključna riječ je u naslovu. (Još bolje: na početku.)" }
          : { id: "kw-title", status: "bad", message: "Ključna riječ nije u SEO naslovu." },
    );
    checks.push(
      contains(input.description, kw)
        ? { id: "kw-description", status: "good", message: "Ključna riječ je u meta opisu." }
        : { id: "kw-description", status: "bad", message: "Dodajte ključnu riječ u meta opis." },
    );
    const kwSlug = slugify(input.focusKeyword);
    checks.push(
      kwSlug && input.slug.includes(kwSlug)
        ? { id: "kw-slug", status: "good", message: "Ključna riječ je u URL-u." }
        : { id: "kw-slug", status: "ok", message: "Ključna riječ nije u URL-u (slug)." },
    );
    const firstParagraph = input.contentHtml.match(/<p[^>]*>([\s\S]*?)<\/p>/i)?.[1] ?? "";
    checks.push(
      contains(htmlToPlainText(firstParagraph), kw)
        ? { id: "kw-intro", status: "good", message: "Ključna riječ je u prvom paragrafu." }
        : { id: "kw-intro", status: "ok", message: "Spomenite ključnu riječ u prvom paragrafu." },
    );
    const subheadings = Array.from(input.contentHtml.matchAll(/<h[23][^>]*>([\s\S]*?)<\/h[23]>/gi)).map((m) =>
      htmlToPlainText(m[1]),
    );
    checks.push(
      subheadings.some((h) => contains(h, kw))
        ? { id: "kw-subheading", status: "good", message: "Ključna riječ je u barem jednom podnaslovu." }
        : { id: "kw-subheading", status: "ok", message: "Iskoristite ključnu riječ u nekom podnaslovu (H2/H3)." },
    );

    const count = phraseMatches(plain, kw).length;
    const density = wordCount ? ((count * Math.max(1, countWords(kw))) / wordCount) * 100 : 0;
    const label = `${density.toFixed(1)}% (${count}×)`;
    if (count === 0) {
      checks.push({ id: "kw-density", status: "bad", message: "Ključna riječ se ne pojavljuje u tekstu." });
    } else if (density > 3) {
      checks.push({ id: "kw-density", status: "bad", message: `Ključna riječ: ${label} — previše, Google to vidi kao spam.` });
    } else if (density < 0.5) {
      checks.push({ id: "kw-density", status: "ok", message: `Ključna riječ: ${label}. Preporuka: 0.5–2.5%.` });
    } else {
      checks.push({ id: "kw-density", status: "good", message: `Ključna riječ: ${label}.` });
    }
  }

  // --- content ---
  if (wordCount >= 600) {
    checks.push({ id: "length", status: "good", message: `Tekst ima ${wordCount} riječi.` });
  } else if (wordCount >= 300) {
    checks.push({ id: "length", status: "ok", message: `Tekst ima ${wordCount} riječi. Članci od 600+ riječi bolje rangiraju.` });
  } else {
    checks.push({
      id: "length",
      status: "bad",
      message: `Tekst ima ${wordCount} riječi. Za savjete ciljajte 300+ (kratke novosti su u redu i ovako).`,
    });
  }

  const h2Count = (input.contentHtml.match(/<h2[\s>]/gi) ?? []).length;
  checks.push(
    h2Count > 0
      ? { id: "headings", status: "good", message: `Tekst je podijeljen podnaslovima (${h2Count}× H2).` }
      : {
          id: "headings",
          status: wordCount > 300 ? "bad" : "ok",
          message: "Podijelite tekst podnaslovima (H2) — lakše se čita i Google bolje razumije temu.",
        },
  );

  const sentences = plain.split(/[.!?]+\s/).filter((s) => s.trim());
  const avg = sentences.length ? wordCount / sentences.length : 0;
  if (wordCount > 0) {
    checks.push(
      avg <= 20
        ? { id: "readability", status: "good", message: "Rečenice su kratke i čitljive." }
        : { id: "readability", status: avg <= 25 ? "ok" : "bad", message: `Prosječna rečenica ima ${Math.round(avg)} riječi. Ciljajte ispod 20.` },
    );
  }

  // --- links ---
  const hrefs = Array.from(input.contentHtml.matchAll(/<a[^>]+href="([^"]+)"/gi)).map((m) => m[1] ?? "");
  const internal = hrefs.filter((h) => h.startsWith("/") || SITE_HOST.test(h));
  checks.push(
    internal.length
      ? { id: "links-internal", status: "good", message: `Linkovi na sajt ordinacije: ${internal.length}.` }
      : { id: "links-internal", status: "ok", message: "Dodajte link na drugi savjet, usluge ili kontakt stranicu." },
  );

  // --- images ---
  if (!input.coverImage) {
    checks.push({ id: "cover", status: "ok", message: "Nema naslovne slike — članci sa slikom bolje izgledaju u pretrazi." });
  } else if (!input.coverImageAlt.trim()) {
    checks.push({ id: "cover", status: "ok", message: "Naslovna slika nema opis (alt tekst) za Google i čitače ekrana." });
  } else {
    checks.push({ id: "cover", status: "good", message: "Naslovna slika ima opis (alt tekst)." });
  }
  checks.push(
    input.ogImage || input.coverImage
      ? { id: "share-image", status: "good", message: "Postoji slika za dijeljenje (Facebook, Viber, WhatsApp)." }
      : { id: "share-image", status: "ok", message: "Pri dijeljenju će se koristiti opća slika ordinacije." },
  );

  if (input.slug.length > 75) {
    checks.push({ id: "slug-length", status: "ok", message: "URL je dug — kraći je bolji." });
  }

  const score = Math.round((checks.reduce((sum, c) => sum + WEIGHT[c.status], 0) / checks.length) * 100);
  return { score, checks, wordCount };
}
