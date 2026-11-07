import type { MetadataRoute } from "next";
import { artPath, contactPath, homePath, tipsPath, postPath } from "@/lib/i18n";
import { getPosts } from "@/lib/posts";
import { absoluteUrl } from "@/lib/seo";

export const revalidate = 3600;

/** Both locales for every public page; Google reads hreflang from `alternates`. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();
  const lastPostDate = posts[0]?.date;

  const pair = (bs: string, en: string) => ({
    languages: { bs: absoluteUrl(bs), en: absoluteUrl(en) },
  });

  const entries: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl(homePath("bs")),
      changeFrequency: "monthly",
      priority: 1,
      alternates: pair(homePath("bs"), homePath("en")),
    },
    {
      url: absoluteUrl(homePath("en")),
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: pair(homePath("bs"), homePath("en")),
    },
    {
      url: absoluteUrl(tipsPath("bs")),
      lastModified: lastPostDate,
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: pair(tipsPath("bs"), tipsPath("en")),
    },
    {
      url: absoluteUrl(tipsPath("en")),
      lastModified: lastPostDate,
      changeFrequency: "weekly",
      priority: 0.7,
      alternates: pair(tipsPath("bs"), tipsPath("en")),
    },
    {
      url: absoluteUrl(contactPath("bs")),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: pair(contactPath("bs"), contactPath("en")),
    },
    {
      url: absoluteUrl(contactPath("en")),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: pair(contactPath("bs"), contactPath("en")),
    },
    {
      url: absoluteUrl(artPath("bs")),
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: pair(artPath("bs"), artPath("en")),
    },
    {
      url: absoluteUrl(artPath("en")),
      changeFrequency: "monthly",
      priority: 0.5,
      alternates: pair(artPath("bs"), artPath("en")),
    },
  ];

  // Posts exist only in Bosnian (the /en copy canonicalises to it), so list one URL each.
  for (const post of posts.filter((p) => !p.no_index)) {
    entries.push({
      url: absoluteUrl(postPath("bs", post.slug)),
      lastModified: post.updated_at ?? post.date,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  return entries;
}
