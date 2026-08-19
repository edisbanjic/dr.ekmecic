import { notFound } from "next/navigation";
import { createRecord, deletePatient, deleteRecord, updatePatient } from "@/app/admin/actions";
import ConfirmButton from "@/components/admin/ConfirmButton";
import NoSupabase from "@/components/admin/NoSupabase";
import PatientFields from "@/components/admin/PatientFields";
import { getSupabaseServer } from "@/lib/supabase-server";
import { formatDate, STATUSES } from "@/lib/appointments";
import type { Patient, Staff, Appointment, ChartRecord } from "@/lib/types";
import { fullName } from "@/lib/types";

export default async function ChartPage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await getSupabaseServer();
  if (!supabase) return <NoSupabase />;

  const { id } = await params;
  const [patientRes, recordsRes, appointmentsRes, staffRes] = await Promise.all([
    supabase.from("patients").select("*").eq("id", id).maybeSingle(),
    supabase.from("records").select("*").eq("patient_id", id).order("date", { ascending: false }),
    supabase.from("appointments").select("*").eq("patient_id", id).order("date", { ascending: false }),
    supabase.from("staff").select("*").eq("active", true).order("last_name"),
  ]);

  const patient = patientRes.data as Patient | null;
  if (!patient) notFound();
  const records = (recordsRes.data ?? []) as ChartRecord[];
  const appointments = (appointmentsRes.data ?? []) as Appointment[];
  const staff = (staffRes.data ?? []) as Staff[];
  const staffName = (rid: string | null) => {
    const r = staff.find((r) => r.id === rid);
    return r ? fullName(r) : null;
  };

  return (
    <>
      <div className="adm-heading">
        <h1>
          {patient.last_name}, {patient.first_name}
        </h1>
        <ConfirmButton
          action={deletePatient.bind(null, patient.id)}
          message="Obrisati karton pacijenta? Brišu se i svi zapisi."
        >
          Obriši karton
        </ConfirmButton>
      </div>

      <div style={{ display: "grid", gap: "20px" }}>
        <div className="adm-card">
          <h2 style={{ marginTop: 0, fontFamily: "var(--font-fredoka)", fontSize: "20px" }}>Podaci</h2>
          <form action={updatePatient.bind(null, patient.id)} className="adm-form">
            <PatientFields patient={patient} doctors={staff.filter((r) => r.is_doctor)} />
            <div className="full">
              <button type="submit" className="adm-btn">Spremi izmjene</button>
            </div>
          </form>
        </div>

        <div className="adm-card">
          <h2 style={{ marginTop: 0, fontFamily: "var(--font-fredoka)", fontSize: "20px" }}>
            Zapisi u kartonu
          </h2>
          <form action={createRecord.bind(null, patient.id)} className="adm-form" style={{ marginBottom: "20px" }}>
            <label>
              <span>Datum</span>
              <input type="date" name="date" defaultValue={formatDate(new Date())} />
            </label>
            <label>
              <span>Zub (opciono)</span>
              <input name="tooth" placeholder="npr. 16" />
            </label>
            <label>
              <span>Radnik</span>
              <select name="staff_id">
                <option value="">—</option>
                {staff.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.last_name}, {r.first_name}
                  </option>
                ))}
              </select>
            </label>
            <label className="full">
              <span>Opis zahvata / nalaz</span>
              <textarea required name="description" rows={2} placeholder="npr. Kompozitna plomba, okluzalno…" />
            </label>
            <div className="full">
              <button type="submit" className="adm-btn sm">+ Dodaj zapis</button>
            </div>
          </form>

          {records.length === 0 ? (
            <div className="adm-empty">Još nema zapisa u kartonu.</div>
          ) : (
            <table className="adm-table">
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
                {records.map((z) => (
                  <tr key={z.id}>
                    <td style={{ whiteSpace: "nowrap", fontWeight: 800 }}>{z.date}</td>
                    <td>{z.tooth ?? "—"}</td>
                    <td>{z.description}</td>
                    <td>{staffName(z.staff_id) ?? "—"}</td>
                    <td style={{ textAlign: "right" }}>
                      <ConfirmButton
                        action={deleteRecord.bind(null, patient.id, z.id)}
                        message="Obrisati ovaj zapis?"
                        className="adm-btn danger sm"
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

        <div className="adm-card">
          <h2 style={{ marginTop: 0, fontFamily: "var(--font-fredoka)", fontSize: "20px" }}>
            Historija termina
          </h2>
          {appointments.length === 0 ? (
            <div className="adm-empty">Nema termina povezanih s ovim kartonom.</div>
          ) : (
            <table className="adm-table">
              <thead>
                <tr>
                  <th>DATUM</th>
                  <th>VRIJEME</th>
                  <th>USLUGA</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((t) => {
                  const st = STATUSES[t.status];
                  return (
                    <tr key={t.id}>
                      <td style={{ fontWeight: 800 }}>{t.date ?? "po dogovoru"}</td>
                      <td>{t.time?.slice(0, 5) ?? "—"}</td>
                      <td>{t.service ?? "—"}</td>
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
        </div>
      </div>
    </>
  );
}
