import Link from "next/link";
import { promijeniStatusTermina } from "@/app/admin/actions";
import NemaSupabase from "@/components/admin/NemaSupabase";
import { getSupabaseServer } from "@/lib/supabase-server";
import { DANI, fmtDatum, MJESECI, parseDatum, STATUSI } from "@/lib/termini";
import type { Termin } from "@/lib/types";

function ponedjeljak(d: Date): Date {
  const r = new Date(d);
  r.setHours(0, 0, 0, 0);
  r.setDate(r.getDate() - ((r.getDay() + 6) % 7));
  return r;
}

export default async function KalendarPage({
  searchParams,
}: {
  searchParams: Promise<{ datum?: string }>;
}) {
  const supabase = await getSupabaseServer();
  if (!supabase) return <NemaSupabase />;

  const { datum } = await searchParams;
  const ref = datum && /^\d{4}-\d{2}-\d{2}$/.test(datum) ? parseDatum(datum) : new Date();
  const pon = ponedjeljak(ref);
  const petak = new Date(pon);
  petak.setDate(petak.getDate() + 4);

  const prosla = new Date(pon);
  prosla.setDate(prosla.getDate() - 7);
  const sljedeca = new Date(pon);
  sljedeca.setDate(sljedeca.getDate() + 7);

  const { data } = await supabase
    .from("termini")
    .select("*")
    .gte("datum", fmtDatum(pon))
    .lte("datum", fmtDatum(petak))
    .order("vrijeme");
  const termini = (data ?? []) as Termin[];

  const danasIso = fmtDatum(new Date());
  const dani = Array.from({ length: 5 }, (_, i) => {
    const d = new Date(pon);
    d.setDate(d.getDate() + i);
    return d;
  });

  return (
    <>
      <div className="adm-naslov">
        <h1>Kalendar termina</h1>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <Link href={`/admin/kalendar?datum=${fmtDatum(prosla)}`} className="adm-dugme sekundarno malo">← prošla</Link>
          <Link href="/admin/kalendar" className="adm-dugme sekundarno malo">danas</Link>
          <Link href={`/admin/kalendar?datum=${fmtDatum(sljedeca)}`} className="adm-dugme sekundarno malo">sljedeća →</Link>
          <Link href="/admin/kalendar/novi" className="adm-dugme malo">+ Novi termin</Link>
        </div>
      </div>

      <p style={{ marginTop: "-10px", marginBottom: "20px", fontWeight: 800, opacity: 0.6 }}>
        {pon.getDate()}. {MJESECI[pon.getMonth()].toLowerCase()} – {petak.getDate()}.{" "}
        {MJESECI[petak.getMonth()].toLowerCase()} {petak.getFullYear()}.
      </p>

      <div className="adm-kal">
        {dani.map((d) => {
          const iso = fmtDatum(d);
          const dnevni = termini.filter((t) => t.datum === iso);
          return (
            <div key={iso} className={"adm-kal-dan" + (iso === danasIso ? " danas" : "")}>
              <h3>
                {DANI[(d.getDay() + 6) % 7]}
                <small>{d.getDate()}. {MJESECI[d.getMonth()].toLowerCase()}</small>
              </h3>
              {dnevni.length === 0 && (
                <div style={{ fontSize: "12.5px", opacity: 0.4, fontWeight: 700 }}>Nema termina</div>
              )}
              {dnevni.map((t) => {
                const st = STATUSI[t.status];
                return (
                  <div key={t.id} className="adm-termin" style={{ background: st.pozadina, color: st.boja }}>
                    <b>{t.vrijeme.slice(0, 5)}</b> · {t.ime}
                    {t.usluga && <div style={{ opacity: 0.8 }}>{t.usluga}</div>}
                    {t.telefon && <div style={{ opacity: 0.8 }}>{t.telefon}</div>}
                    <div style={{ marginTop: "4px", fontSize: "11px", fontWeight: 800, letterSpacing: ".04em" }}>
                      {st.label.toUpperCase()}
                    </div>
                    {t.status !== "otkazan" && t.status !== "zavrsen" && (
                      <div className="akcije">
                        {t.status === "na_cekanju" && (
                          <form action={promijeniStatusTermina.bind(null, t.id, "potvrdjen")}>
                            <button type="submit">Potvrdi</button>
                          </form>
                        )}
                        {t.status === "potvrdjen" && (
                          <form action={promijeniStatusTermina.bind(null, t.id, "zavrsen")}>
                            <button type="submit">Završi</button>
                          </form>
                        )}
                        <form action={promijeniStatusTermina.bind(null, t.id, "otkazan")}>
                          <button type="submit">Otkaži</button>
                        </form>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
}
