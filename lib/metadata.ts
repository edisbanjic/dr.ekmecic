import type { Metadata } from "next";
import { artPath, contactPath, getDict, homePath, postPath, tipsPath, type Locale } from "./i18n";
import {
  absoluteUrl,
  artAlternates,
  contactAlternates,
  homeAlternates,
  tipsAlternates,
} from "./seo";
import type { Post } from "./types";

// Dedicated 1200×630 share card — portrait photos get cropped badly by FB/Viber/WhatsApp.
const OG_IMAGE = "/assets/og-image.jpg";
const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

const alternateOgLocale = (locale: Locale) => (locale === "bs" ? "en_US" : "bs_BA");

export function homeMetadata(locale: Locale): Metadata {
  const t = getDict(locale).meta;
  const url = absoluteUrl(homePath(locale));
  return {
    title: t.home.title,
    description: t.home.description,
    keywords: t.home.keywords,
    alternates: { canonical: url, languages: homeAlternates() },
    openGraph: {
      type: "website",
      locale: t.ogLocale,
      alternateLocale: alternateOgLocale(locale),
      url,
      siteName: t.siteName,
      title: t.home.title,
      description: t.home.description,
      images: [{ url: OG_IMAGE, width: OG_WIDTH, height: OG_HEIGHT, alt: t.siteName }],
    },
    twitter: {
      card: "summary_large_image",
      title: t.home.title,
      description: t.home.description,
      images: [OG_IMAGE],
    },
  };
}

export function tipsMetadata(locale: Locale): Metadata {
  const t = getDict(locale).meta;
  const url = absoluteUrl(tipsPath(locale));
  return {
    title: t.tips.title,
    description: t.tips.description,
    alternates: { canonical: url, languages: tipsAlternates() },
    openGraph: {
      type: "website",
      locale: t.ogLocale,
      alternateLocale: alternateOgLocale(locale),
      url,
      siteName: t.siteName,
      title: t.tips.title,
      description: t.tips.description,
      images: [{ url: OG_IMAGE, width: OG_WIDTH, height: OG_HEIGHT, alt: t.siteName }],
    },
    twitter: {
      card: "summary_large_image",
      title: t.tips.title,
      description: t.tips.description,
      images: [OG_IMAGE],
    },
  };
}

export function contactMetadata(locale: Locale): Metadata {
  const t = getDict(locale).meta;
  const url = absoluteUrl(contactPath(locale));
  return {
    title: t.contact.title,
    description: t.contact.description,
    alternates: { canonical: url, languages: contactAlternates() },
    openGraph: {
      type: "website",
      locale: t.ogLocale,
      alternateLocale: alternateOgLocale(locale),
      url,
      siteName: t.siteName,
      title: t.contact.title,
      description: t.contact.description,
      images: [{ url: OG_IMAGE, width: OG_WIDTH, height: OG_HEIGHT, alt: t.siteName }],
    },
    twitter: {
      card: "summary_large_image",
      title: t.contact.title,
      description: t.contact.description,
      images: [OG_IMAGE],
    },
  };
}

export function artMetadata(locale: Locale): Metadata {
  const t = getDict(locale).meta;
  const url = absoluteUrl(artPath(locale));
  const image = absoluteUrl("/assets/art/cetkica-1.webp");
  return {
    title: t.art.title,
    description: t.art.description,
    alternates: { canonical: url, languages: artAlternates() },
    openGraph: {
      type: "website",
      locale: t.ogLocale,
      alternateLocale: alternateOgLocale(locale),
      url,
      siteName: t.siteName,
      title: t.art.title,
      description: t.art.description,
      images: [{ url: image, width: 1240, height: 1754, alt: t.art.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: t.art.title,
      description: t.art.description,
      images: [image],
    },
  };
}

export function postMetadata(post: Post | null, locale: Locale): Metadata {
  const t = getDict(locale).meta;
  if (!post) {
    return { title: t.postNotFound, robots: { index: false, follow: false } };
  }
  // Posts are written only in Bosnian; /en/tips/<slug> shows the same text, so
  // the Bosnian URL is canonical for both (no duplicate content in Google).
  const url = absoluteUrl(postPath("bs", post.slug));
  const description = post.summary ?? t.postFallbackDescription;
  // Without a cover, share the branded card instead of a preview with no image.
  const image = post.image_url
    ? { url: post.image_url, alt: post.title }
    : { url: OG_IMAGE, width: OG_WIDTH, height: OG_HEIGHT, alt: post.title };
  return {
    title: `${post.title} | ${t.siteName}`,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: getDict("bs").meta.ogLocale,
      url,
      siteName: t.siteName,
      title: post.title,
      description,
      images: [image],
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [image.url],
    },
  };
}
