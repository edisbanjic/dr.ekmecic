import JsonLd from "@/components/JsonLd";
import Subpage from "@/components/Subpage";
import PostArticleView from "@/components/tips/PostArticleView";
import { getDict, homePath, postPath, tipsPath, type Locale } from "@/lib/i18n";
import { getRelatedPosts } from "@/lib/posts";
import { absoluteUrl, articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import type { Post } from "@/lib/types";

/** A single tips post for one locale — structured data on the server, markup in the client view. */
export default async function PostArticle({ locale, post }: { locale: Locale; post: Post }) {
  const t = getDict(locale);
  const relatedPosts = await getRelatedPosts(post);
  const breadcrumbs = breadcrumbJsonLd([
    { name: t.meta.siteName, url: absoluteUrl(homePath(locale)) },
    { name: t.tips.title, url: absoluteUrl(tipsPath(locale)) },
    { name: post.title, url: absoluteUrl(postPath(locale, post.slug)) },
  ]);
  // both locales' share URLs, so an in-place language switch shares the right one
  const shareUrls = {
    bs: absoluteUrl(postPath("bs", post.slug)),
    en: absoluteUrl(postPath("en", post.slug)),
  };

  return (
    <Subpage locale={locale}>
      <JsonLd data={articleJsonLd(post, locale)} />
      <JsonLd data={breadcrumbs} />
      <PostArticleView post={post} relatedPosts={relatedPosts} shareUrls={shareUrls} />
    </Subpage>
  );
}
