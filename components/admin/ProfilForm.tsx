"use client";

import { useActionState } from "react";
import { sacuvajProfil } from "@/app/admin/actions";
import type { Radnik } from "@/lib/types";

export default function ProfilForm({ radnik }: { radnik: Radnik }) {
  const [state, formAction, pending] = useActionState(
    sacuvajProfil.bind(null, radnik.id),
    {}
  );

  return (
    <form action={formAction} className="adm-forma">
      <div className="puno" style={{ display: "flex", alignItems: "center", gap: "18px", flexWrap: "wrap" }}>
        {radnik.slika_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={radnik.slika_url}
            alt={`${radnik.ime} ${radnik.prezime}`}
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
            {radnik.ime[0]}
            {radnik.prezime[0]}
          </div>
        )}
        <label style={{ flex: "1 1 240px" }}>
          <span>Profilna slika (JPG/PNG, do 4 MB)</span>
          <input type="file" name="slika" accept="image/*" />
        </label>
      </div>
      <label>
        <span>Ime</span>
        <input required name="ime" defaultValue={radnik.ime} />
      </label>
      <label>
        <span>Prezime</span>
        <input required name="prezime" defaultValue={radnik.prezime} />
      </label>
      <label>
        <span>Uloga</span>
        <input name="uloga" defaultValue={radnik.uloga} />
      </label>
      <label>
        <span>Email</span>
        <input type="email" name="email" defaultValue={radnik.email ?? ""} />
      </label>
      <label>
        <span>Telefon</span>
        <input name="telefon" defaultValue={radnik.telefon ?? ""} />
      </label>
      <label className="puno">
        <span>Biografija</span>
        <textarea
          name="biografija"
          rows={4}
          defaultValue={radnik.biografija ?? ""}
          placeholder="Kratko o vama — obrazovanje, specijalizacije, pristup pacijentima…"
        />
      </label>
      <label className="puno">
        <span>Moje bilješke</span>
        <textarea
          name="biljeske"
          rows={4}
          defaultValue={radnik.biljeske ?? ""}
          placeholder="Podsjetnici, to-do, bilo šta korisno…"
        />
      </label>
      {state.error && <div className="adm-greska puno">{state.error}</div>}
      {state.ok && (
        <div className="puno" style={{ background: "#E3EFE4", color: "#3E6B4A", borderRadius: "14px", padding: "12px 16px", fontWeight: 800, fontSize: "14px" }}>
          Profil je sačuvan. ✦
        </div>
      )}
      <div className="puno">
        <button type="submit" className="adm-dugme" disabled={pending}>
          {pending ? "Spremam…" : "Sačuvaj profil"}
        </button>
      </div>
    </form>
  );
}
