import Link from "next/link";
import NoSupabase from "@/components/admin/NoSupabase";
import { getDoctorsAdmin, getMyStaff } from "@/lib/admin";
import { getSupabaseServer } from "@/lib/supabase-server";
import { formatDate, STATUSES } from "@/lib/appointments";
import type { Appointment } from "@/lib/types";
import { fullName } from "@/lib/types";

export default async function AdminHome({
  searchParams,
}: {
  searchParams: Promise<{ doctor?: string }>;
}) {
  const supabase = await getSupabaseServer();
  if (!supabase) return <NoSupabase />;

  const { doctor } = await searchParams;
  const [myStaff, doctors] = await Promise.all([
    getMyStaff(supabase),
    getDoctorsAdmin(supabase),
  ]);

  // default: my today's appointments (if linked to a record), otherwise all
  const activeDoctor =
    doctor === "all" ? null : doctor && doctors.some((d) => d.id === doctor) ? doctor : myStaff?.id ?? null;

  const today = formatDate(new Date());
  let todayQuery = supabase
    .from("appointments")
    .select("*")
    .eq("date", today)
    .neq("status", "cancelled")
    .order("time");
  if (activeDoctor) todayQuery = todayQuery.eq("staff_id", activeDoctor);

  const [patients, staff, pending, todayRes] = await Promise.all([
    supabase.from("patients").select("id", { count: "exact", head: true }),
    supabase.from("staff").select("id", { count: "exact", head: true }).eq("active", true),
    supabase.from("appointments").select("id", { count: "exact", head: true }).eq("status", "pending"),
    todayQuery,
  ]);

  const appointments = (todayRes.data ?? []) as Appointment[];
  const doctorName = (id: string | null) => {
    const d = doctors.find((d) => d.id === id);
    return d ? `Dr. ${fullName(d)}` : "—";
  };

  return (
    <>
      <div className="adm-heading">
        <h1>
          Dobrodošli nazad{myStaff ? `, ${myStaff.first_name}` : ""} 👋
        </h1>
        <Link href="/admin/calendar/new" className="adm-btn">+ Novi termin</Link>
      </div>

      <div className="adm-stat">
        <div className="adm-card">
          <b>{patients.count ?? 0}</b>
          <span>pacijenata u kartoteci</span>
        </div>
        <div className="adm-card">
          <b>{staff.count ?? 0}</b>
          <span>aktivnih radnika</span>
        </div>
        <div className="adm-card">
          <b>{pending.count ?? 0}</b>
          <span>zahtjeva na čekanju</span>
        </div>
        <div className="adm-card">
          <b>{appointments.length}</b>
          <span>{activeDoctor ? "mojih termina danas" : "termina danas"}</span>
        </div>
      </div>

      <div className="adm-card">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", flexWrap: "wrap" }}>
          <h2 style={{ margin: 0, fontFamily: "var(--font-fredoka)", fontSize: "20px" }}>
            Današnji termini{activeDoctor ? ` — ${doctorName(activeDoctor)}` : " — svi doktori"}
          </h2>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            <Link
              href="/admin?doctor=all"
              className="adm-btn sm"
              style={activeDoctor === null ? {} : { background: "#FFFFFF", border: "2px solid #EDE5D4" }}
            >
              Svi
            </Link>
            {doctors.map((d) => (
              <Link
                key={d.id}
                href={`/admin?doctor=${d.id}`}
                className="adm-btn sm"
                style={activeDoctor === d.id ? {} : { background: "#FFFFFF", border: "2px solid #EDE5D4" }}
              >
                Dr. {d.last_name}
                {myStaff?.id === d.id ? " (ja)" : ""}
              </Link>
            ))}
          </div>
        </div>
        {appointments.length === 0 ? (
          <div className="adm-empty">Danas nema zakazanih termina.</div>
        ) : (
          <table className="adm-table" style={{ marginTop: "10px" }}>
            <thead>
              <tr>
                <th>VRIJEME</th>
                <th>PACIJENT</th>
                <th>USLUGA</th>
                {!activeDoctor && <th>DOKTOR</th>}
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((t) => {
                const st = STATUSES[t.status];
                return (
                  <tr key={t.id}>
                    <td style={{ fontWeight: 800 }}>{t.time?.slice(0, 5)}</td>
                    <td>{t.name}</td>
                    <td>{t.service ?? "—"}</td>
                    {!activeDoctor && <td>{doctorName(t.staff_id)}</td>}
                    <td>
                      <span className="adm-badge" style={{ color: st.color, background: st.bg }}>
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
          <Link href="/admin/calendar" className="adm-btn secondary sm">Otvori kalendar →</Link>
        </div>
      </div>
    </>
  );
}
