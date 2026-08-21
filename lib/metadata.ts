import type { Metadata } from "next";
import { contactPath, getDict, homePath, postPath, tipsPath, type Locale } from "./i18n";
import {
  absoluteUrl,
  contactAlternates,
  homeAlternates,
  postAlternates,
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

export function postMetadata(post: Post | null, locale: Locale): Metadata {
  const t = getDict(locale).meta;
  if (!post) {
    return { title: t.postNotFound, robots: { index: false, follow: false } };
  }
  const url = absoluteUrl(postPath(locale, post.slug));
  const description = post.summary ?? t.postFallbackDescription;
  const images = post.image_url ? [{ url: post.image_url, alt: post.title }] : undefined;
  return {
    title: `${post.title} — ${t.siteName}`,
    description,
    alternates: { canonical: url, languages: postAlternates(post.slug) },
    openGraph: {
      type: "article",
      locale: t.ogLocale,
      alternateLocale: alternateOgLocale(locale),
      url,
      siteName: t.siteName,
      title: post.title,
      description,
      images,
      publishedTime: post.date,
    },
    twitter: {
      card: post.image_url ? "summary_large_image" : "summary",
      title: post.title,
      description,
      images: post.image_url ? [post.image_url] : undefined,
    },
  };
}
