"use client";

import { BookingTrigger } from "@/components/BookingModal";
import LocationMap from "@/components/LocationMap";
import { useLocale } from "@/components/LocaleProvider";
import { CLINIC } from "@/lib/seo";
import { getDict, homeAnchor } from "@/lib/i18n";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { SiViber } from "react-icons/si";

const iconBtn = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "44px",
  height: "44px",
  borderRadius: "50%",
  border: "2px solid #EDE5D4",
  background: "#FFFFFF",
  transition: "transform .3s cubic-bezier(.34,1.56,.64,1)",
} as const;

/** Contact page markup — copy follows LocaleProvider for in-place language switching. */
export default function ContactPageView() {
  const { locale } = useLocale();
  const dict = getDict(locale);
  const t = dict.contactPage;
  const f = dict.footer;
  const h = dict.hours;

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "clamp(36px,5vw,60px) clamp(18px,4vw,32px) 0" }}>
      <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#E7F0FB", borderRadius: "999px", padding: "8px 16px", fontFamily: "var(--font-fredoka)", fontWeight: 600, fontSize: "12.5px", letterSpacing: ".14em", color: "#3E5F86" }}>
        {t.badge}
      </div>
      <h1 style={{ margin: "14px 0 0", fontFamily: "var(--font-fredoka)", fontWeight: 700, fontSize: "clamp(34px,5vw,52px)", lineHeight: 1.02 }}>
        {t.title}<span style={{ color: "#F4A08A" }}>.</span>
      </h1>
      <p style={{ margin: "12px 0 0", maxWidth: "480px", fontSize: "16.5px", lineHeight: 1.6, fontWeight: 600, opacity: 0.75 }}>
        {t.lead}
      </p>

      <div
        className="contact-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(260px,340px) minmax(0,1fr)",
          gap: "clamp(24px,3.5vw,40px)",
          alignItems: "start",
          marginTop: "clamp(26px,3.5vw,36px)",
        }}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: "0",
            background: "linear-gradient(180deg, #FFFFFF 0%, #FFFCF7 100%)",
            border: "2px solid #F1E8D7",
            borderRadius: "30px",
            padding: "clamp(24px,3.2vw,32px)",
            boxShadow: "0 26px 46px -30px rgba(61,65,66,.28)",
          }}
        >
          <span style={{ position: "absolute", top: "22px", right: "26px", color: "#F4A08A", fontSize: "16px" }}>✦</span>

          <a
            href={`tel:${CLINIC.phone}`}
            className="hv9"
            style={{
              display: "block",
              fontFamily: "var(--font-fredoka)",
              fontWeight: 700,
              fontSize: "clamp(28px,4vw,34px)",
              lineHeight: 1.1,
              color: "#3D4142",
              textDecoration: "none",
              letterSpacing: "-0.01em",
              transition: "transform .3s cubic-bezier(.34,1.56,.64,1)",
            }}
          >
            {dict.phoneDisplay}
          </a>
          <p style={{ margin: "6px 0 0", fontSize: "13.5px", fontWeight: 600, opacity: 0.55 }}>
            {t.phoneLabel}
          </p>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center", marginTop: "18px" }}>
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
                fontSize: "15px",
                padding: "12px 20px",
                borderRadius: "999px",
                transition: "transform .3s cubic-bezier(.34,1.56,.64,1)",
              }}
            >
              {t.bookCta}
            </BookingTrigger>
            <div style={{ display: "inline-flex", gap: "8px" }}>
              <a href={`viber://chat?number=%2B${CLINIC.phone.replace("+", "")}`} aria-label={t.viber} title={t.viber} className="hv10" style={iconBtn}>
                <SiViber size={20} color="#7B5CDB" />
              </a>
              <a href={`https://wa.me/${CLINIC.phone.replace("+", "")}`} aria-label={t.whatsapp} title={t.whatsapp} className="hv10" style={iconBtn}>
                <FaWhatsapp size={20} color="#2FA84A" />
              </a>
              <a href={CLINIC.facebook} target="_blank" rel="noopener noreferrer" aria-label={t.facebook} title={t.facebook} className="hv10" style={iconBtn}>
                <FaFacebookF size={18} color="#3E5F86" />
              </a>
            </div>
          </div>

          <div
            style={{
              marginTop: "26px",
              paddingTop: "22px",
              display: "grid",
              gap: "14px",
              borderTop: "1.5px solid rgba(61,65,66,.1)",
            }}
          >
            <div style={{ display: "grid", gap: "4px" }}>
              <span style={{ fontSize: "12px", fontWeight: 800, letterSpacing: ".06em", color: "#5B8FD4", textTransform: "uppercase" as const }}>
                {t.emailLabel}
              </span>
              <a
                href={`mailto:${CLINIC.email}`}
                style={{ fontWeight: 700, fontSize: "15px", color: "#3D4142", textDecoration: "underline", textUnderlineOffset: "3px", wordBreak: "break-word", lineHeight: 1.4 }}
              >
                {CLINIC.email}
              </a>
            </div>
            <div style={{ display: "grid", gap: "4px" }}>
              <span style={{ fontSize: "12px", fontWeight: 800, letterSpacing: ".06em", color: "#5B8FD4", textTransform: "uppercase" as const }}>
                {t.addressLabel}
              </span>
              <span style={{ fontSize: "15px", fontWeight: 600, lineHeight: 1.45, opacity: 0.88 }}>
                {f.addressLine1} {f.addressLine2}
              </span>
            </div>
          </div>
        </div>

        <LocationMap variant="page" />
      </div>

      <div
        style={{
          position: "relative",
          marginTop: "clamp(36px,5vw,56px)",
          background: "#3D4142",
          color: "#F5F0E8",
          borderRadius: "36px",
          padding: "clamp(26px,4vw,38px) clamp(24px,4vw,42px)",
          transform: "rotate(-.4deg)",
          boxShadow: "0 36px 64px -32px rgba(61,65,66,.5)",
        }}
      >
        <span style={{ position: "absolute", top: "-16px", right: "40px", width: "46px", transform: "rotate(14deg)" }}>
          <span style={{ display: "block", animation: "floatY 7s ease-in-out infinite" }}>
            <svg viewBox="0 0 100 100" style={{ width: "100%", display: "block" }}>
              <path
                d="M50 5C31 5 15 15 15 34c0 13 6 21 10 33 3 9 3.5 23 12 23 8 0 6.5-16 13-16s5 16 13 16c8.5 0 9-14 12-23 4-12 10-20 10-33C85 15 69 5 50 5Z"
                fill="#7EAEE8"
              />
            </svg>
          </span>
        </span>
        <span style={{ position: "absolute", left: "-8px", bottom: "44px", fontSize: "22px", color: "#F4A08A", animation: "floatB 6.5s ease-in-out infinite" }}>
          ✦
        </span>

        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
          <h2 style={{ margin: 0, fontFamily: "var(--font-fredoka)", fontWeight: 600, fontSize: "clamp(21px,3vw,27px)" }}>
            {h.title}
          </h2>
          <a
            href={homeAnchor(locale, "hours", false)}
            style={{ color: "#7EAEE8", fontWeight: 800, fontSize: "14px", textDecoration: "underline", textUnderlineOffset: "3px" }}
          >
            {t.hoursText} →
          </a>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))",
            gap: "12px",
            marginTop: "20px",
          }}
        >
          <div style={{ padding: "16px 18px", borderRadius: "18px", background: "rgba(245,240,232,.07)" }}>
            <div style={{ fontSize: "13.5px", fontWeight: 600, opacity: 0.65 }}>{h.monWed}</div>
            <div style={{ marginTop: "4px", fontFamily: "var(--font-fredoka)", fontWeight: 600, fontSize: "clamp(17px,2vw,20px)" }}>
              08:00 – 16:00
            </div>
          </div>
          <div style={{ padding: "16px 18px", borderRadius: "18px", background: "#7EAEE8", color: "#243038", boxShadow: "0 14px 28px -16px rgba(126,174,232,.9)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
              <span style={{ fontSize: "13.5px", fontWeight: 700 }}>{h.thursday}</span>
              <span style={{ background: "#FFFFFF", borderRadius: "999px", padding: "2px 9px", fontSize: "10.5px", letterSpacing: ".1em", fontWeight: 700 }}>
                {h.thursdayTag}
              </span>
            </div>
            <div style={{ marginTop: "4px", fontFamily: "var(--font-fredoka)", fontWeight: 600, fontSize: "clamp(17px,2vw,20px)" }}>
              10:00 – 18:00
            </div>
          </div>
          <div style={{ padding: "16px 18px", borderRadius: "18px", background: "rgba(245,240,232,.07)" }}>
            <div style={{ fontSize: "13.5px", fontWeight: 600, opacity: 0.65 }}>{h.friday}</div>
            <div style={{ marginTop: "4px", fontFamily: "var(--font-fredoka)", fontWeight: 600, fontSize: "clamp(17px,2vw,20px)" }}>
              08:00 – 16:00
            </div>
          </div>
          <div style={{ padding: "16px 18px", borderRadius: "18px", background: "rgba(245,240,232,.07)" }}>
            <div style={{ fontSize: "13.5px", fontWeight: 600, opacity: 0.65 }}>{h.weekend}</div>
            <div style={{ marginTop: "4px", fontFamily: "var(--font-shantell)", fontWeight: 600, fontSize: "clamp(16px,2vw,18px)", color: "#F4A08A" }}>
              {h.closed}
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: "16px",
            paddingTop: "14px",
            borderTop: "1px solid rgba(245,240,232,.15)",
            fontSize: "14px",
            opacity: 0.75,
            display: "flex",
            gap: "8px",
            alignItems: "baseline",
          }}
        >
          <span style={{ color: "#7EAEE8" }}>✦</span>
          {h.tip}
        </div>
      </div>
    </div>
  );
}
