"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import { getBookedAdmin, createAppointment } from "@/app/admin/actions";
import {
  DAYS_SHORT,
  formatDate,
  ADMIN_HORIZON_DAYS,
  MONTHS,
  parseDate,
  slotsForDay,
  SERVICES,
} from "@/lib/appointments";
import type { Patient, Staff, Appointment } from "@/lib/types";
import { fullName } from "@/lib/types";

export default function AppointmentForm({
  patients,
  staff,
  fromAppointment,
  initialDate,
  initialTime,
  initialStaffId,
}: {
  patients: Patient[];
  staff: Staff[];
  /** "To arrange" request whose data is copied; cancelled when booked. */
  fromAppointment?: Appointment | null;
  /** Preselected slot, e.g. when opened by clicking an empty slot in the week view. */
  initialDate?: string;
  initialTime?: string;
  initialStaffId?: string;
}) {
  const [state, formAction, pending] = useActionState(createAppointment, {});
  const [staffId, setStaffId] = useState(fromAppointment?.staff_id ?? initialStaffId ?? "");
  const [name, setName] = useState(fromAppointment?.name ?? "");
  const [phone, setPhone] = useState(fromAppointment?.phone ?? "");

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);
  const maxDate = useMemo(() => {
    const d = new Date(today);
    d.setDate(d.getDate() + ADMIN_HORIZON_DAYS);
    return d;
  }, [today]);

  const [month, setMonth] = useState(() => {
    const base = initialDate ? parseDate(initialDate) : today;
    return new Date(base.getFullYear(), base.getMonth(), 1);
  });
  const [date, setDate] = useState(initialDate ?? "");
  const [time, setTime] = useState(initialTime ?? "");
  const [booked, setBooked] = useState<{ time: string; name: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const doctors = staff.filter((r) => r.is_doctor);

  useEffect(() => {
    if (!date) return;
    let active = true;
    setLoading(true);
    getBookedAdmin(date, staffId || null)
      .then((z) => {
        if (!active) return;
        setBooked(z);
        // keep the chosen time as long as it is a valid, free slot — switching
        // doctor or date only clears it when it no longer fits
        const valid = slotsForDay(parseDate(date).getDay());
        setTime((t) => (t && valid.includes(t) && !z.some((b) => b.time === t) ? t : ""));
      })
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [date, staffId]);

  // month cells, week starts Monday
  const cells = useMemo(() => {
    const first = new Date(month.getFullYear(), month.getMonth(), 1);
    const last = new Date(month.getFullYear(), month.getMonth() + 1, 0);
    const pad = (first.getDay() + 6) % 7;
    const result: (Date | null)[] = Array(pad).fill(null);
    for (let i = 1; i <= last.getDate(); i++) {
      result.push(new Date(month.getFullYear(), month.getMonth(), i));
    }
    return result;
  }, [month]);

  const canPrev = month > new Date(today.getFullYear(), today.getMonth(), 1);
  const canNext = new Date(month.getFullYear(), month.getMonth() + 1, 1) <= maxDate;
  const slots = date ? slotsForDay(parseDate(date).getDay()) : [];
  const bookedAt = (slot: string) => booked.find((z) => z.time === slot);

  const pickPatient = (id: string) => {
    const p = patients.find((p) => p.id === id);
    if (p) {
      setName(fullName(p));
      if (p.phone) setPhone(p.phone);
      if (p.staff_id && doctors.some((d) => d.id === p.staff_id)) setStaffId(p.staff_id);
    }
  };

  const navBtn = (enabled: boolean): React.CSSProperties => ({
    border: "none",
    background: "#E7F0FB",
    borderRadius: "999px",
    width: "30px",
    height: "30px",
    cursor: enabled ? "pointer" : "default",
    opacity: enabled ? 1 : 0.35,
    fontSize: "15px",
  });

  return (
    <form action={formAction} className="adm-form">
      {fromAppointment && <input type="hidden" name="from" value={fromAppointment.id} />}
      {fromAppointment?.email && <input type="hidden" name="email" value={fromAppointment.email} />}
      <input type="hidden" name="date" value={date} />
      <input type="hidden" name="time" value={time} />

      <label>
        <span>Pacijent iz kartoteke (opciono)</span>
        <select
          name="patient_id"
          defaultValue={fromAppointment?.patient_id ?? ""}
          onChange={(e) => pickPatient(e.target.value)}
        >
          <option value="">— bez kartona —</option>
          {patients.map((p) => (
            <option key={p.id} value={p.id}>
              {p.last_name}, {p.first_name}
            </option>
          ))}
        </select>
      </label>
      <label>
        <span>Doktor</span>
        <select name="staff_id" value={staffId} onChange={(e) => setStaffId(e.target.value)}>
          <option value="">— neodređeno —</option>
          {doctors.map((d) => (
            <option key={d.id} value={d.id}>
              Dr. {d.last_name}, {d.first_name}
            </option>
          ))}
        </select>
      </label>
      <label>
        <span>Ime i prezime</span>
        <input required name="name" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        <span>Telefon</span>
        <input name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </label>

      <div className="full">
        <span style={{ display: "block", fontWeight: 800, fontSize: "13px", marginBottom: "6px" }}>
          Datum i vrijeme
        </span>
        <div style={{ background: "#FDFBF6", border: "2px solid #EDE5D4", borderRadius: "16px", padding: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
            <button
              type="button"
              onClick={() => canPrev && setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}
              disabled={!canPrev}
              aria-label="Prethodni mjesec"
              style={navBtn(canPrev)}
            >
              ‹
            </button>
            <div style={{ fontFamily: "var(--font-fredoka)", fontWeight: 600, fontSize: "15.5px" }}>
              {MONTHS[month.getMonth()]} {month.getFullYear()}.
            </div>
            <button
              type="button"
              onClick={() => canNext && setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}
              disabled={!canNext}
              aria-label="Sljedeći mjesec"
              style={navBtn(canNext)}
            >
              ›
            </button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: "3px", textAlign: "center" }}>
            {DAYS_SHORT.map((d) => (
              <div key={d} style={{ fontSize: "10.5px", fontWeight: 800, opacity: 0.55, padding: "3px 0" }}>
                {d}
              </div>
            ))}
            {cells.map((d, i) => {
              if (!d) return <div key={`p${i}`} />;
              const iso = formatDate(d);
              const working = slotsForDay(d.getDay()).length > 0;
              const available = working && d >= today && d <= maxDate;
              const selected = date === iso;
              return (
                <button
                  key={iso}
                  type="button"
                  disabled={!available}
                  onClick={() => setDate(iso)}
                  style={{
                    border: "none",
                    borderRadius: "10px",
                    padding: "6px 0",
                    fontSize: "13px",
                    fontWeight: 700,
                    fontFamily: "inherit",
                    cursor: available ? "pointer" : "default",
                    background: selected ? "#7EAEE8" : available ? "#FFFFFF" : "transparent",
                    color: "#3D4142",
                    opacity: available ? 1 : 0.3,
                    boxShadow: selected
                      ? "0 6px 12px -6px rgba(126,174,232,.9)"
                      : available
                        ? "0 1px 0 rgba(61,65,66,.12)"
                        : "none",
                  }}
                >
                  {d.getDate()}
                </button>
              );
            })}
          </div>

          {date && (
            <div style={{ marginTop: "12px", borderTop: "1px solid #EDE5D4", paddingTop: "12px" }}>
              {loading ? (
                <div style={{ fontSize: "13px", opacity: 0.6, fontWeight: 700 }}>
                  Učitavam zauzetost…
                </div>
              ) : (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {slots.map((s) => {
                    const occupied = bookedAt(s);
                    const free = !occupied;
                    const selected = time === s;
                    return (
                      <button
                        key={s}
                        type="button"
                        disabled={!free}
                        onClick={() => setTime(s)}
                        title={occupied ? `Zauzeto: ${occupied.name}` : undefined}
                        style={{
                          border: "2px solid " + (selected ? "#7EAEE8" : "#EDE5D4"),
                          background: selected ? "#7EAEE8" : free ? "#FFFFFF" : "#F1EBDD",
                          color: "#3D4142",
                          textDecoration: free ? "none" : "line-through",
                          opacity: free ? 1 : 0.5,
                          borderRadius: "999px",
                          padding: "6px 12px",
                          fontSize: "13px",
                          fontWeight: 800,
                          fontFamily: "inherit",
                          cursor: free ? "pointer" : "default",
                        }}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              )}
              <div style={{ marginTop: "10px", fontSize: "12.5px", fontWeight: 700, opacity: 0.6 }}>
                {time
                  ? `Odabrano: ${parseDate(date).getDate()}. ${MONTHS[parseDate(date).getMonth()].toLowerCase()} u ${time}${staffId ? "" : " — zauzetost je prikazana za sve doktore"}`
                  : staffId
                    ? "Precrtani slotovi su zauzeti kod odabranog doktora — zadržite miš da vidite ko."
                    : "Bez odabranog doktora prikazuje se zauzetost svih doktora."}
              </div>
            </div>
          )}
        </div>
      </div>

      <label className="full">
        <span>Usluga</span>
        <select
          name="service"
          defaultValue={
            fromAppointment?.service && SERVICES.includes(fromAppointment.service)
              ? fromAppointment.service
              : SERVICES[0]
          }
        >
          {SERVICES.map((u) => (
            <option key={u}>{u}</option>
          ))}
        </select>
      </label>
      <label className="full">
        <span>Napomena</span>
        <textarea name="notes" rows={2} defaultValue={fromAppointment?.notes ?? ""} />
      </label>
      {state.error && <div className="adm-error full">{state.error}</div>}
      <div className="full">
        <button type="submit" className="adm-btn" disabled={pending || !date || !time}>
          {pending ? "Spremam…" : "Zakaži termin"}
        </button>
      </div>
    </form>
  );
}
