"use client";

import { useLocale } from "@/components/LocaleProvider";
import { ART_HOME_IDS, ART_STORIES, artImage } from "@/lib/art";
import { artPath, getDict } from "@/lib/i18n";

const SWING = [
  { duration: "5.2s", delay: "-1.1s" },
  { duration: "6.1s", delay: "-3.4s" },
  { duration: "4.8s", delay: "-0.4s" },
  { duration: "5.7s", delay: "-2.6s" },
  { duration: "6.4s", delay: "-4.1s" },
  { duration: "5.0s", delay: "-1.9s" },
];

/** Zehra's illustrations pegged to a washing line — each links into the art corner. */
export default function ArtSection() {
  const { locale } = useLocale();
  const dict = getDict(locale);
  const t = dict.artHome;
  const stories = ART_HOME_IDS.map((id) => ART_STORIES.find((s) => s.id === id)!).filter(Boolean);
  const base = artPath(locale);
  // The line is a quadratic curve across the row (y = 7 + 196·f·(1−f) px at x-fraction f).
  // Cards are spread edge to edge, so card centres sit at roughly f = 0.07 … 0.93;
  // each card drops so its peg lands on the line.
  const sag = (i: number) => {
    const f = 0.07 + (0.86 * i) / Math.max(1, stories.length - 1);
    return Math.round(196 * f * (1 - f) - 1);
  };

  return (
    <section id="art" style={{ background: "#FBF8F1", padding: "0 0 clamp(50px,7vw,80px)", overflow: "hidden" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(18px,4vw,32px)" }}>
        <div data-reveal="" style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "20px" }}>
          <div style={{ maxWidth: "600px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#FBE7DA", borderRadius: "999px", padding: "8px 16px", fontFamily: "var(--font-fredoka)", fontWeight: 600, fontSize: "12.5px", letterSpacing: ".14em", color: "#A05A42" }}>
              {t.badge} <span style={{ display: "inline-block", animation: "bling 2.4s ease-in-out infinite" }}>✦</span>
            </div>
            <h2 style={{ margin: "16px 0 0", fontFamily: "var(--font-fredoka)", fontWeight: 700, fontSize: "clamp(34px,5vw,54px)", lineHeight: 1.04 }}>
              {t.titlePre}
              <span style={{ color: "#5B8FD4" }}>{t.titleHighlight}</span>
            </h2>
            <p style={{ margin: "14px 0 0", fontSize: "16.5px", lineHeight: 1.65, fontWeight: 600, opacity: 0.78 }}>{t.lead}</p>
          </div>
          <a
            href={base}
            className="hv8"
            style={{ background: "#3D4142", color: "#F5F0E8", fontFamily: "var(--font-fredoka)", fontWeight: 600, fontSize: "16px", padding: "14px 26px", borderRadius: "999px", transition: "transform .3s cubic-bezier(.34,1.56,.64,1)", whiteSpace: "nowrap" }}
          >
            {t.cta} →
          </a>
        </div>
      </div>

      <div className="art-strip" style={{ overflowX: "auto", marginTop: "clamp(20px,3vw,34px)" }}>
        <div style={{ width: "max-content", minWidth: "100%", padding: "0 clamp(18px,4vw,32px)", boxSizing: "border-box" }}>
          <div style={{ position: "relative", display: "flex", justifyContent: "space-between", gap: "clamp(22px,3vw,40px)", paddingTop: "10px", paddingBottom: "34px", maxWidth: "1200px", margin: "0 auto" }}>
            <svg viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true" style={{ position: "absolute", left: "-3%", top: "0", width: "106%", height: "70px", overflow: "visible" }}>
              <path d="M0 4 Q50 60 100 4" fill="none" stroke="#C9BFAE" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
            </svg>
            {stories.map((story, i) => (
              <a
                key={story.id}
                href={`${base}#${story.id}`}
                className="art-hang-link"
                aria-label={story.title[locale]}
                style={{ flex: "0 0 auto", width: "clamp(140px,15vw,168px)", marginTop: `${sag(i)}px`, outline: "none" }}
              >
                <div className="art-hang" style={{ animationDuration: SWING[i % SWING.length].duration, animationDelay: SWING[i % SWING.length].delay, position: "relative" }}>
                  <span
                    aria-hidden="true"
                    style={{ position: "absolute", left: "50%", top: "-16px", width: "12px", height: "28px", marginLeft: "-6px", borderRadius: "4px", background: story.tone, boxShadow: "inset -3px 0 0 rgba(0,0,0,.12)", zIndex: 2 }}
                  />
                  <div style={{ background: "#FFFFFF", padding: "8px 8px 12px", borderRadius: "6px", boxShadow: "0 22px 36px -24px rgba(61,65,66,.55)", transform: `rotate(${i % 2 ? 1.5 : -1.5}deg)` }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={artImage(story.id, 1, true)} alt="" loading="lazy" decoding="async" style={{ width: "100%", aspectRatio: "0.707", objectFit: "cover", display: "block", borderRadius: "3px" }} />
                    <div style={{ marginTop: "9px", fontFamily: "var(--font-shantell)", fontWeight: 500, fontSize: "13.5px", lineHeight: 1.3, textAlign: "center", minHeight: "2.6em" }}>
                      {story.title[locale]}
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
