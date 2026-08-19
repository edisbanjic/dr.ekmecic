import Link from "next/link";
import NoSupabase from "@/components/admin/NoSupabase";
import { getSupabaseServer } from "@/lib/supabase-server";
import type { Patient } from "@/lib/types";

export default async function PatientsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const supabase = await getSupabaseServer();
  if (!supabase) return <NoSupabase />;

  const { q } = await searchParams;
  let query = supabase
    .from("patients")
    .select("*, staff(first_name, last_name)")
    .order("last_name")
    .limit(200);
  if (q) {
    query = query.or(`first_name.ilike.%${q}%,last_name.ilike.%${q}%,phone.ilike.%${q}%`);
  }
  const { data } = await query;
  const patients = (data ?? []) as (Patient & {
    staff: { first_name: string; last_name: string } | null;
  })[];

  return (
    <>
      <div className="adm-heading">
        <h1>Karton pacijenata</h1>
        <Link href="/admin/patients/new" className="adm-btn">+ Novi pacijent</Link>
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
        <button type="submit" className="adm-btn secondary sm">Traži</button>
      </form>

      <div className="adm-card">
        {patients.length === 0 ? (
          <div className="adm-empty">
            {q ? "Nema rezultata za ovu pretragu." : "Kartoteka je još prazna — dodajte prvog pacijenta."}
          </div>
        ) : (
          <table className="adm-table">
            <thead>
              <tr>
                <th>PACIJENT</th>
                <th>PRIMARNI DOKTOR</th>
                <th>TELEFON</th>
                <th>EMAIL</th>
                <th>DATUM ROĐENJA</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p) => (
                <tr key={p.id}>
                  <td>
                    <Link href={`/admin/patients/${p.id}`}>
                      {p.last_name}, {p.first_name}
                    </Link>
                  </td>
                  <td>{p.staff ? `Dr. ${p.staff.first_name} ${p.staff.last_name}` : "—"}</td>
                  <td>{p.phone ?? "—"}</td>
                  <td>{p.email ?? "—"}</td>
                  <td>{p.date_of_birth ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
