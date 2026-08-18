import Link from "next/link";
import NemaSupabase from "@/components/admin/NemaSupabase";
import { getSupabaseServer } from "@/lib/supabase-server";
import { fmtDatum, STATUSI } from "@/lib/termini";
import type { Termin } from "@/lib/types";

export default async function AdminPocetna() {
  const supabase = await getSupabaseServer();
  if (!supabase) return <NemaSupabase />;

  const danas = fmtDatum(new Date());
  const [pacijenti, radnici, naCekanju, danasnji] = await Promise.all([
    supabase.from("pacijenti").select("id", { count: "exact", head: true }),
    supabase.from("radnici").select("id", { count: "exact", head: true }).eq("aktivan", true),
    supabase.from("termini").select("id", { count: "exact", head: true }).eq("status", "na_cekanju"),
    supabase
      .from("termini")
      .select("*")
      .eq("datum", danas)
      .neq("status", "otkazan")
      .order("vrijeme"),
  ]);

  const termini = (danasnji.data ?? []) as Termin[];

  return (
    <>
      <div className="adm-naslov">
        <h1>Dobrodošli nazad 👋</h1>
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
          <span>termina danas</span>
        </div>
      </div>

      <div className="adm-karta">
        <h2 style={{ marginTop: 0, fontFamily: "var(--font-fredoka)", fontSize: "20px" }}>
          Današnji termini
        </h2>
        {termini.length === 0 ? (
          <div className="adm-prazno">Danas nema zakazanih termina.</div>
        ) : (
          <table className="adm-tabela">
            <thead>
              <tr>
                <th>VRIJEME</th>
                <th>PACIJENT</th>
                <th>USLUGA</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {termini.map((t) => {
                const st = STATUSI[t.status];
                return (
                  <tr key={t.id}>
                    <td style={{ fontWeight: 800 }}>{t.vrijeme.slice(0, 5)}</td>
                    <td>{t.ime}</td>
                    <td>{t.usluga ?? "—"}</td>
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
