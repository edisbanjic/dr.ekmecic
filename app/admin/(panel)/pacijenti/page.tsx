import Link from "next/link";
import NemaSupabase from "@/components/admin/NemaSupabase";
import { getSupabaseServer } from "@/lib/supabase-server";
import type { Pacijent } from "@/lib/types";

export default async function PacijentiPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const supabase = await getSupabaseServer();
  if (!supabase) return <NemaSupabase />;

  const { q } = await searchParams;
  let query = supabase.from("pacijenti").select("*").order("prezime").limit(200);
  if (q) {
    query = query.or(`ime.ilike.%${q}%,prezime.ilike.%${q}%,telefon.ilike.%${q}%`);
  }
  const { data } = await query;
  const pacijenti = (data ?? []) as Pacijent[];

  return (
    <>
      <div className="adm-naslov">
        <h1>Karton pacijenata</h1>
        <Link href="/admin/pacijenti/novi" className="adm-dugme">+ Novi pacijent</Link>
      </div>

      <form method="get" style={{ marginBottom: "16px", display: "flex", gap: "8px", maxWidth: "420px" }}>
        <input
          type="search"
          name="q"
          defaultValue={q ?? ""}
          placeholder="Pretraga po imenu, prezimenu ili telefonu…"
          style={{
            flex: 1, boxSizing: "border-box", padding: "11px 14px", borderRadius: "14px",
            border: "2px solid #EDE5D4", background: "#FDFBF6", fontSize: "14.5px",
          }}
        />
        <button type="submit" className="adm-dugme sekundarno malo">Traži</button>
      </form>

      <div className="adm-karta">
        {pacijenti.length === 0 ? (
          <div className="adm-prazno">
            {q ? "Nema rezultata za ovu pretragu." : "Kartoteka je još prazna — dodajte prvog pacijenta."}
          </div>
        ) : (
          <table className="adm-tabela">
            <thead>
              <tr>
                <th>PACIJENT</th>
                <th>TELEFON</th>
                <th>EMAIL</th>
                <th>DATUM ROĐENJA</th>
              </tr>
            </thead>
            <tbody>
              {pacijenti.map((p) => (
                <tr key={p.id}>
                  <td>
                    <Link href={`/admin/pacijenti/${p.id}`}>
                      {p.prezime}, {p.ime}
                    </Link>
                  </td>
                  <td>{p.telefon ?? "—"}</td>
                  <td>{p.email ?? "—"}</td>
                  <td>{p.datum_rodjenja ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
