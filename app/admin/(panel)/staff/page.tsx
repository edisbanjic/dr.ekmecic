import Link from "next/link";
import NoSupabase from "@/components/admin/NoSupabase";
import { getSupabaseServer } from "@/lib/supabase-server";
import type { Staff } from "@/lib/types";

export default async function StaffPage() {
  const supabase = await getSupabaseServer();
  if (!supabase) return <NoSupabase />;

  const { data } = await supabase.from("staff").select("*").order("last_name");
  const staff = (data ?? []) as Staff[];

  return (
    <>
      <div className="adm-heading">
        <h1>Karton radnika</h1>
        <Link href="/admin/staff/new" className="adm-btn">+ Novi radnik</Link>
      </div>

      <div className="adm-card">
        {staff.length === 0 ? (
          <div className="adm-empty">Još nema unesenih radnika.</div>
        ) : (
          <table className="adm-table">
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
              {staff.map((r) => (
                <tr key={r.id}>
                  <td>
                    <Link href={`/admin/staff/${r.id}`}>
                      {r.last_name}, {r.first_name}
                    </Link>
                  </td>
                  <td>{r.role}</td>
                  <td>{r.phone ?? "—"}</td>
                  <td>{r.email ?? "—"}</td>
                  <td>
                    <span
                      className="adm-badge"
                      style={
                        r.active
                          ? { color: "#3E6B4A", background: "#E3EFE4" }
                          : { color: "#8A8378", background: "#EFEAE0" }
                      }
                    >
                      {r.active ? "Aktivan" : "Neaktivan"}
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
