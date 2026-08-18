/** Lagani okvir (header + footer) za podstranice poput /savjeti. */
export default function PodStranica({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: "#FBF8F1", display: "flex", flexDirection: "column" }}>
      <header style={{ background: "#F5F0E8", borderBottom: "2px solid rgba(61,65,66,.06)" }}>
        <div
          style={{
            maxWidth: "1240px", margin: "0 auto", display: "flex", alignItems: "center",
            gap: "26px", padding: "14px clamp(16px,4vw,32px)",
          }}
        >
          <a href="/" style={{ display: "flex", flexDirection: "column", lineHeight: 1, gap: "4px" }}>
            <span style={{ fontFamily: "var(--font-fredoka)", fontWeight: 700, fontSize: "22px", letterSpacing: ".02em", display: "inline-flex", alignItems: "center", gap: "4px" }}>
              <svg viewBox="0 0 100 100" style={{ width: "21px", height: "21px" }} aria-hidden="true">
                <path d="M50 5C31 5 15 15 15 34c0 13 6 21 10 33 3 9 3.5 23 12 23 8 0 6.5-16 13-16s5 16 13 16c8.5 0 9-14 12-23 4-12 10-20 10-33C85 15 69 5 50 5Z" fill="#7EAEE8" />
              </svg>
              DR. EKMEČIĆ
            </span>
            <span style={{ fontSize: "8px", fontWeight: 800, letterSpacing: ".34em", color: "#5B8FD4" }}>
              STOMATOLOŠKA ORDINACIJA
            </span>
          </a>
          <div style={{ marginLeft: "auto", display: "flex", gap: "14px", alignItems: "center" }}>
            <a href="/" style={{ fontWeight: 800, fontSize: "14px", opacity: 0.75 }}>← početna</a>
            <a
              href="/#zakazivanje"
              className="hv-cta"
              style={{
                background: "#7EAEE8", color: "#243038", fontFamily: "var(--font-fredoka)",
                fontWeight: 600, fontSize: "15px", padding: "10px 20px", borderRadius: "999px",
                transition: "transform .3s cubic-bezier(.34,1.56,.64,1)",
              }}
            >
              Zakaži termin
            </a>
          </div>
        </div>
      </header>
      <main style={{ flex: 1 }}>{children}</main>
      <footer style={{ background: "#3D4142", color: "#F5F0E8", padding: "22px 0", marginTop: "clamp(50px,7vw,80px)" }}>
        <div
          style={{
            maxWidth: "1240px", margin: "0 auto", padding: "0 clamp(16px,4vw,32px)",
            display: "flex", justifyContent: "space-between", gap: "16px", flexWrap: "wrap",
            fontSize: "13.5px", opacity: 0.75,
          }}
        >
          <span>© 2026 Opća stomatološka ordinacija, vl. dr. Kamala Ekmečić</span>
          <a href="tel:+38737514771" style={{ color: "#F5F0E8", fontWeight: 800 }}>037 514 771</a>
        </div>
      </footer>
    </div>
  );
}
