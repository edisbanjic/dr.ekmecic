"use client";

import { useRef } from "react";
import { completeAppointment } from "@/app/admin/actions";

/** "Complete" button with a modal for an optional procedure note. */
export default function CompleteAppointment({
  appointmentId,
  hasChart,
}: {
  appointmentId: string;
  hasChart: boolean;
}) {
  const dialog = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button type="button" onClick={() => dialog.current?.showModal()}>
        Završi
      </button>
      <dialog ref={dialog} className="adm-modal">
        <form
          action={completeAppointment.bind(null, appointmentId)}
          onSubmit={() => dialog.current?.close()}
        >
          <h3
            style={{
              margin: "0 0 6px",
              fontFamily: "var(--font-fredoka)",
              fontWeight: 600,
              fontSize: "20px",
            }}
          >
            Završi termin
          </h3>
          <p style={{ margin: "0 0 14px", fontSize: "13.5px", opacity: 0.7, fontWeight: 600, lineHeight: 1.5 }}>
            {hasChart
              ? "Napomena se sprema i kao zapis u karton pacijenta."
              : "Termin nije povezan s kartonom — napomena ostaje na terminu."}
          </p>
          <label style={{ display: "block" }}>
            <span style={{ display: "block", fontWeight: 800, fontSize: "13px", marginBottom: "6px" }}>
              Napomena o zahvatu{" "}
              <span style={{ opacity: 0.5, fontWeight: 600 }}>(opciono)</span>
            </span>
            <textarea
              name="report"
              rows={4}
              placeholder="npr. Kompozitna plomba na zubu 16, bez komplikacija…"
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "11px 14px",
                borderRadius: "14px",
                border: "2px solid #EDE5D4",
                background: "#FDFBF6",
                fontSize: "14.5px",
                fontFamily: "inherit",
                resize: "vertical",
              }}
            />
          </label>
          <div style={{ display: "flex", gap: "10px", marginTop: "16px", justifyContent: "flex-end" }}>
            <button
              type="button"
              onClick={() => dialog.current?.close()}
              className="adm-btn secondary sm"
            >
              Odustani
            </button>
            <button type="submit" className="adm-btn sm">
              ✓ Završi termin
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}
