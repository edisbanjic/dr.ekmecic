import type { MetadataRoute } from "next";
import { contactPath, homePath, tipsPath, postPath } from "@/lib/i18n";
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
  ];

  for (const post of posts) {
    const alternates = pair(postPath("bs", post.slug), postPath("en", post.slug));
    entries.push(
      {
        url: absoluteUrl(postPath("bs", post.slug)),
        lastModified: post.date,
        changeFrequency: "monthly",
        priority: 0.6,
        alternates,
      },
      {
        url: absoluteUrl(postPath("en", post.slug)),
        lastModified: post.date,
        changeFrequency: "monthly",
        priority: 0.5,
        alternates,
      },
    );
  }

  return entries;
}
