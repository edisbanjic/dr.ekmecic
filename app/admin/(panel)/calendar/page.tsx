import Link from "next/link";
import {
  assignDoctor,
  createChartFromAppointment,
  linkAppointmentToPatient,
  changeAppointmentStatus,
} from "@/app/admin/actions";
import type { Staff } from "@/lib/types";
import { fullName } from "@/lib/types";
import NoSupabase from "@/components/admin/NoSupabase";
import CompleteAppointment from "@/components/admin/CompleteAppointment";
import { getDoctorsAdmin, getMyStaff } from "@/lib/admin";
import { findPatient, type PatientBrief } from "@/lib/match";
import { getSupabaseServer } from "@/lib/supabase-server";
import { DAYS, formatDate, MONTHS, parseDate, STATUSES } from "@/lib/appointments";
import type { Appointment } from "@/lib/types";

/** Assign (or change) a doctor from the appointment card. */
function DoctorForm({ t, doctors }: { t: Appointment; doctors: Staff[] }) {
  return (
    <form
      action={assignDoctor.bind(null, t.id)}
      style={{ display: "flex", gap: "6px", marginTop: "6px", alignItems: "center" }}
    >
      <select
        name="staff_id"
        defaultValue={t.staff_id ?? ""}
        style={{
          flex: 1,
          minWidth: 0,
          border: "1px solid rgba(61,65,66,.25)",
          borderRadius: "8px",
          padding: "4px 6px",
          fontFamily: "inherit",
          fontWeight: 700,
          fontSize: "11.5px",
          background: "rgba(255,255,255,.85)",
          color: "#3D4142",
        }}
      >
        <option value="">— bez doktora —</option>
        {doctors.map((d) => (
          <option key={d.id} value={d.id}>
            Dr. {fullName(d)}
          </option>
        ))}
      </select>
      <button
        type="submit"
        title="Dodijeli doktora"
        style={{
          border: "none", cursor: "pointer", borderRadius: "999px", padding: "4px 10px",
          fontFamily: "inherit", fontWeight: 800, fontSize: "11.5px",
          background: "#7EAEE8", color: "#243038", flex: "0 0 auto",
        }}
      >
        ✓
      </button>
    </form>
  );
}

/** Chart suggestion: link existing, open linked, or create new. */
function ChartForAppointment({ t, patients }: { t: Appointment; patients: PatientBrief[] }) {
  if (t.patient_id) {
    const p = patients.find((p) => p.id === t.patient_id);
    return (
      <div style={{ marginTop: "4px", fontSize: "12px", fontWeight: 800 }}>
        📋{" "}
        <Link href={`/admin/patients/${t.patient_id}`} style={{ textDecoration: "underline", textUnderlineOffset: "2px", color: "inherit" }}>
          {p ? fullName(p) : "Otvori karton"}
        </Link>
      </div>
    );
  }
  const m = findPatient({ name: t.name, phone: t.phone }, patients);
  if (m) {
    return (
      <div style={{ marginTop: "6px", background: "rgba(255,255,255,.65)", borderRadius: "10px", padding: "6px 8px" }}>
        <div style={{ fontSize: "11.5px", fontWeight: 800 }}>
          Postojeći pacijent?{" "}
          <Link href={`/admin/patients/${m.id}`} style={{ textDecoration: "underline", textUnderlineOffset: "2px", color: "inherit" }}>
            {fullName(m)}
          </Link>
        </div>
        <form action={linkAppointmentToPatient.bind(null, t.id, m.id)} style={{ marginTop: "4px" }}>
          <button
            type="submit"
            style={{
              border: "none", cursor: "pointer", borderRadius: "999px", padding: "3px 10px",
              fontFamily: "inherit", fontWeight: 800, fontSize: "11.5px", background: "#7EAEE8", color: "#243038",
            }}
          >
            ✓ Poveži s kartonom
          </button>
        </form>
      </div>
    );
  }
  return (
    <form action={createChartFromAppointment.bind(null, t.id)} style={{ marginTop: "6px" }}>
      <button
        type="submit"
        style={{
          border: "none", cursor: "pointer", borderRadius: "999px", padding: "3px 10px",
          fontFamily: "inherit", fontWeight: 800, fontSize: "11.5px", background: "rgba(255,255,255,.75)", color: "inherit",
        }}
      >
        + Novi karton
      </button>
    </form>
  );
}

function mondayOf(d: Date): Date {
  const r = new Date(d);
  r.setHours(0, 0, 0, 0);
  r.setDate(r.getDate() - ((r.getDay() + 6) % 7));
  return r;
}

