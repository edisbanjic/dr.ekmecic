"use client";

import { useLocale } from "@/components/LocaleProvider";
import PostCover from "@/components/tips/PostCover";
import { CATEGORY_COLORS } from "@/lib/categories";
import { formatPrettyDate, getDict, postPath, tipsPath } from "@/lib/i18n";
import type { Post } from "@/lib/types";

/** Other tips below the booking CTA — 3-up grid on desktop, snap slider on small screens. */
export default function RelatedPosts({ posts }: { posts: Post[] }) {
  const { locale } = useLocale();
  const t = getDict(locale);
  if (posts.length === 0) return null;

  const categoryLabel = (value: string) =>
    t.tips.categories[value as keyof typeof t.tips.categories] ?? value;

  return (
    <section className="related-posts" aria-labelledby="related-posts-title">
      <div className="related-posts-head">
        <h2 id="related-posts-title" className="related-posts-title">
          {t.post.relatedTitle}
          <span style={{ color: "#F4A08A" }}>.</span>
        </h2>
        <a href={tipsPath(locale)} className="related-posts-all">
          {t.post.relatedAll}
        </a>
      </div>

      <div className="related-posts-track">
        {posts.map((post, i) => {
          const tone = CATEGORY_COLORS[post.category] ?? { color: "#3E5F86", bg: "#E7F0FB" };
          return (
            <a
              key={post.id}
              href={postPath(locale, post.slug)}
              className="hv-cta related-posts-card"
              style={{
                transform: `rotate(${i % 2 === 0 ? "-.25deg" : ".25deg"})`,
              }}
            >
              <PostCover src={post.image_url} className="related-posts-image" />
              <div className="related-posts-body">
                <div className="related-posts-meta">
                  <span
                    className="related-posts-cat"
                    style={{ background: tone.bg, color: tone.color }}
                  >
                    {categoryLabel(post.category).toUpperCase()}
                  </span>
                  <span className="related-posts-date">
                    {formatPrettyDate(post.date, locale)}
                  </span>
                </div>
                <h3 className="related-posts-card-title">{post.title}</h3>
                {post.summary && (
                  <p className="related-posts-summary">{post.summary}</p>
                )}
                <span className="related-posts-more" style={{ color: tone.color }}>
                  {t.tips.readMore} <span style={{ color: "#F4A08A" }}>✦</span>
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
