"use client";

import { useState } from "react";

const ITEMS = [
  {
    q: "Da li popravka zuba boli?",
    a: "Iskreno — ne. Koristimo modernu anesteziju i tehnike koje popravku čine gotovo neprimjetnom. A ako vam ikad zatreba pauza, samo podignite ruku — stajemo odmah.",
    delay: 0,
  },
  {
    q: "Šta me čeka na prvom pregledu?",
    a: "Upoznajemo vas i vaše zube: detaljan pregled, snimak po potrebi i jasan plan liječenja s cijenama. Bez obaveza i bez iznenađenja.",
    delay: 70,
  },
  {
    q: "Radite li s djecom?",
    a: "Naravno — dječija stomatologija je naša posebna ljubav. Prvi posjet pretvaramo u igru: dijete upoznaje ordinaciju, „vozi se“ u stolici i dobija nagradu za hrabrost.",
    delay: 140,
  },
  {
    q: "Kako mogu platiti?",
    a: "Gotovinom ili karticom, kako vam odgovara. Za veće zahvate uvijek se možemo dogovoriti o plaćanju u više rata — pitajte bez ustručavanja.",
    delay: 210,
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div id="faq-list">
      {ITEMS.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.q}
            data-reveal=""
            data-delay={item.delay}
            style={{
              background: isOpen ? "#FDF9F0" : "#FFFFFF",
              border: "2px solid #EFE7D6",
              borderRadius: "22px",
              marginBottom: "14px",
              transition: "background .3s ease",
            }}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "16px",
                padding: "20px 24px",
                cursor: "pointer",
                width: "100%",
                background: "none",
                border: "none",
                textAlign: "left",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-fredoka)",
                  fontWeight: 600,
                  fontSize: "clamp(17px,2.4vw,20px)",
                }}
              >
                {item.q}
              </div>
              <div
                aria-hidden="true"
                style={{
                  flex: "0 0 auto",
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "#7EAEE8",
                  color: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "22px",
                  fontWeight: 700,
                  lineHeight: 1,
                  transition: "transform .45s cubic-bezier(.34,1.56,.64,1)",
                  transform: isOpen ? "rotate(135deg)" : "rotate(0deg)",
                }}
              >
                +
              </div>
            </button>
            <div
              style={{
                display: "grid",
                gridTemplateRows: isOpen ? "1fr" : "0fr",
                transition: "grid-template-rows .5s cubic-bezier(.22,1,.36,1)",
              }}
            >
              <div style={{ overflow: "hidden" }}>
                <p
                  style={{
                    margin: 0,
                    padding: "0 24px 22px",
                    fontSize: "15.5px",
                    lineHeight: 1.65,
                    opacity: 0.85,
                  }}
                >
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