export default async function CalendarPage({
  searchParams,
}: {
  searchParams: Promise<{ date?: string; doctor?: string; error?: string }>;
}) {
  const supabase = await getSupabaseServer();
  if (!supabase) return <NoSupabase />;

  const { date, doctor, error } = await searchParams;
  const [myStaff, doctors] = await Promise.all([
    getMyStaff(supabase),
    getDoctorsAdmin(supabase),
  ]);

  // default: my appointments (if linked to a staff record), otherwise all
  const activeDoctor =
    doctor === "all" ? null : doctor && doctors.some((d) => d.id === doctor) ? doctor : myStaff?.id ?? null;

  const ref = date && /^\d{4}-\d{2}-\d{2}$/.test(date) ? parseDate(date) : new Date();
  const mon = mondayOf(ref);
  const fri = new Date(mon);
  fri.setDate(fri.getDate() + 4);

  const prev = new Date(mon);
  prev.setDate(prev.getDate() - 7);
  const next = new Date(mon);
  next.setDate(next.getDate() + 7);

  let query = supabase
    .from("appointments")
    .select("*")
    .gte("date", formatDate(mon))
    .lte("date", formatDate(fri))
    .order("time");
  if (activeDoctor) query = query.eq("staff_id", activeDoctor);

  // requests where the patient asked the clinic to propose a time
  let undatedQuery = supabase
    .from("appointments")
    .select("*")
    .is("date", null)
    .eq("status", "pending")
    .order("created_at");
  if (activeDoctor) undatedQuery = undatedQuery.eq("staff_id", activeDoctor);

  const [{ data }, { data: undatedData }, { data: patientsData }] = await Promise.all([
    query,
    undatedQuery,
    supabase.from("patients").select("id, first_name, last_name, phone"),
  ]);
  const appointments = (data ?? []) as Appointment[];
  const undated = (undatedData ?? []) as Appointment[];
  const patients = (patientsData ?? []) as PatientBrief[];

  const doctorName = (id: string | null) => {
    const d = doctors.find((d) => d.id === id);
    return d ? `Dr. ${fullName(d)}` : null;
  };

  const hrefFor = (dateIso: string | null, doctorParam: string) => {
    const p = new URLSearchParams();
    if (dateIso) p.set("date", dateIso);
    p.set("doctor", doctorParam);
    return `/admin/calendar?${p.toString()}`;
  };
  const currentDate = date && /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : null;
  const currentDoctorParam = activeDoctor ?? "all";

  const todayIso = formatDate(new Date());
  const days = Array.from({ length: 5 }, (_, i) => {
    const d = new Date(mon);
    d.setDate(d.getDate() + i);
    return d;
  });

  return (
    <>
      <div className="adm-heading">
        <h1>Kalendar termina</h1>
      </div>

      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center", marginBottom: "16px" }}>
        <span style={{ fontSize: "12.5px", fontWeight: 800, opacity: 0.55, letterSpacing: ".06em" }}>PRIKAZ:</span>
        <Link
          href={hrefFor(currentDate, "all")}
          className="adm-btn sm"
          style={activeDoctor === null ? {} : { background: "#FFFFFF", border: "2px solid #EDE5D4" }}
        >
          Svi doktori
        </Link>
        {doctors.map((d) => (
          <Link
            key={d.id}
            href={hrefFor(currentDate, d.id)}
            className="adm-btn sm"
            style={activeDoctor === d.id ? {} : { background: "#FFFFFF", border: "2px solid #EDE5D4" }}
          >
            Dr. {fullName(d)}
            {myStaff?.id === d.id ? " (ja)" : ""}
          </Link>
        ))}
      </div>

      {error === "slot-taken" && (
        <div className="adm-error" style={{ marginBottom: "16px" }}>
          Taj doktor već ima termin u tom slotu — odaberite drugog doktora ili pomjerite termin.
        </div>
      )}

      {undated.length > 0 && (
        <div className="adm-card" style={{ marginBottom: "20px", borderColor: "#F4A08A" }}>
          <h2 style={{ marginTop: 0, fontFamily: "var(--font-fredoka)", fontSize: "18px" }}>
            📞 Za dogovor — pacijent čeka vaš poziv ({undated.length})
          </h2>
          <table className="adm-table">
            <thead>
              <tr>
                <th>PACIJENT</th>
                <th>TELEFON</th>
                <th>USLUGA</th>
                <th>DOKTOR</th>
                <th>KARTON</th>
                <th>AKCIJE</th>
              </tr>
            </thead>
            <tbody>
              {undated.map((t) => (
                <tr key={t.id}>
                  <td style={{ fontWeight: 800 }}>{t.name}</td>
                  <td>
                    {t.phone ?? "—"}
                    {t.email && <div style={{ fontSize: "12.5px", opacity: 0.7 }}>{t.email}</div>}
                  </td>
                  <td>{t.service ?? "—"}</td>
                  <td style={{ minWidth: "170px" }}>
                    <DoctorForm t={t} doctors={doctors} />
                  </td>
                  <td>
                    <ChartForAppointment t={t} patients={patients} />
                  </td>
                  <td style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                    <div style={{ display: "inline-flex", gap: "6px" }}>
                      <Link href={`/admin/calendar/new?from=${t.id}`} className="adm-btn secondary sm">
                        Zakaži
                      </Link>
                      <form action={changeAppointmentStatus.bind(null, t.id, "cancelled")} style={{ display: "inline" }}>
                        <button type="submit" className="adm-btn danger sm">Otkaži</button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p style={{ margin: "12px 0 0", fontSize: "13px", opacity: 0.6, fontWeight: 700 }}>
            Kad dogovorite termin telefonom: „Zakaži" otvara novi termin s prenesenim podacima,
            a ovaj zahtjev se automatski otkazuje.
          </p>
        </div>
      )}

      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "18px" }}>
        <Link href={hrefFor(formatDate(prev), currentDoctorParam)} className="adm-btn secondary sm">← prošla</Link>
        <Link href={hrefFor(null, currentDoctorParam)} className="adm-btn secondary sm">danas</Link>
        <Link href={hrefFor(formatDate(next), currentDoctorParam)} className="adm-btn secondary sm">sljedeća →</Link>
        <Link href="/admin/calendar/new" className="adm-btn sm">+ Novi termin</Link>
      </div>

      <p style={{ marginTop: "0", marginBottom: "20px", fontWeight: 800, opacity: 0.6 }}>
        {mon.getDate()}. {MONTHS[mon.getMonth()].toLowerCase()} – {fri.getDate()}.{" "}
        {MONTHS[fri.getMonth()].toLowerCase()} {fri.getFullYear()}.
      </p>

      <div className="adm-cal">
        {days.map((d) => {
          const iso = formatDate(d);
          const daily = appointments.filter((t) => t.date === iso);
          return (
            <div key={iso} className={"adm-cal-day" + (iso === todayIso ? " today" : "")}>
              <h3>
                {DAYS[(d.getDay() + 6) % 7]}
                <small>{d.getDate()}. {MONTHS[d.getMonth()].toLowerCase()}</small>
              </h3>
              {daily.length === 0 && (
                <div style={{ fontSize: "12.5px", opacity: 0.4, fontWeight: 700 }}>Nema termina</div>
              )}
              {daily.map((t) => {
                const st = STATUSES[t.status];
                return (
                  <div key={t.id} className="adm-appointment" style={{ background: st.bg, color: st.color }}>
                    <b>{t.time?.slice(0, 5)}</b> · {t.name}
                    {!activeDoctor && doctorName(t.staff_id) && (
                      <div style={{ fontWeight: 800 }}>{doctorName(t.staff_id)}</div>
                    )}
                    {t.service && <div style={{ opacity: 0.8 }}>{t.service}</div>}
                    {t.phone && <div style={{ opacity: 0.8 }}>{t.phone}</div>}
                    {t.email && <div style={{ opacity: 0.8, wordBreak: "break-all" }}>{t.email}</div>}
                    {t.report && (
                      <div style={{ marginTop: "4px", fontSize: "12px", fontStyle: "italic", opacity: 0.85 }}>
                        „{t.report}“
                      </div>
                    )}
                    <div style={{ marginTop: "4px", fontSize: "11px", fontWeight: 800, letterSpacing: ".04em" }}>
                      {st.label.toUpperCase()}
                    </div>
                    <ChartForAppointment t={t} patients={patients} />
                    {t.status !== "cancelled" && t.status !== "completed" && (
                      <DoctorForm t={t} doctors={doctors} />
                    )}
                    {t.status !== "cancelled" && t.status !== "completed" && (
                      <div className="actions">
                        {t.status === "pending" && (
                          <form action={changeAppointmentStatus.bind(null, t.id, "confirmed")}>
                            <button type="submit">Potvrdi</button>
                          </form>
                        )}
                        {t.status === "confirmed" && (
                          <CompleteAppointment appointmentId={t.id} hasChart={!!t.patient_id} />
                        )}
                        <form action={changeAppointmentStatus.bind(null, t.id, "cancelled")}>
                          <button type="submit">Otkaži</button>
                        </form>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
}
