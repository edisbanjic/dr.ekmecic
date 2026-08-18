import Link from "next/link";
import NemaSupabase from "@/components/admin/NemaSupabase";
import { getDoktoriAdmin, getMojRadnik } from "@/lib/admin";
import { getSupabaseServer } from "@/lib/supabase-server";
import { fmtDatum, STATUSI } from "@/lib/termini";
import type { Termin } from "@/lib/types";

export default async function AdminPocetna({
  searchParams,
}: {
  searchParams: Promise<{ doktor?: string }>;
}) {
  const supabase = await getSupabaseServer();
  if (!supabase) return <NemaSupabase />;

  const { doktor } = await searchParams;
  const [mojRadnik, doktori] = await Promise.all([
    getMojRadnik(supabase),
    getDoktoriAdmin(supabase),
  ]);

  // podrazumijevano: moji današnji termini (ako sam povezan s kartonom), inače svi
  const aktivniDoktor =
    doktor === "svi" ? null : doktor && doktori.some((d) => d.id === doktor) ? doktor : mojRadnik?.id ?? null;

  const danas = fmtDatum(new Date());
  let danasnjiQuery = supabase
    .from("termini")
    .select("*")
    .eq("datum", danas)
    .neq("status", "otkazan")
    .order("vrijeme");
  if (aktivniDoktor) danasnjiQuery = danasnjiQuery.eq("radnik_id", aktivniDoktor);

  const [pacijenti, radnici, naCekanju, danasnji] = await Promise.all([
    supabase.from("pacijenti").select("id", { count: "exact", head: true }),
    supabase.from("radnici").select("id", { count: "exact", head: true }).eq("aktivan", true),
    supabase.from("termini").select("id", { count: "exact", head: true }).eq("status", "na_cekanju"),
    danasnjiQuery,
  ]);

  const termini = (danasnji.data ?? []) as Termin[];
  const doktorIme = (id: string | null) => {
    const d = doktori.find((d) => d.id === id);
    return d ? `Dr. ${d.ime} ${d.prezime}` : "—";
  };

  return (
    <>
      <div className="adm-naslov">
        <h1>
          Dobrodošli nazad{mojRadnik ? `, ${mojRadnik.ime}` : ""} 👋
        </h1>
        <Link href="/admin/kalendar/novi" className="adm-dugme">+ Novi termin</Link>
      </div>

      <div className="adm-stat">
        <div className="adm-karta">
          <b>{pacijenti.count ?? 0}</b>
          <span>pacijenata u kartoteci</span>
        </div>
        <div className="adm-karta">
          <b>{radnici.count ?? 0}</b>
          <span>aktivnih radnika</span>
        </div>
        <div className="adm-karta">
          <b>{naCekanju.count ?? 0}</b>
          <span>zahtjeva na čekanju</span>
        </div>
        <div className="adm-karta">
          <b>{termini.length}</b>
          <span>{aktivniDoktor ? "mojih termina danas" : "termina danas"}</span>
        </div>
      </div>

      <div className="adm-karta">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", flexWrap: "wrap" }}>
          <h2 style={{ margin: 0, fontFamily: "var(--font-fredoka)", fontSize: "20px" }}>
            Današnji termini{aktivniDoktor ? ` — ${doktorIme(aktivniDoktor)}` : " — svi doktori"}
          </h2>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            <Link
              href="/admin?doktor=svi"
              className="adm-dugme malo"
              style={aktivniDoktor === null ? {} : { background: "#FFFFFF", border: "2px solid #EDE5D4" }}
            >
              Svi
            </Link>
            {doktori.map((d) => (
              <Link
                key={d.id}
                href={`/admin?doktor=${d.id}`}
                className="adm-dugme malo"
                style={aktivniDoktor === d.id ? {} : { background: "#FFFFFF", border: "2px solid #EDE5D4" }}
              >
                Dr. {d.prezime}
                {mojRadnik?.id === d.id ? " (ja)" : ""}
              </Link>
            ))}
          </div>
        </div>
        {termini.length === 0 ? (
          <div className="adm-prazno">Danas nema zakazanih termina.</div>
        ) : (
          <table className="adm-tabela" style={{ marginTop: "10px" }}>
            <thead>
              <tr>
                <th>VRIJEME</th>
                <th>PACIJENT</th>
                <th>USLUGA</th>
                {!aktivniDoktor && <th>DOKTOR</th>}
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {termini.map((t) => {
                const st = STATUSI[t.status];
                return (
                  <tr key={t.id}>
                    <td style={{ fontWeight: 800 }}>{t.vrijeme?.slice(0, 5)}</td>
                    <td>{t.ime}</td>
                    <td>{t.usluga ?? "—"}</td>
                    {!aktivniDoktor && <td>{doktorIme(t.radnik_id)}</td>}
                    <td>
                      <span className="adm-znacka" style={{ color: st.boja, background: st.pozadina }}>
                        {st.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        <div style={{ marginTop: "14px" }}>
          <Link href="/admin/kalendar" className="adm-dugme sekundarno malo">Otvori kalendar →</Link>
        </div>
      </div>
    </>
  );
}
