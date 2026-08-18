import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PodStranica from "@/components/PodStranica";
import { getObjava, lijepDatum, pasusi } from "@/lib/objave";

export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const objava = await getObjava(slug);
  if (!objava) return { title: "Objava nije pronađena — Dr. Ekmečić" };
  return {
    title: `${objava.naslov} — Dr. Ekmečić`,
    description: objava.sazetak ?? undefined,
  };
}

export default async function ObjavaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const objava = await getObjava(slug);
  if (!objava) notFound();

  return (
    <PodStranica>
      <article style={{ maxWidth: "720px", margin: "0 auto", padding: "clamp(40px,6vw,70px) clamp(18px,4vw,32px) 0" }}>
        <a href="/savjeti" style={{ fontWeight: 800, fontSize: "14px", color: "#3E5F86" }}>
          ← Svi savjeti
        </a>
        <div style={{ marginTop: "22px", fontFamily: "var(--font-shantell)", fontWeight: 500, fontSize: "15px", color: "#5B8FD4" }}>
          {lijepDatum(objava.datum)}
        </div>
        <h1 style={{ margin: "10px 0 0", fontFamily: "var(--font-fredoka)", fontWeight: 700, fontSize: "clamp(30px,5vw,48px)", lineHeight: 1.06, letterSpacing: "-.01em" }}>
          {objava.naslov}
        </h1>
        {objava.sazetak && (
          <p style={{ margin: "18px 0 0", fontSize: "18px", lineHeight: 1.6, fontWeight: 700, opacity: 0.75 }}>
            {objava.sazetak}
          </p>
        )}
        <div style={{ marginTop: "26px", borderTop: "2px solid rgba(61,65,66,.08)", paddingTop: "26px" }}>
          {pasusi(objava.sadrzaj).map((p, i) => (
            <p key={i} style={{ margin: "0 0 18px", fontSize: "16.5px", lineHeight: 1.75, fontWeight: 600, opacity: 0.9 }}>
              {p}
            </p>
          ))}
        </div>
        <a
          href="/#zakazivanje"
          className="hv-cta"
          style={{
            display: "inline-block", marginTop: "14px", background: "#7EAEE8", color: "#243038",
            fontFamily: "var(--font-fredoka)", fontWeight: 600, fontSize: "16px",
            padding: "13px 26px", borderRadius: "999px",
            boxShadow: "0 14px 26px -12px rgba(126,174,232,.8)",
            transition: "transform .3s cubic-bezier(.34,1.56,.64,1)",
          }}
        >
          Zakaži termin →
        </a>
      </article>
    </PodStranica>
  );
}
