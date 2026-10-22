"use client";

import { useEffect, useRef } from "react";
import { useLocale } from "@/components/LocaleProvider";
import { ART_STORIES, artImage } from "@/lib/art";
import { getDict } from "@/lib/i18n";

export type ArtPosition = { story: number; image: number };

/** Full-screen, Instagram-style viewer: segments on top, tap/swipe/arrow keys to move through stories. */
export default function ArtViewer({
  position,
  onMove,
  onClose,
}: {
  position: ArtPosition;
  onMove: (next: ArtPosition) => void;
  onClose: () => void;
}) {
  const { locale } = useLocale();
  const t = getDict(locale).art;
  const story = ART_STORIES[position.story];
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);

  const isFirst = position.story === 0 && position.image === 1;
  const isLast = position.story === ART_STORIES.length - 1 && position.image === story.count;
  const atStoryEnd = position.image === story.count && position.story < ART_STORIES.length - 1;

  const next = () => {
    if (position.image < story.count) onMove({ story: position.story, image: position.image + 1 });
    else if (position.story < ART_STORIES.length - 1) onMove({ story: position.story + 1, image: 1 });
  };
  const prev = () => {
    if (position.image > 1) onMove({ story: position.story, image: position.image - 1 });
    else if (position.story > 0) onMove({ story: position.story - 1, image: ART_STORIES[position.story - 1].count });
  };

  useEffect(() => {
    closeRef.current?.focus();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  // Warm the cache for the next image so swiping feels instant.
  useEffect(() => {
    const following =
      position.image < story.count
        ? artImage(story.id, position.image + 1)
        : position.story < ART_STORIES.length - 1
          ? artImage(ART_STORIES[position.story + 1].id, 1)
          : null;
    if (following) new Image().src = following;
  }, [position, story]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t.viewerLabel}
      onClick={onClose}
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (dx < -50) next();
        else if (dx > 50) prev();
      }}
      style={{
        position: "fixed",
        inset: "0",
        zIndex: 1000,
        background: "rgba(36,40,41,.94)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "14px clamp(12px,3vw,28px) 18px",
        color: "#FFFFFF",
      }}
    >
      <div onClick={(e) => e.stopPropagation()} style={{ width: "100%", maxWidth: "560px" }}>
        <div style={{ display: "flex", gap: "5px" }}>
          {Array.from({ length: story.count }, (_, i) => (
            <span key={i} style={{ flex: "1", height: "4px", borderRadius: "4px", background: "rgba(255,255,255,.25)", overflow: "hidden" }}>
              <span
                key={`${position.story}-${position.image}-${i}`}
                style={{
                  display: "block",
                  height: "100%",
                  background: story.tone,
                  transformOrigin: "left",
                  transform: i + 1 < position.image ? "scaleX(1)" : "scaleX(0)",
                  animation: i + 1 === position.image ? "artProgress .5s ease-out forwards" : undefined,
                }}
              />
            </span>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", marginTop: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0 }}>
            <span style={{ flex: "0 0 auto", width: "34px", height: "34px", borderRadius: "50%", background: story.tone, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-fredoka)", fontWeight: 700, fontSize: "15px", color: "#243038" }}>
              Z
            </span>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontFamily: "var(--font-fredoka)", fontWeight: 600, fontSize: "16px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {story.title[locale]}
              </div>
              <div style={{ fontFamily: "var(--font-shantell)", fontSize: "13px", opacity: 0.7 }}>
                {t.signature} · {position.image}/{story.count}
              </div>
            </div>
          </div>
          <button ref={closeRef} type="button" className="art-nav-btn" aria-label={t.close} onClick={onClose} style={{ width: "40px", height: "40px", fontSize: "24px" }}>
            ×
          </button>
        </div>
      </div>

      <div style={{ flex: "1", minHeight: 0, width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "clamp(8px,2vw,24px)", marginTop: "14px" }}>
        <button type="button" className="art-nav-btn art-viewer-side" aria-label={t.prev} disabled={isFirst} onClick={(e) => { e.stopPropagation(); prev(); }}>
          ‹
        </button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={`${story.id}-${position.image}`}
          src={artImage(story.id, position.image)}
          alt={`${story.title[locale]} (${position.image}/${story.count})`}
          onClick={(e) => {
            e.stopPropagation();
            const box = e.currentTarget.getBoundingClientRect();
            if (e.clientX - box.left < box.width / 3) prev();
            else next();
          }}
          style={{
            maxHeight: "100%",
            maxWidth: "min(100%, 560px)",
            minWidth: 0,
            objectFit: "contain",
            borderRadius: "16px",
            boxShadow: "0 30px 70px -30px rgba(0,0,0,.7)",
            animation: "artViewerIn .3s ease-out",
            cursor: "pointer",
            userSelect: "none",
          }}
        />
        <button type="button" className="art-nav-btn art-viewer-side" aria-label={t.next} disabled={isLast} onClick={(e) => { e.stopPropagation(); next(); }}>
          ›
        </button>
      </div>

      <div style={{ height: "44px", marginTop: "12px", display: "flex", alignItems: "center" }}>
        {atStoryEnd ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            style={{ border: 0, cursor: "pointer", background: "#FFFFFF", color: "#3D4142", fontFamily: "var(--font-fredoka)", fontWeight: 600, fontSize: "15px", padding: "11px 20px", borderRadius: "999px", maxWidth: "calc(100vw - 32px)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
          >
            {t.nextStory}: {ART_STORIES[position.story + 1].title[locale]} →
          </button>
        ) : null}
      </div>
    </div>
  );
}
