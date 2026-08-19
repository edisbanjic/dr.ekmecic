import Subpage from "@/components/Subpage";
import TipsIndexView from "@/components/tips/TipsIndexView";
import type { Locale } from "@/lib/i18n";
import { CATEGORIES } from "@/lib/categories";
import { getPosts } from "@/lib/posts";

/** Tips/news index for one locale — fetches on the server, renders via the client view. */
export default async function TipsIndex({
  locale,
  category,
}: {
  locale: Locale;
  category?: string;
}) {
  const activeCategory = category && CATEGORIES.includes(category) ? category : null;
  const posts = await getPosts(undefined, activeCategory ?? undefined);

  return (
    <Subpage locale={locale}>
      <TipsIndexView posts={posts} activeCategory={activeCategory} />
    </Subpage>
  );
}
