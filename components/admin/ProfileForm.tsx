"use client";

import { useActionState } from "react";
import { saveProfile } from "@/app/admin/actions";
import type { Staff } from "@/lib/types";

export default function ProfileForm({ staff }: { staff: Staff }) {
  const [state, formAction, pending] = useActionState(
    saveProfile.bind(null, staff.id),
    {}
  );

  return (
    <form action={formAction} className="adm-form">
      <div className="full" style={{ display: "flex", alignItems: "center", gap: "18px", flexWrap: "wrap" }}>
        {staff.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={staff.image_url}
            alt={`${staff.first_name} ${staff.last_name}`}
            style={{
              width: "84px", height: "84px", borderRadius: "50%", objectFit: "cover",
              border: "3px solid #7EAEE8",
            }}
          />
        ) : (
          <div
            aria-hidden="true"
            style={{
              width: "84px", height: "84px", borderRadius: "50%", background: "#E7F0FB",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "var(--font-fredoka)", fontWeight: 700, fontSize: "28px", color: "#3E5F86",
            }}
          >
            {staff.first_name[0]}
            {staff.last_name[0]}
          </div>
        )}
        <label style={{ flex: "1 1 240px" }}>
          <span>Profilna slika (JPG/PNG, do 4 MB)</span>
          <input type="file" name="image" accept="image/*" />
        </label>
      </div>
      <label>
        <span>Ime</span>
        <input required name="first_name" defaultValue={staff.first_name} />
      </label>
      <label>
        <span>Prezime</span>
        <input required name="last_name" defaultValue={staff.last_name} />
      </label>
      <label>
        <span>Uloga</span>
        <input name="role" defaultValue={staff.role} />
      </label>
      <label>
        <span>Email</span>
        <input type="email" name="email" defaultValue={staff.email ?? ""} />
      </label>
      <label>
        <span>Telefon</span>
        <input name="phone" defaultValue={staff.phone ?? ""} />
      </label>
      <label className="full">
        <span>Biografija</span>
        <textarea
          name="biography"
          rows={4}
          defaultValue={staff.biography ?? ""}
          placeholder="Kratko o vama — obrazovanje, specijalizacije, pristup pacijentima…"
        />
      </label>
      <label className="full">
        <span>Moje bilješke</span>
        <textarea
          name="internal_notes"
          rows={4}
          defaultValue={staff.internal_notes ?? ""}
          placeholder="Podsjetnici, to-do, bilo šta korisno…"
        />
      </label>
      {state.error && <div className="adm-error full">{state.error}</div>}
      {state.ok && (
        <div className="full" style={{ background: "#E3EFE4", color: "#3E6B4A", borderRadius: "14px", padding: "12px 16px", fontWeight: 800, fontSize: "14px" }}>
          Profil je sačuvan. ✦
        </div>
      )}
      <div className="full">
        <button type="submit" className="adm-btn" disabled={pending}>
          {pending ? "Spremam…" : "Sačuvaj profil"}
        </button>
      </div>
    </form>
  );
}
