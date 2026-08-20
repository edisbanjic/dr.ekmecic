import { contactPath, getDict, homePath, postPath, tipsPath, type Locale } from "./i18n";
import { getSiteUrl } from "./site";
import type { Post } from "./types";

export const CLINIC = {
  phone: "+38737514771",
  email: "ekmecic.kamala@gmail.com",
  street: "Bolnička bb",
  postalCode: "77220",
  city: "Cazin",
  country: "BA",
  latitude: 44.96627043157745,
  longitude: 15.93211628755716,
  facebook: "https://www.facebook.com/drKamalaEkmecic",
} as const;

export function absoluteUrl(path: string): string {
  return `${getSiteUrl()}${path === "/" ? "" : path}`;
}

/** hreflang map for a page pair; Bosnian is the x-default. */
export function languageAlternates(paths: Record<Locale, string>) {
  return {
    bs: absoluteUrl(paths.bs),
    en: absoluteUrl(paths.en),
    "x-default": absoluteUrl(paths.bs),
  };
}

export function homeAlternates() {
  return languageAlternates({ bs: homePath("bs"), en: homePath("en") });
}

export function tipsAlternates() {
  return languageAlternates({ bs: tipsPath("bs"), en: tipsPath("en") });
}

export function contactAlternates() {
  return languageAlternates({ bs: contactPath("bs"), en: contactPath("en") });
}

export function postAlternates(slug: string) {
  return languageAlternates({ bs: postPath("bs", slug), en: postPath("en", slug) });
}

/** schema.org Dentist / LocalBusiness — rendered as JSON-LD on the home page. */
export function clinicJsonLd(locale: Locale) {
  const t = getDict(locale);
  return {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "@id": `${getSiteUrl()}/#clinic`,
    name: t.meta.clinicName,
    description: t.meta.home.description,
    url: absoluteUrl(homePath(locale)),
    image: absoluteUrl("/assets/hero-clinic.webp"),
    telephone: CLINIC.phone,
    email: CLINIC.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: CLINIC.street,
      postalCode: CLINIC.postalCode,
      addressLocality: CLINIC.city,
      addressCountry: CLINIC.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: CLINIC.latitude,
      longitude: CLINIC.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Friday"],
        opens: "08:00",
        closes: "16:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Thursday",
        opens: "10:00",
        closes: "18:00",
      },
    ],
    sameAs: [CLINIC.facebook],
  };
}

/** schema.org Article for a tips post. */
export function articleJsonLd(post: Post, locale: Locale) {
  const t = getDict(locale);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.summary ?? undefined,
    image: post.image_url ? [post.image_url] : undefined,
    datePublished: post.date,
    inLanguage: locale,
    mainEntityOfPage: absoluteUrl(postPath(locale, post.slug)),
    author: { "@type": "Organization", name: t.meta.clinicName },
    publisher: { "@type": "Organization", name: t.meta.clinicName },
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
