import { Suspense } from "react";
import Subpage from "@/components/Subpage";
import TipsIndexView from "@/components/tips/TipsIndexView";
import type { Locale } from "@/lib/i18n";
import { getPosts } from "@/lib/posts";

/**
 * Tips/news index for one locale — fetches every published post on the server;
 * the client view filters by ?category= so the page can stay static.
 * (Suspense is required around useSearchParams during prerender.)
 */
export default async function TipsIndex({ locale }: { locale: Locale }) {
  const posts = await getPosts();

  return (
    <Subpage locale={locale}>
      <Suspense>
        <TipsIndexView posts={posts} />
      </Suspense>
    </Subpage>
  );
}
