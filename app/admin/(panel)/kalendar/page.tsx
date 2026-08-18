import Link from "next/link";
import { promijeniStatusTermina } from "@/app/admin/actions";
import NemaSupabase from "@/components/admin/NemaSupabase";
import { getDoktoriAdmin, getMojRadnik } from "@/lib/admin";
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
  searchParams: Promise<{ datum?: string; doktor?: string }>;
}) {
  const supabase = await getSupabaseServer();
  if (!supabase) return <NemaSupabase />;

  const { datum, doktor } = await searchParams;
  const [mojRadnik, doktori] = await Promise.all([
    getMojRadnik(supabase),
    getDoktoriAdmin(supabase),
  ]);

  // podrazumijevano: moji termini (ako sam povezan s kartonom radnika), inače svi
  const aktivniDoktor =
    doktor === "svi" ? null : doktor && doktori.some((d) => d.id === doktor) ? doktor : mojRadnik?.id ?? null;

  const ref = datum && /^\d{4}-\d{2}-\d{2}$/.test(datum) ? parseDatum(datum) : new Date();
  const pon = ponedjeljak(ref);
  const petak = new Date(pon);
  petak.setDate(petak.getDate() + 4);

  const prosla = new Date(pon);
  prosla.setDate(prosla.getDate() - 7);
  const sljedeca = new Date(pon);
  sljedeca.setDate(sljedeca.getDate() + 7);

  let query = supabase
    .from("termini")
    .select("*")
    .gte("datum", fmtDatum(pon))
    .lte("datum", fmtDatum(petak))
    .order("vrijeme");
  if (aktivniDoktor) query = query.eq("radnik_id", aktivniDoktor);

  // zahtjevi kod kojih je pacijent tražio da mu ordinacija predloži termin
  let bezDatumaQuery = supabase
    .from("termini")
    .select("*")
    .is("datum", null)
    .eq("status", "na_cekanju")
    .order("created_at");
  if (aktivniDoktor) bezDatumaQuery = bezDatumaQuery.eq("radnik_id", aktivniDoktor);

  const [{ data }, { data: bezDatumaData }] = await Promise.all([query, bezDatumaQuery]);
  const termini = (data ?? []) as Termin[];
  const bezDatuma = (bezDatumaData ?? []) as Termin[];

  const doktorIme = (id: string | null) => {
    const d = doktori.find((d) => d.id === id);
    return d ? `Dr. ${d.ime} ${d.prezime}` : null;
  };

  const linkZa = (datumIso: string | null, doktorParam: string) => {
    const p = new URLSearchParams();
    if (datumIso) p.set("datum", datumIso);
    p.set("doktor", doktorParam);
    return `/admin/kalendar?${p.toString()}`;
  };
  const trenutniDatum = datum && /^\d{4}-\d{2}-\d{2}$/.test(datum) ? datum : null;
  const trenutniDoktorParam = aktivniDoktor ?? "svi";

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
          <Link href={linkZa(fmtDatum(prosla), trenutniDoktorParam)} className="adm-dugme sekundarno malo">← prošla</Link>
          <Link href={linkZa(null, trenutniDoktorParam)} className="adm-dugme sekundarno malo">danas</Link>
          <Link href={linkZa(fmtDatum(sljedeca), trenutniDoktorParam)} className="adm-dugme sekundarno malo">sljedeća →</Link>
          <Link href="/admin/kalendar/novi" className="adm-dugme malo">+ Novi termin</Link>
        </div>
      </div>

      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center", marginBottom: "16px" }}>
        <span style={{ fontSize: "12.5px", fontWeight: 800, opacity: 0.55, letterSpacing: ".06em" }}>PRIKAZ:</span>
        <Link
          href={linkZa(trenutniDatum, "svi")}
          className="adm-dugme malo"
          style={aktivniDoktor === null ? {} : { background: "#FFFFFF", border: "2px solid #EDE5D4" }}
        >
          Svi doktori
        </Link>
        {doktori.map((d) => (
          <Link
            key={d.id}
            href={linkZa(trenutniDatum, d.id)}
            className="adm-dugme malo"
            style={aktivniDoktor === d.id ? {} : { background: "#FFFFFF", border: "2px solid #EDE5D4" }}
          >
            Dr. {d.ime} {d.prezime}
            {mojRadnik?.id === d.id ? " (ja)" : ""}
          </Link>
        ))}
      </div>

      {bezDatuma.length > 0 && (
        <div className="adm-karta" style={{ marginBottom: "20px", borderColor: "#F4A08A" }}>
          <h2 style={{ marginTop: 0, fontFamily: "var(--font-fredoka)", fontSize: "18px" }}>
            📞 Za dogovor — pacijent čeka vaš poziv ({bezDatuma.length})
          </h2>
          <table className="adm-tabela">
            <thead>
              <tr>
                <th>PACIJENT</th>
                <th>TELEFON</th>
                <th>USLUGA</th>
                <th>DOKTOR</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {bezDatuma.map((t) => (
                <tr key={t.id}>
                  <td style={{ fontWeight: 800 }}>{t.ime}</td>
                  <td>{t.telefon ?? "—"}</td>
                  <td>{t.usluga ?? "—"}</td>
                  <td>{doktorIme(t.radnik_id) ?? "—"}</td>
                  <td style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                    <div style={{ display: "inline-flex", gap: "6px" }}>
                      <Link href="/admin/kalendar/novi" className="adm-dugme sekundarno malo">
                        Zakaži
                      </Link>
                      <form action={promijeniStatusTermina.bind(null, t.id, "otkazan")} style={{ display: "inline" }}>
                        <button type="submit" className="adm-dugme opasno malo">Otkaži</button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p style={{ margin: "12px 0 0", fontSize: "13px", opacity: 0.6, fontWeight: 700 }}>
            Kad dogovorite termin telefonom: „Zakaži" kreira novi termin, a ovaj zahtjev zatim otkažite.
          </p>
        </div>
      )}

      <p style={{ marginTop: "0", marginBottom: "20px", fontWeight: 800, opacity: 0.6 }}>
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
                    <b>{t.vrijeme?.slice(0, 5)}</b> · {t.ime}
                    {!aktivniDoktor && doktorIme(t.radnik_id) && (
                      <div style={{ fontWeight: 800 }}>{doktorIme(t.radnik_id)}</div>
                    )}
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
