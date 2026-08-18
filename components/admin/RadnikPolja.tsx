"use client";

import { useState } from "react";
import type { Radnik } from "@/lib/types";

const PREDEFINISANE_ULOGE = [
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

const OSTALO = "Ostalo";

function poznataUloga(uloga?: string | null) {
  if (!uloga) return null;
  return PREDEFINISANE_ULOGE.find((u) => u.toLowerCase() === uloga.trim().toLowerCase()) ?? null;
}

/** Zajednička polja za kreiranje i izmjenu radnika. */
export default function RadnikPolja({ r }: { r?: Radnik }) {
  const poznata = poznataUloga(r?.uloga);
  const [uloga, setUloga] = useState(poznata ?? (r?.uloga ? OSTALO : ""));
  const jeDoktor = uloga === "Stomatolog";

  return (
    <>
      <label>
        <span>Ime</span>
        <input required name="ime" defaultValue={r?.ime ?? ""} />
      </label>
      <label>
        <span>Prezime</span>
        <input required name="prezime" defaultValue={r?.prezime ?? ""} />
      </label>
      <label>
        <span>Uloga</span>
        <select
          required
          name={uloga === OSTALO ? undefined : "uloga"}
          value={uloga}
          onChange={(e) => setUloga(e.target.value)}
        >
          <option value="" disabled>
            — odaberite —
          </option>
          {PREDEFINISANE_ULOGE.map((u) => (
            <option key={u} value={u}>
              {u}
            </option>
          ))}
          <option value={OSTALO}>Ostalo…</option>
        </select>
      </label>
      {uloga === OSTALO && (
        <label>
          <span>Naziv uloge</span>
          <input required name="uloga" defaultValue={poznata ? "" : r?.uloga ?? ""} placeholder="npr. koordinator…" />
        </label>
      )}
      <label>
        <span>Telefon</span>
        <input name="telefon" defaultValue={r?.telefon ?? ""} />
      </label>
      <label>
        <span>Email</span>
        <input type="email" name="email" defaultValue={r?.email ?? ""} />
      </label>
      <label>
        <span>Datum zaposlenja</span>
        <input type="date" name="datum_zaposlenja" defaultValue={r?.datum_zaposlenja ?? ""} />
      </label>
      <label className="puno">
        <span>Napomena</span>
        <textarea name="napomena" rows={3} defaultValue={r?.napomena ?? ""} />
      </label>
      <label className="puno" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <input
          type="checkbox"
          name="aktivan"
          defaultChecked={r?.aktivan ?? true}
          style={{ width: "auto" }}
        />
        <span style={{ margin: 0 }}>Aktivan</span>
      </label>
      {jeDoktor ? (
        <input type="hidden" name="je_doktor" value="on" />
      ) : (
        <label className="puno" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <input
            type="checkbox"
            name="je_doktor"
            defaultChecked={r?.je_doktor ?? false}
            style={{ width: "auto" }}
          />
          <span style={{ margin: 0 }}>Doktor — prima termine (vidljiv u dropdownu za zakazivanje)</span>
        </label>
      )}
    </>
  );
}
