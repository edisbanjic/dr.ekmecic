import type { Metadata } from "next";
import TipsIndex from "@/components/tips/TipsIndex";
import JsonLd from "@/components/JsonLd";
import { getDict, tipsPath } from "@/lib/i18n";
import { tipsMetadata } from "@/lib/metadata";
import { getPosts } from "@/lib/posts";
import { blogJsonLd, subpageBreadcrumb } from "@/lib/seo";

// Static + ISR: served from the CDN; admin post actions revalidate on change.
export const dynamic = "force-static";
export const revalidate = 3600;

export const metadata: Metadata = tipsMetadata("en");

export default async function Page() {
  const posts = await getPosts();
  return (
    <>
      <JsonLd data={blogJsonLd(posts, "en")} />
      <JsonLd data={subpageBreadcrumb("en", getDict("en").tips.title, tipsPath("en"))} />
      <TipsIndex locale="en" />
    </>
  );
}
