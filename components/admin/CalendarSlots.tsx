"use client";

import { createContext, useContext, useRef, useState } from "react";
import AppointmentForm from "@/components/admin/AppointmentForm";
import { DAYS, MONTHS, parseDate } from "@/lib/appointments";
import type { Patient, Staff } from "@/lib/types";

type Slot = { date: string; time: string };

const SlotContext = createContext<(slot: Slot) => void>(() => {});

/**
 * Wraps the week grid: SlotButtons rendered anywhere inside open one shared
 * "new appointment" dialog with the clicked slot preselected. On success the
 * server action redirects back to the calendar, which closes the dialog.
 */
export function NewAppointmentProvider({
  patients,
  staff,
  initialStaffId,
  children,
}: {
  patients: Patient[];
  staff: Staff[];
  /** Active doctor filter — preselected in the form. */
  initialStaffId?: string | null;
  children: React.ReactNode;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [slot, setSlot] = useState<Slot | null>(null);

  const open = (s: Slot) => {
    setSlot(s);
    requestAnimationFrame(() => dialog.current?.showModal());
  };

  const slotLabel = (s: Slot) => {
    const d = parseDate(s.date);
    return `${DAYS[(d.getDay() + 6) % 7]}, ${d.getDate()}. ${MONTHS[d.getMonth()].toLowerCase()} ${d.getFullYear()}. u ${s.time}`;
  };

  return (
    <SlotContext.Provider value={open}>
      {children}
      <dialog
        ref={dialog}
        className="adm-modal"
        style={{ maxWidth: "720px", maxHeight: "calc(100vh - 64px)", overflowY: "auto" }}
        onClose={() => setSlot(null)}
      >
        {slot && (
          <>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "12px" }}>
              <h3 style={{ margin: 0, fontFamily: "var(--font-fredoka)", fontWeight: 600, fontSize: "20px" }}>
                Novi termin
              </h3>
              <button
                type="button"
                onClick={() => dialog.current?.close()}
                aria-label="Zatvori"
                style={{
                  border: "none", background: "#F5F0E8", borderRadius: "999px",
                  width: "30px", height: "30px", cursor: "pointer",
                  fontSize: "14px", fontWeight: 800, color: "#3D4142", flex: "0 0 auto",
                }}
              >
                ✕
              </button>
            </div>
            <p style={{ margin: "4px 0 16px", fontSize: "13.5px", opacity: 0.7, fontWeight: 800 }}>
              {slotLabel(slot)}
            </p>
            <AppointmentForm
              key={slot.date + slot.time}
              patients={patients}
              staff={staff}
              initialDate={slot.date}
              initialTime={slot.time}
              initialStaffId={initialStaffId ?? undefined}
            />
          </>
        )}
      </dialog>
    </SlotContext.Provider>
  );
}

/** An empty, bookable slot in the week view. */
export function SlotButton({ date, time }: Slot) {
  const open = useContext(SlotContext);
  return (
    <button
      type="button"
      className="adm-slot"
      onClick={() => open({ date, time })}
      title={`Novi termin u ${time}`}
    >
      <span>{time}</span>
      <span className="plus">+</span>
    </button>
  );
}
