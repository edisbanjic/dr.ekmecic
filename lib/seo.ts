import { artPath, contactPath, getDict, homePath, postPath, tipsPath, type Locale } from "./i18n";
import { getSiteUrl } from "./site";
import type { Post } from "./types";

export const CLINIC = {
  phone: "+38737514771",
  email: "ekmecic.kamala@gmail.com",
  emailZehra: "ekmecic.zehra.dr@gmail.com",
  street: "Bolnička bb",
  postalCode: "77220",
  city: "Cazin",
  country: "BA",
  latitude: 44.96627043157745,
  longitude: 15.93211628755716,
  facebook: "https://www.facebook.com/drKamalaEkmecic",
  instagram: "https://www.instagram.com/dr.ekmecic_dental",
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

export function artAlternates() {
  return languageAlternates({ bs: artPath("bs"), en: artPath("en") });
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
    alternateName: t.meta.siteName,
    description: t.meta.home.description,
    url: absoluteUrl(homePath(locale)),
    logo: absoluteUrl("/assets/brand-logo-full.png"),
    image: [
      absoluteUrl("/assets/og-image.jpg"),
      absoluteUrl("/assets/team-zehra.webp"),
      absoluteUrl("/assets/gallery-clinic.webp"),
    ],
    telephone: CLINIC.phone,
    email: CLINIC.email,
    priceRange: "$$",
    currenciesAccepted: "BAM",
    medicalSpecialty: "Dentistry",
    areaServed: [
      { "@type": "City", name: "Cazin" },
      { "@type": "AdministrativeArea", name: "Unsko-sanski kanton" },
    ],
    hasMap: `https://www.google.com/maps/search/?api=1&query=${CLINIC.latitude},${CLINIC.longitude}`,
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
    sameAs: [CLINIC.instagram, CLINIC.facebook],
    founder: { "@id": `${getSiteUrl()}/#kamala` },
    employee: doctorsJsonLd(locale),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: t.services.title,
      itemListElement: Object.values(t.services.cards).map((card) => ({
        "@type": "Offer",
        itemOffered: { "@type": "MedicalProcedure", name: card.title, description: card.text },
      })),
    },
  };
}

/** The two dentists as schema.org Dentist persons (E-E-A-T: who treats you, where they studied). */
export function doctorsJsonLd(locale: Locale) {
  const t = getDict(locale).about;
  const clinic = { "@id": `${getSiteUrl()}/#clinic` };
  return [
    {
      "@type": ["Person", "Physician"],
      "@id": `${getSiteUrl()}/#kamala`,
      name: "dr. Kamala Ekmečić",
      jobTitle: locale === "bs" ? "Doktorica stomatologije" : "Doctor of Dental Medicine",
      description: t.p1,
      image: absoluteUrl("/assets/team-kamala-5.webp"),
      medicalSpecialty: "Dentistry",
      alumniOf: { "@type": "CollegeOrUniversity", name: "Stomatološki fakultet Sveučilišta u Zagrebu" },
      worksFor: clinic,
    },
    {
      "@type": ["Person", "Physician"],
      "@id": `${getSiteUrl()}/#zehra`,
      name: "dr. Zehra Ekmečić",
      jobTitle: locale === "bs" ? "Doktorica dentalne medicine" : "Doctor of Dental Medicine",
      description: t.team.p1,
      image: absoluteUrl("/assets/team-zehra.webp"),
      medicalSpecialty: "Dentistry",
      alumniOf: { "@type": "CollegeOrUniversity", name: "Fakultet dentalne medicine Sveučilišta u Rijeci" },
      worksFor: clinic,
    },
  ];
}

/** schema.org WebSite — ties every page to one site and publisher. */
export function websiteJsonLd(locale: Locale) {
  const t = getDict(locale).meta;
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${getSiteUrl()}/#website`,
    url: absoluteUrl(homePath(locale)),
    name: t.siteName,
    alternateName: t.clinicName,
    inLanguage: locale,
    publisher: { "@id": `${getSiteUrl()}/#clinic` },
  };
}

/** Breadcrumb from the home page to a top-level subpage. */
export function subpageBreadcrumb(locale: Locale, name: string, path: string) {
  return breadcrumbJsonLd([
    { name: getDict(locale).meta.siteName, url: absoluteUrl(homePath(locale)) },
    { name, url: absoluteUrl(path) },
  ]);
}

/** schema.org Blog for the tips index, listing the published posts. */
export function blogJsonLd(posts: Post[], locale: Locale) {
  const t = getDict(locale);
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${absoluteUrl(tipsPath(locale))}#blog`,
    url: absoluteUrl(tipsPath(locale)),
    name: t.tips.title,
    description: t.meta.tips.description,
    inLanguage: locale,
    isPartOf: { "@id": `${getSiteUrl()}/#website` },
    publisher: { "@id": `${getSiteUrl()}/#clinic` },
    blogPost: posts
      .filter((p) => !p.no_index)
      .map((p) => ({
        "@type": "BlogPosting",
        headline: p.title,
        url: absoluteUrl(postPath("bs", p.slug)),
        datePublished: p.date,
        dateModified: p.updated_at ?? p.date,
        ...(p.image_url ? { image: p.image_url } : {}),
      })),
  };
}

/** schema.org ContactPage pointing at the clinic entity. */
export function contactPageJsonLd(locale: Locale) {
  const t = getDict(locale).meta;
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: absoluteUrl(contactPath(locale)),
    name: t.contact.title,
    description: t.contact.description,
    inLanguage: locale,
    isPartOf: { "@id": `${getSiteUrl()}/#website` },
    about: { "@id": `${getSiteUrl()}/#clinic` },
  };
}

/** schema.org CollectionPage for the illustrations by dr. Zehra. */
export function artPageJsonLd(locale: Locale) {
  const t = getDict(locale).meta;
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    url: absoluteUrl(artPath(locale)),
    name: t.art.title,
    description: t.art.description,
    inLanguage: locale,
    isPartOf: { "@id": `${getSiteUrl()}/#website` },
    author: { "@id": `${getSiteUrl()}/#zehra` },
  };
}

/** schema.org FAQPage — mirrors the FAQ accordion on the home page. */
export function faqJsonLd(locale: Locale) {
  const t = getDict(locale);
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

/** schema.org BlogPosting for a tips post (canonical = Bosnian URL). */
export function articleJsonLd(post: Post, locale: Locale) {
  const t = getDict(locale);
  const url = absoluteUrl(postPath("bs", post.slug));
  const image = post.og_image || post.image_url || absoluteUrl("/assets/og-image.jpg");
  const clinic = {
    "@type": "Dentist",
    "@id": `${getSiteUrl()}/#clinic`,
    name: t.meta.clinicName,
    url: absoluteUrl(homePath("bs")),
    logo: { "@type": "ImageObject", url: absoluteUrl("/assets/brand-logo-full.png") },
  };
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.seo_title?.trim() || post.title,
    description: post.seo_description?.trim() || post.summary || undefined,
    image: [image],
    datePublished: post.date,
    dateModified: post.updated_at ?? post.date,
    inLanguage: "bs",
    articleSection: post.category,
    ...(post.focus_keyword ? { keywords: post.focus_keyword } : {}),
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: clinic,
    publisher: clinic,
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
