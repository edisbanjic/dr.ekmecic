"use client";

import { useLocale } from "@/components/LocaleProvider";
import PostCover from "@/components/tips/PostCover";
import { CATEGORIES, CATEGORY_COLORS } from "@/lib/categories";
import { formatPrettyDate, getDict, postPath, tipsPath } from "@/lib/i18n";
import type { Post } from "@/lib/types";

/** Tips index markup — copy comes from LocaleProvider so a language switch updates in place. */
export default function TipsIndexView({
  posts,
  activeCategory,
}: {
  posts: Post[];
  activeCategory: string | null;
}) {
  const { locale } = useLocale();
  const t = getDict(locale).tips;
  const hasPosts = posts.length > 0;
  const basePath = tipsPath(locale);
  const categoryLabel = (value: string) =>
    t.categories[value as keyof typeof t.categories] ?? value;

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "clamp(40px,6vw,70px) clamp(18px,4vw,32px) 0" }}>
      <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#E7F0FB", borderRadius: "999px", padding: "8px 16px", fontFamily: "var(--font-fredoka)", fontWeight: 600, fontSize: "12.5px", letterSpacing: ".14em", color: "#3E5F86" }}>
        {t.badge}
      </div>
      <h1 style={{ margin: "16px 0 0", fontFamily: "var(--font-fredoka)", fontWeight: 700, fontSize: "clamp(36px,5.6vw,56px)", lineHeight: 1.02 }}>
        {t.title}<span style={{ color: "#F4A08A" }}>.</span>
      </h1>
      <p style={{ margin: "14px 0 0", maxWidth: "640px", fontSize: "17px", lineHeight: 1.65, fontWeight: 600, opacity: 0.78 }}>
        {t.lead}
      </p>

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "22px" }}>
        <a
          href={basePath}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px 16px",
            borderRadius: "999px",
            fontWeight: 800,
            fontSize: "14px",
            textDecoration: "none",
            background: activeCategory === null ? "#3E5F86" : "#FFFFFF",
            color: activeCategory === null ? "#FFFFFF" : "#3D4142",
            border: activeCategory === null ? "2px solid #3E5F86" : "2px solid #EDE5D4",
            boxShadow: activeCategory === null ? "0 14px 24px -18px rgba(62,95,134,.8)" : "none",
          }}
        >
          {t.all}
        </a>
        {CATEGORIES.map((item) => {
          const tone = CATEGORY_COLORS[item];
          const active = item === activeCategory;
          return (
            <a
              key={item}
              href={`${basePath}?category=${encodeURIComponent(item)}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "10px 16px",
                borderRadius: "999px",
                fontWeight: 800,
                fontSize: "14px",
                textDecoration: "none",
                background: active ? tone.color : "#FFFFFF",
                color: active ? "#FFFFFF" : tone.color,
                border: `2px solid ${active ? tone.color : tone.bg}`,
                boxShadow: active ? "0 14px 24px -18px rgba(61,65,66,.45)" : "none",
              }}
            >
              {categoryLabel(item)}
            </a>
          );
        })}
      </div>

      {!hasPosts ? (
        <div
          style={{
            marginTop: "clamp(28px,4vw,40px)",
            background: "linear-gradient(180deg, #FFFFFF 0%, #FFF9F2 100%)",
            border: "2px solid #F1E8D7",
            borderRadius: "28px",
            padding: "34px 28px",
            boxShadow: "0 26px 46px -30px rgba(61,65,66,.28)",
            maxWidth: "720px",
          }}
        >
          <div style={{ fontFamily: "var(--font-shantell)", fontWeight: 600, fontSize: "18px", color: "#F4A08A" }}>
            {t.soon}
          </div>
          <h2 style={{ margin: "10px 0 0", fontFamily: "var(--font-fredoka)", fontSize: "clamp(24px,4vw,34px)", lineHeight: 1.05 }}>
            {activeCategory
              ? t.emptyCategoryTitle.replace("{category}", categoryLabel(activeCategory))
              : t.emptyTitle}
          </h2>
          <p style={{ margin: "14px 0 0", fontSize: "16px", lineHeight: 1.65, fontWeight: 600, opacity: 0.75 }}>
            {activeCategory ? t.emptyCategoryText : t.emptyText}
          </p>
        </div>
      ) : (
        <div className="tips-masonry" style={{ marginTop: "clamp(28px,4vw,44px)" }}>
          {posts.map((post, i) => {
            const tone = CATEGORY_COLORS[post.category] ?? { color: "#3E5F86", bg: "#E7F0FB" };
            const featured = posts.length > 2 && i % 5 === 0;
            return (
              <a
                key={post.id}
                href={postPath(locale, post.slug)}
                className="hv-cta tips-card"
                style={{
                  display: "block",
                  background: featured
                    ? "linear-gradient(180deg, #FFFFFF 0%, #FFF8F0 100%)"
                    : "linear-gradient(180deg, #FFFFFF 0%, #FFFCF7 100%)",
                  borderRadius: "30px",
                  overflow: "hidden",
                  boxShadow: "0 24px 44px -28px rgba(61,65,66,.28)",
                  border: "1px solid rgba(244,160,138,.14)",
                  transform: `rotate(${featured ? (i % 2 === 0 ? "-.55deg" : ".55deg") : i % 2 === 0 ? "-.25deg" : ".25deg"})`,
                  transition: "transform .3s cubic-bezier(.34,1.56,.64,1)",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <div style={{ display: "block" }}>
                  <PostCover
                    src={post.image_url}
                    alt={post.title}
                    height={featured ? 320 : i % 3 === 0 ? 280 : i % 2 === 0 ? 238 : 210}
                  />
                  <div
                    style={{
                      padding: featured ? "30px 32px" : "24px 26px 26px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            padding: "7px 12px",
                            borderRadius: "999px",
                            fontSize: "12px",
                            fontWeight: 800,
                            letterSpacing: ".08em",
                            background: tone.bg,
                            color: tone.color,
                          }}
                        >
                          {categoryLabel(post.category).toUpperCase()}
                        </span>
                        <span style={{ fontFamily: "var(--font-shantell)", fontWeight: 500, fontSize: "14px", color: "#5B8FD4" }}>
                          {formatPrettyDate(post.date, locale)}
                        </span>
                      </div>
                      <h2
                        style={{
                          margin: "14px 0 8px",
                          fontFamily: "var(--font-fredoka)",
                          fontWeight: 600,
                          fontSize: featured ? "clamp(28px,4vw,38px)" : "clamp(21px,3vw,27px)",
                          lineHeight: 1.08,
                        }}
                      >
                        {post.title}
                      </h2>
                      {post.summary && (
                        <p
                          style={{
                            margin: 0,
                            maxWidth: featured ? "44ch" : "unset",
                            fontSize: featured ? "16.5px" : "15.5px",
                            lineHeight: 1.65,
                            opacity: 0.8,
                            fontWeight: 600,
                          }}
                        >
                          {post.summary}
                        </p>
                      )}
                    </div>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        marginTop: "18px",
                        fontWeight: 800,
                        fontSize: "14px",
                        color: tone.color,
                      }}
                    >
                      {t.readMore} <span style={{ color: "#F4A08A" }}>✦</span>
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
