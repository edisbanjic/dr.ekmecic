"use client";

import type { ReactNode } from "react";
import { useLocale } from "@/components/LocaleProvider";
import { getDict } from "@/lib/i18n";

/** Online booking is not live yet: shows the form blurred behind a "coming soon" card. */
export default function BookingComingSoon({ children }: { children: ReactNode }) {
  const dict = getDict(useLocale().locale);
  const t = dict.comingSoon;
  return (
    <div style={{ position: "relative" }}>
      <div
        aria-hidden="true"
        inert
        style={{ filter: "blur(3px)", opacity: ".5", pointerEvents: "none", userSelect: "none" }}
      >
        {children}
      </div>
      <div
        style={{
          position: "absolute",
          inset: "0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "12px",
        }}
      >
        <div
          style={{
            background: "#FFFFFF",
            border: "2px solid #F0E8D8",
            borderRadius: "28px",
            padding: "clamp(22px,3.5vw,32px)",
            maxWidth: "360px",
            textAlign: "center",
            boxShadow: "0 28px 56px -26px rgba(61,65,66,.5)",
            transform: "rotate(-2deg)",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "#FBE7DA",
              color: "#A05A42",
              borderRadius: "999px",
              padding: "7px 14px",
              fontFamily: "var(--font-fredoka)",
              fontWeight: "600",
              fontSize: "12px",
              letterSpacing: ".14em",
            }}
          >
            {t.badge} <span style={{ animation: "bling 2.4s ease-in-out infinite", display: "inline-block" }}>✦</span>
          </div>
          <div
            style={{
              margin: "14px 0 0",
              fontFamily: "var(--font-fredoka)",
              fontWeight: "700",
              fontSize: "clamp(24px,3vw,30px)",
              lineHeight: "1.1",
              color: "#3D4142",
            }}
          >
            {t.titlePre}
            <span style={{ color: "#5B8FD4" }}>{t.titleHighlight}</span>
          </div>
          <p style={{ margin: "12px 0 0", fontSize: "15px", lineHeight: "1.6", opacity: ".8", color: "#3D4142" }}>
            {t.text}
          </p>
          <a
            href="tel:+38737514771"
            className="hv1"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              marginTop: "18px",
              background: "#7EAEE8",
              color: "#243038",
              fontFamily: "var(--font-fredoka)",
              fontWeight: "600",
              fontSize: "16px",
              padding: "13px 24px",
              borderRadius: "999px",
              boxShadow: "0 14px 26px -12px rgba(126,174,232,.8)",
              transition: "transform .3s cubic-bezier(.34,1.56,.64,1)",
            }}
          >
            <svg viewBox="0 0 24 24" style={{ width: "18px", height: "18px" }} aria-hidden="true">
              <path
                d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
                fill="#243038"
              />
            </svg>
            {dict.phoneDisplay}
          </a>
        </div>
      </div>
    </div>
  );
}
