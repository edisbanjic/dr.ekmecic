import { notFound } from "next/navigation";
import { noviZapis, obrisiPacijenta, obrisiZapis, urediPacijenta } from "@/app/admin/actions";
import ConfirmButton from "@/components/admin/ConfirmButton";
import NemaSupabase from "@/components/admin/NemaSupabase";
import PacijentPolja from "@/components/admin/PacijentPolja";
import { getSupabaseServer } from "@/lib/supabase-server";
import { fmtDatum, STATUSI } from "@/lib/termini";
import type { Pacijent, Radnik, Termin, Zapis } from "@/lib/types";

export default async function KartonPage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await getSupabaseServer();
  if (!supabase) return <NemaSupabase />;

  const { id } = await params;
  const [pacijentRes, zapisiRes, terminiRes, radniciRes] = await Promise.all([
    supabase.from("pacijenti").select("*").eq("id", id).maybeSingle(),
    supabase.from("zapisi").select("*").eq("pacijent_id", id).order("datum", { ascending: false }),
    supabase.from("termini").select("*").eq("pacijent_id", id).order("datum", { ascending: false }),
    supabase.from("radnici").select("*").eq("aktivan", true).order("prezime"),
  ]);

  const pacijent = pacijentRes.data as Pacijent | null;
  if (!pacijent) notFound();
  const zapisi = (zapisiRes.data ?? []) as Zapis[];
  const termini = (terminiRes.data ?? []) as Termin[];
  const radnici = (radniciRes.data ?? []) as Radnik[];
  const radnikIme = (rid: string | null) => {
    const r = radnici.find((r) => r.id === rid);
    return r ? `${r.ime} ${r.prezime}` : null;
  };

  return (
    <>
      <div className="adm-naslov">
        <h1>
          {pacijent.prezime}, {pacijent.ime}
        </h1>
        <ConfirmButton
          action={obrisiPacijenta.bind(null, pacijent.id)}
          poruka="Obrisati karton pacijenta? Brišu se i svi zapisi."
        >
          Obriši karton
        </ConfirmButton>
      </div>

      <div style={{ display: "grid", gap: "20px" }}>
        <div className="adm-karta">
          <h2 style={{ marginTop: 0, fontFamily: "var(--font-fredoka)", fontSize: "20px" }}>Podaci</h2>
          <form action={urediPacijenta.bind(null, pacijent.id)} className="adm-forma">
            <PacijentPolja p={pacijent} />
            <div className="puno">
              <button type="submit" className="adm-dugme">Spremi izmjene</button>
            </div>
          </form>
        </div>

        <div className="adm-karta">
          <h2 style={{ marginTop: 0, fontFamily: "var(--font-fredoka)", fontSize: "20px" }}>
            Zapisi u kartonu
          </h2>
          <form action={noviZapis.bind(null, pacijent.id)} className="adm-forma" style={{ marginBottom: "20px" }}>
            <label>
              <span>Datum</span>
              <input type="date" name="datum" defaultValue={fmtDatum(new Date())} />
            </label>
            <label>
              <span>Zub (opciono)</span>
              <input name="zub" placeholder="npr. 16" />
            </label>
            <label>
              <span>Radnik</span>
              <select name="radnik_id">
                <option value="">—</option>
                {radnici.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.prezime}, {r.ime}
                  </option>
                ))}
              </select>
            </label>
            <label className="puno">
              <span>Opis zahvata / nalaz</span>
              <textarea required name="opis" rows={2} placeholder="npr. Kompozitna plomba, okluzalno…" />
            </label>
            <div className="puno">
              <button type="submit" className="adm-dugme malo">+ Dodaj zapis</button>
            </div>
          </form>

          {zapisi.length === 0 ? (
            <div className="adm-prazno">Još nema zapisa u kartonu.</div>
          ) : (
            <table className="adm-tabela">
              <thead>
                <tr>
                  <th>DATUM</th>
                  <th>ZUB</th>
                  <th>OPIS</th>
                  <th>RADNIK</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {zapisi.map((z) => (
                  <tr key={z.id}>
                    <td style={{ whiteSpace: "nowrap", fontWeight: 800 }}>{z.datum}</td>
                    <td>{z.zub ?? "—"}</td>
                    <td>{z.opis}</td>
                    <td>{radnikIme(z.radnik_id) ?? "—"}</td>
                    <td style={{ textAlign: "right" }}>
                      <ConfirmButton
                        action={obrisiZapis.bind(null, pacijent.id, z.id)}
                        poruka="Obrisati ovaj zapis?"
                        className="adm-dugme opasno malo"
                      >
                        Obriši
                      </ConfirmButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="adm-karta">
          <h2 style={{ marginTop: 0, fontFamily: "var(--font-fredoka)", fontSize: "20px" }}>
            Historija termina
          </h2>
          {termini.length === 0 ? (
            <div className="adm-prazno">Nema termina povezanih s ovim kartonom.</div>
          ) : (
            <table className="adm-tabela">
              <thead>
                <tr>
                  <th>DATUM</th>
                  <th>VRIJEME</th>
                  <th>USLUGA</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {termini.map((t) => {
                  const st = STATUSI[t.status];
                  return (
                    <tr key={t.id}>
                      <td style={{ fontWeight: 800 }}>{t.datum}</td>
                      <td>{t.vrijeme.slice(0, 5)}</td>
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
        </div>
      </div>
    </>
  );
}
