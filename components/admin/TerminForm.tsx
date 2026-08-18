"use client";

import { useActionState, useEffect, useState } from "react";
import { getZauzeto } from "@/app/actions";
import { noviTermin } from "@/app/admin/actions";
import { fmtDatum, HORIZONT_DANA, parseDatum, slotoviZaDan, USLUGE } from "@/lib/termini";
import type { Pacijent, Radnik } from "@/lib/types";

export default function TerminForm({
  pacijenti,
  radnici,
}: {
  pacijenti: Pacijent[];
  radnici: Radnik[];
}) {
  const [state, formAction, pending] = useActionState(noviTermin, {});
  const [datum, setDatum] = useState("");
  const [zauzeto, setZauzeto] = useState<string[]>([]);
  const [ime, setIme] = useState("");
  const [telefon, setTelefon] = useState("");

  useEffect(() => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(datum)) return;
    let aktivan = true;
    getZauzeto(datum).then((z) => aktivan && setZauzeto(z));
    return () => {
      aktivan = false;
    };
  }, [datum]);

  const slotovi = /^\d{4}-\d{2}-\d{2}$/.test(datum)
    ? slotoviZaDan(parseDatum(datum).getDay()).filter((s) => !zauzeto.includes(s))
    : [];

  const danas = new Date();
  const max = new Date();
  max.setDate(max.getDate() + HORIZONT_DANA);

  const odaberiPacijenta = (id: string) => {
    const p = pacijenti.find((p) => p.id === id);
    if (p) {
      setIme(`${p.ime} ${p.prezime}`);
      if (p.telefon) setTelefon(p.telefon);
    }
  };

  return (
    <form action={formAction} className="adm-forma">
      <label>
        <span>Pacijent iz kartoteke (opciono)</span>
        <select name="pacijent_id" onChange={(e) => odaberiPacijenta(e.target.value)}>
          <option value="">— bez kartona —</option>
          {pacijenti.map((p) => (
            <option key={p.id} value={p.id}>
              {p.prezime}, {p.ime}
            </option>
          ))}
        </select>
      </label>
      <label>
        <span>Radnik (opciono)</span>
        <select name="radnik_id">
          <option value="">— neodređeno —</option>
          {radnici.map((r) => (
            <option key={r.id} value={r.id}>
              {r.prezime}, {r.ime} ({r.uloga})
            </option>
          ))}
        </select>
      </label>
      <label>
        <span>Ime i prezime</span>
        <input required name="ime" value={ime} onChange={(e) => setIme(e.target.value)} />
      </label>
      <label>
        <span>Telefon</span>
        <input name="telefon" value={telefon} onChange={(e) => setTelefon(e.target.value)} />
      </label>
      <label>
        <span>Datum</span>
        <input
          required
          type="date"
          name="datum"
          min={fmtDatum(danas)}
          max={fmtDatum(max)}
          value={datum}
          onChange={(e) => setDatum(e.target.value)}
        />
      </label>
      <label>
        <span>Vrijeme</span>
        <select required name="vrijeme" disabled={!slotovi.length}>
          {slotovi.length === 0 ? (
            <option value="">— odaberite datum —</option>
          ) : (
            slotovi.map((s) => <option key={s}>{s}</option>)
          )}
        </select>
      </label>
      <label className="puno">
        <span>Usluga</span>
        <select name="usluga">
          {USLUGE.map((u) => (
            <option key={u}>{u}</option>
          ))}
        </select>
      </label>
      <label className="puno">
        <span>Napomena</span>
        <textarea name="napomena" rows={2} />
      </label>
      {state.error && <div className="adm-greska puno">{state.error}</div>}
      <div className="puno">
        <button type="submit" className="adm-dugme" disabled={pending}>
          {pending ? "Spremam…" : "Zakaži termin"}
        </button>
      </div>
    </form>
  );
}
