import Link from "next/link";
import NemaSupabase from "@/components/admin/NemaSupabase";
import { getSupabaseServer } from "@/lib/supabase-server";
import type { Objava } from "@/lib/types";

export default async function ObjavePage() {
  const supabase = await getSupabaseServer();
  if (!supabase) return <NemaSupabase />;

  const { data } = await supabase
    .from("objave")
    .select("*")
    .order("datum", { ascending: false });
  const objave = (data ?? []) as Objava[];

  return (
    <>
      <div className="adm-naslov">
        <h1>Objave</h1>
        <Link href="/admin/objave/novi" className="adm-dugme">+ Nova objava</Link>
      </div>

      <div className="adm-karta">
        {objave.length === 0 ? (
          <div className="adm-prazno">Još nema objava — napišite prvu.</div>
        ) : (
          <table className="adm-tabela">
            <thead>
              <tr>
                <th>NASLOV</th>
                <th>DATUM</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {objave.map((o) => (
                <tr key={o.id}>
                  <td>
                    <Link href={`/admin/objave/${o.id}`}>{o.naslov}</Link>
                  </td>
                  <td style={{ whiteSpace: "nowrap" }}>{o.datum}</td>
                  <td>
                    <span
                      className="adm-znacka"
                      style={
                        o.objavljena
                          ? { color: "#3E6B4A", background: "#E3EFE4" }
                          : { color: "#8A8378", background: "#EFEAE0" }
                      }
                    >
                      {o.objavljena ? "Objavljena" : "Skica"}
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
