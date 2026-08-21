"use client";

import PostContent from "@/components/PostContent";
import PostShare from "@/components/PostShare";
import { BookingTrigger } from "@/components/BookingModal";
import { useLocale } from "@/components/LocaleProvider";
import RelatedPosts from "@/components/tips/RelatedPosts";
import { contactPath, formatPrettyDate, getDict, tipsPath, type Locale } from "@/lib/i18n";
import type { Post } from "@/lib/types";

/** Post markup — copy comes from LocaleProvider so a language switch updates in place. */
export default function PostArticleView({
  post,
  relatedPosts,
  shareUrls,
}: {
  post: Post;
  relatedPosts: Post[];
  shareUrls: Record<Locale, string>;
}) {
  const { locale } = useLocale();
  const t = getDict(locale);

  return (
    <article style={{ maxWidth: "1200px", margin: "0 auto", padding: "clamp(40px,6vw,70px) clamp(18px,4vw,32px) 0" }}>
      <a href={tipsPath(locale)} style={{ fontWeight: 800, fontSize: "14px", color: "#3E5F86" }}>
        {t.post.back}
      </a>
      <div style={{ marginTop: "22px", fontFamily: "var(--font-shantell)", fontWeight: 500, fontSize: "15px", color: "#5B8FD4" }}>
        {formatPrettyDate(post.date, locale)}
      </div>
      <h1 style={{ margin: "10px 0 0", fontFamily: "var(--font-fredoka)", fontWeight: 700, fontSize: "clamp(30px,5vw,48px)", lineHeight: 1.06, letterSpacing: "-.01em" }}>
        {post.title}
      </h1>
      {post.summary && (
        <p style={{ margin: "18px 0 0", fontSize: "18px", lineHeight: 1.6, fontWeight: 700, opacity: 0.75 }}>
          {post.summary}
        </p>
      )}
      <PostShare title={post.title} summary={post.summary} url={shareUrls[locale]} />
      {post.image_url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.image_url}
          alt={post.title}
          fetchPriority="high"
          style={{
            display: "block", width: "100%", maxHeight: "420px", objectFit: "cover",
            borderRadius: "22px", marginTop: "26px",
          }}
        />
      )}
      <div style={{ marginTop: "26px", borderTop: "2px solid rgba(61,65,66,.08)", paddingTop: "26px" }}>
        <PostContent content={post.content} />
      </div>
      <section
        style={{
          marginTop: "42px",
          background: "linear-gradient(135deg, #FFF9F2 0%, #EAF4FF 100%)",
          border: "1px solid rgba(126,174,232,.22)",
          borderRadius: "30px",
          padding: "clamp(26px,4vw,38px)",
          boxShadow: "0 26px 48px -30px rgba(61,65,66,.28)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "-36px",
            right: "-28px",
            width: "132px",
            height: "132px",
            borderRadius: "999px",
            background: "rgba(126,174,232,.18)",
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: "-42px",
            left: "-22px",
            width: "118px",
            height: "118px",
            borderRadius: "999px",
            background: "rgba(244,160,138,.18)",
          }}
        />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "560px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 14px",
              borderRadius: "999px",
              background: "#FFFFFF",
              color: "#3E5F86",
              fontFamily: "var(--font-fredoka)",
              fontWeight: 700,
              fontSize: "13px",
              letterSpacing: ".08em",
            }}
          >
            {t.post.ctaBadge}
          </div>
          <h2
            style={{
              margin: "16px 0 0",
              fontFamily: "var(--font-fredoka)",
              fontWeight: 700,
              fontSize: "clamp(28px,4.6vw,42px)",
              lineHeight: 1.05,
            }}
          >
            {t.post.ctaTitle}<span style={{ color: "#F4A08A" }}>.</span>
          </h2>
          <p style={{ margin: "14px 0 0", fontSize: "17px", lineHeight: 1.75, fontWeight: 600, opacity: 0.78 }}>
            {t.post.ctaText}
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "22px" }}>
            <BookingTrigger
              className="hv1"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#7EAEE8",
                color: "#243038",
                fontFamily: "var(--font-fredoka)",
                fontWeight: 600,
                fontSize: "15.5px",
                padding: "11px 22px",
                borderRadius: "999px",
                animation: "pulse 3.2s ease-out infinite",
                transition: "transform .3s cubic-bezier(.34,1.56,.64,1)",
              }}
            >
              {t.post.ctaBook}
            </BookingTrigger>
            <a
              href={contactPath(locale)}
              className="hv1"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#FFFFFF",
                color: "#3D4142",
                fontFamily: "var(--font-fredoka)",
                fontWeight: 600,
                fontSize: "15.5px",
                padding: "11px 22px",
                borderRadius: "999px",
                border: "2px solid #EDE5D4",
                transition: "transform .3s cubic-bezier(.34,1.56,.64,1)",
              }}
            >
              {t.post.ctaContact}
            </a>
          </div>
        </div>
      </section>
      <RelatedPosts posts={relatedPosts} />
    </article>
  );
}
