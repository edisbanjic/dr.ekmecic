"use client";

import { useState } from "react";
import type { Staff } from "@/lib/types";

const PREDEFINED_ROLES = [
  "Stomatolog",
  "Ortodont",
  "Oralni hirurg",
  "Parodontolog",
  "Endodont",
  "Protetičar",
  "Pedodont (dječiji stomatolog)",
  "Stomatološka sestra/asistent",
  "Zubni tehničar",
  "Recepcioner",
  "Menadžer ordinacije",
];

const OTHER = "Ostalo";

function knownRole(role?: string | null) {
  if (!role) return null;
  return PREDEFINED_ROLES.find((u) => u.toLowerCase() === role.trim().toLowerCase()) ?? null;
}

/** Shared fields for creating and editing staff. */
export default function StaffFields({ staff }: { staff?: Staff }) {
  const known = knownRole(staff?.role);
  const [role, setRole] = useState(known ?? (staff?.role ? OTHER : ""));
  const isDoctor = role === "Stomatolog";

  return (
    <>
      <label>
        <span>Ime</span>
        <input required name="first_name" defaultValue={staff?.first_name ?? ""} />
      </label>
      <label>
        <span>Prezime</span>
        <input required name="last_name" defaultValue={staff?.last_name ?? ""} />
      </label>
      <label>
        <span>Uloga</span>
        <select
          required
          name={role === OTHER ? undefined : "role"}
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="" disabled>
            — odaberite —
          </option>
          {PREDEFINED_ROLES.map((u) => (
            <option key={u} value={u}>
              {u}
            </option>
          ))}
          <option value={OTHER}>Ostalo…</option>
        </select>
      </label>
      {role === OTHER && (
        <label>
          <span>Naziv uloge</span>
          <input required name="role" defaultValue={known ? "" : staff?.role ?? ""} placeholder="npr. koordinator…" />
        </label>
      )}
      <label>
        <span>Telefon</span>
        <input name="phone" defaultValue={staff?.phone ?? ""} />
      </label>
      <label>
        <span>Email</span>
        <input type="email" name="email" defaultValue={staff?.email ?? ""} />
      </label>
      <label>
        <span>Datum zaposlenja</span>
        <input type="date" name="hired_at" defaultValue={staff?.hired_at ?? ""} />
      </label>
      <label className="full">
        <span>Napomena</span>
        <textarea name="notes" rows={3} defaultValue={staff?.notes ?? ""} />
      </label>
      <label className="full" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <input
          type="checkbox"
          name="active"
          defaultChecked={staff?.active ?? true}
          style={{ width: "auto" }}
        />
        <span style={{ margin: 0 }}>Aktivan</span>
      </label>
      {isDoctor ? (
        <input type="hidden" name="is_doctor" value="on" />
      ) : (
        <label className="full" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <input
            type="checkbox"
            name="is_doctor"
            defaultChecked={staff?.is_doctor ?? false}
            style={{ width: "auto" }}
          />
          <span style={{ margin: 0 }}>Doktor — prima termine (vidljiv u dropdownu za zakazivanje)</span>
        </label>
      )}
    </>
  );
}
