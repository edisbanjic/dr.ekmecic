import type { Metadata } from "next";
import PodStranica from "@/components/PodStranica";
import { getObjave, lijepDatum } from "@/lib/objave";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Kutak za osmijeh — Dr. Ekmečić",
  description: "Savjeti i novosti iz stomatološke ordinacije dr. Ekmečić, Cazin.",
};

export default async function SavjetiPage() {
  const objave = await getObjave();

  return (
    <PodStranica>
      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "clamp(40px,6vw,70px) clamp(18px,4vw,32px) 0" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#E7F0FB", borderRadius: "999px", padding: "8px 16px", fontFamily: "var(--font-fredoka)", fontWeight: 600, fontSize: "12.5px", letterSpacing: ".14em", color: "#3E5F86" }}>
          SAVJETI I NOVOSTI
        </div>
        <h1 style={{ margin: "16px 0 0", fontFamily: "var(--font-fredoka)", fontWeight: 700, fontSize: "clamp(36px,5.6vw,56px)", lineHeight: 1.02 }}>
          Kutak za osmijeh<span style={{ color: "#F4A08A" }}>.</span>
        </h1>

        {objave.length === 0 ? (
          <p style={{ marginTop: "28px", fontWeight: 700, opacity: 0.6 }}>
            Uskoro — prvi savjeti su u pripremi. <span style={{ color: "#F4A08A" }}>✦</span>
          </p>
        ) : (
          <div style={{ display: "grid", gap: "18px", marginTop: "clamp(28px,4vw,44px)" }}>
            {objave.map((o, i) => (
              <a
                key={o.id}
                href={`/savjeti/${o.slug}`}
                style={{
                  display: "block", background: "#FFFFFF", borderRadius: "26px",
                  padding: "24px 28px", boxShadow: "0 22px 40px -24px rgba(61,65,66,.3)",
                  transform: `rotate(${i % 2 === 0 ? "-.4deg" : ".4deg"})`,
                  transition: "transform .3s cubic-bezier(.34,1.56,.64,1)",
                }}
                className="hv-cta"
              >
                <div style={{ fontFamily: "var(--font-shantell)", fontWeight: 500, fontSize: "14px", color: "#5B8FD4" }}>
                  {lijepDatum(o.datum)}
                </div>
                <h2 style={{ margin: "8px 0 6px", fontFamily: "var(--font-fredoka)", fontWeight: 600, fontSize: "clamp(20px,3vw,26px)", lineHeight: 1.15 }}>
                  {o.naslov}
                </h2>
                {o.sazetak && (
                  <p style={{ margin: 0, fontSize: "15.5px", lineHeight: 1.6, opacity: 0.8, fontWeight: 600 }}>
                    {o.sazetak}
                  </p>
                )}
                <span style={{ display: "inline-block", marginTop: "12px", fontWeight: 800, fontSize: "14px", color: "#3E5F86" }}>
                  Pročitaj više →
                </span>
              </a>
            ))}
          </div>
        )}
      </div>
    </PodStranica>
  );
}
