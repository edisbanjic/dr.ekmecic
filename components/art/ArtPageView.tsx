"use client";

import { useEffect, useState } from "react";
import { FaInstagram } from "react-icons/fa";
import ArtViewer, { type ArtPosition } from "@/components/art/ArtViewer";
import { useLocale } from "@/components/LocaleProvider";
import { ART_STORIES, artImage } from "@/lib/art";
import { getDict } from "@/lib/i18n";
import { CLINIC } from "@/lib/seo";

/**
 * Art corner markup. Each story is a fanned deck of cards; clicking one opens
 * the viewer. The open story lives in the URL hash (#cetkica) so the home page
 * strip can deep-link straight into it.
 */
export default function ArtPageView() {
  const { locale } = useLocale();
  const t = getDict(locale).art;
  const [position, setPosition] = useState<ArtPosition | null>(null);

  useEffect(() => {
    const fromHash = () => {
      const index = ART_STORIES.findIndex((s) => s.id === window.location.hash.slice(1));
      setPosition(index >= 0 ? { story: index, image: 1 } : null);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  const move = (next: ArtPosition | null) => {
    setPosition(next);
    const hash = next ? `#${ART_STORIES[next.story].id}` : "";
    history.replaceState(null, "", `${window.location.pathname}${window.location.search}${hash}`);
  };

  // Bosnian: 1 slika, 2–4 slike, 5+ slika (21 slika, 22 slike…).
  const countLabel = (n: number) => {
    const one = n % 10 === 1 && n % 100 !== 11;
    const few = n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14);
    return `${n} ${one ? t.imageOne : few ? t.imageFew : t.imageMany}`;
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "clamp(40px,6vw,70px) clamp(18px,4vw,32px) 0" }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "24px" }}>
        <div style={{ maxWidth: "640px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#FBE7DA", borderRadius: "999px", padding: "8px 16px", fontFamily: "var(--font-fredoka)", fontWeight: 600, fontSize: "12.5px", letterSpacing: ".14em", color: "#A05A42" }}>
            {t.badge} <span style={{ display: "inline-block", animation: "bling 2.4s ease-in-out infinite" }}>✦</span>
          </div>
          <h1 style={{ margin: "16px 0 0", fontFamily: "var(--font-fredoka)", fontWeight: 700, fontSize: "clamp(38px,6vw,64px)", lineHeight: 1.02 }}>
            {t.titlePre}
            <span style={{ position: "relative", display: "inline-block", color: "#5B8FD4" }}>
              {t.titleHighlight}
              <svg viewBox="0 0 200 20" preserveAspectRatio="none" aria-hidden="true" style={{ position: "absolute", left: "0", bottom: "-.12em", width: "100%", height: ".22em" }}>
                <path d="M4 12 Q24 2 44 10 T84 10 T124 10 T164 10 T196 10" stroke="#F4A08A" strokeWidth="7" fill="none" strokeLinecap="round" />
              </svg>
            </span>
            <span style={{ color: "#F4A08A" }}>.</span>
          </h1>
          <p style={{ margin: "18px 0 0", fontSize: "17px", lineHeight: 1.65, fontWeight: 600, opacity: 0.78 }}>{t.lead}</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "12px" }}>
          <span style={{ fontFamily: "var(--font-shantell)", fontWeight: 500, fontSize: "20px", transform: "rotate(-3deg)", display: "inline-block" }}>
            ✎ {t.signature}
          </span>
          <a
            href={CLINIC.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="hv7"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", border: "2px solid #3D4142", borderRadius: "999px", padding: "9px 18px", fontWeight: 800, fontSize: "14px", background: "#FFFFFF", transition: "transform .3s cubic-bezier(.34,1.56,.64,1)" }}
          >
            <FaInstagram size={16} color="#D6407A" />
            {t.instagram}
          </a>
        </div>
      </div>

      <p style={{ margin: "clamp(30px,4vw,44px) 0 0", fontFamily: "var(--font-shantell)", fontSize: "15px", opacity: 0.6 }}>↓ {t.hint}</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(210px,1fr))", gap: "clamp(40px,5vw,56px) clamp(28px,4vw,48px)", marginTop: "28px", padding: "0 8px" }}>
        {ART_STORIES.map((story, index) => (
          <button
            key={story.id}
            type="button"
            className="art-deck"
            onClick={() => move({ story: index, image: 1 })}
            aria-label={`${t.open}: ${story.title[locale]} (${countLabel(story.count)})`}
          >
            <div className="art-deck-stack">
              {story.count >= 2 ? <div className="art-deck-layer art-deck-back" style={{ background: story.tone, borderColor: story.tone }} /> : null}
              {story.count >= 3 ? (
                <div className="art-deck-layer art-deck-mid">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={artImage(story.id, 2, true)} alt="" loading="lazy" decoding="async" />
                </div>
              ) : null}
              <div className="art-deck-layer art-deck-top">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={artImage(story.id, 1, true)} alt="" loading={index < 4 ? "eager" : "lazy"} decoding="async" />
              </div>
            </div>
            <div style={{ marginTop: "20px", fontFamily: "var(--font-fredoka)", fontWeight: 600, fontSize: "18px", lineHeight: 1.25 }}>{story.title[locale]}</div>
            <div style={{ marginTop: "6px", display: "inline-flex", alignItems: "center", gap: "7px", fontSize: "13.5px", fontWeight: 700, opacity: 0.65 }}>
              <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: story.tone }} />
              {countLabel(story.count)}
            </div>
          </button>
        ))}
      </div>

      {position ? <ArtViewer position={position} onMove={move} onClose={() => move(null)} /> : null}
    </div>
  );
}
