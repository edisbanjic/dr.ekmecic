import Link from "next/link";
import NemaSupabase from "@/components/admin/NemaSupabase";
import { getSupabaseServer } from "@/lib/supabase-server";
import type { Radnik } from "@/lib/types";

export default async function RadniciPage() {
  const supabase = await getSupabaseServer();
  if (!supabase) return <NemaSupabase />;

  const { data } = await supabase.from("radnici").select("*").order("prezime");
  const radnici = (data ?? []) as Radnik[];

  return (
    <>
      <div className="adm-naslov">
        <h1>Karton radnika</h1>
        <Link href="/admin/radnici/novi" className="adm-dugme">+ Novi radnik</Link>
      </div>

      <div className="adm-karta">
        {radnici.length === 0 ? (
          <div className="adm-prazno">Još nema unesenih radnika.</div>
        ) : (
          <table className="adm-tabela">
            <thead>
              <tr>
                <th>RADNIK</th>
                <th>ULOGA</th>
                <th>TELEFON</th>
                <th>EMAIL</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {radnici.map((r) => (
                <tr key={r.id}>
                  <td>
                    <Link href={`/admin/radnici/${r.id}`}>
                      {r.prezime}, {r.ime}
                    </Link>
                  </td>
                  <td>{r.uloga}</td>
                  <td>{r.telefon ?? "—"}</td>
                  <td>{r.email ?? "—"}</td>
                  <td>
                    <span
                      className="adm-znacka"
                      style={
                        r.aktivan
                          ? { color: "#3E6B4A", background: "#E3EFE4" }
                          : { color: "#8A8378", background: "#EFEAE0" }
                      }
                    >
                      {r.aktivan ? "Aktivan" : "Neaktivan"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
