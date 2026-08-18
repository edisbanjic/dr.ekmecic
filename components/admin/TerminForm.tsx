"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import { getZauzetoAdmin, noviTermin } from "@/app/admin/actions";
import {
  DANI_KRATKO,
  fmtDatum,
  HORIZONT_ADMIN,
  MJESECI,
  parseDatum,
  slotoviZaDan,
  USLUGE,
} from "@/lib/termini";
import type { Pacijent, Radnik, Termin } from "@/lib/types";

export default function TerminForm({
  pacijenti,
  radnici,
  izTermina,
}: {
  pacijenti: Pacijent[];
  radnici: Radnik[];
  /** Zahtjev "za dogovor" iz kojeg se prenose podaci; otkazuje se pri zakazivanju. */
  izTermina?: Termin | null;
}) {
  const [state, formAction, pending] = useActionState(noviTermin, {});
  const [radnik, setRadnik] = useState(izTermina?.radnik_id ?? "");
  const [ime, setIme] = useState(izTermina?.ime ?? "");
  const [telefon, setTelefon] = useState(izTermina?.telefon ?? "");

  const danas = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);
  const maxDatum = useMemo(() => {
    const d = new Date(danas);
    d.setDate(d.getDate() + HORIZONT_ADMIN);
    return d;
  }, [danas]);

  const [mjesec, setMjesec] = useState(() => new Date(danas.getFullYear(), danas.getMonth(), 1));
  const [datum, setDatum] = useState("");
  const [vrijeme, setVrijeme] = useState("");
  const [zauzeto, setZauzeto] = useState<{ vrijeme: string; ime: string }[]>([]);
  const [ucitavam, setUcitavam] = useState(false);

  const doktori = radnici.filter((r) => r.je_doktor);

  useEffect(() => {
    if (!datum) return;
    let aktivan = true;
    setUcitavam(true);
    setVrijeme("");
    getZauzetoAdmin(datum, radnik || null)
      .then((z) => aktivan && setZauzeto(z))
      .finally(() => aktivan && setUcitavam(false));
    return () => {
      aktivan = false;
    };
  }, [datum, radnik]);

  // ćelije mjeseca, sedmica počinje ponedjeljkom
  const celije = useMemo(() => {
    const prvi = new Date(mjesec.getFullYear(), mjesec.getMonth(), 1);
    const zadnji = new Date(mjesec.getFullYear(), mjesec.getMonth() + 1, 0);
    const praznih = (prvi.getDay() + 6) % 7;
    const cells: (Date | null)[] = Array(praznih).fill(null);
    for (let i = 1; i <= zadnji.getDate(); i++) {
      cells.push(new Date(mjesec.getFullYear(), mjesec.getMonth(), i));
    }
    return cells;
  }, [mjesec]);

  const mozeNazad = mjesec > new Date(danas.getFullYear(), danas.getMonth(), 1);
  const mozeNaprijed = new Date(mjesec.getFullYear(), mjesec.getMonth() + 1, 1) <= maxDatum;
  const slotovi = datum ? slotoviZaDan(parseDatum(datum).getDay()) : [];
  const zauzetOd = (slot: string) => zauzeto.find((z) => z.vrijeme === slot);

  const odaberiPacijenta = (id: string) => {
    const p = pacijenti.find((p) => p.id === id);
    if (p) {
      setIme(`${p.ime} ${p.prezime}`);
      if (p.telefon) setTelefon(p.telefon);
      if (p.radnik_id && doktori.some((d) => d.id === p.radnik_id)) setRadnik(p.radnik_id);
    }
  };

  const navDugme = (moze: boolean): React.CSSProperties => ({
    border: "none",
    background: "#E7F0FB",
    borderRadius: "999px",
    width: "30px",
    height: "30px",
    cursor: moze ? "pointer" : "default",
    opacity: moze ? 1 : 0.35,
    fontSize: "15px",
  });

  return (
    <form action={formAction} className="adm-forma">
      {izTermina && <input type="hidden" name="iz" value={izTermina.id} />}
      {izTermina?.email && <input type="hidden" name="email" value={izTermina.email} />}
      <input type="hidden" name="datum" value={datum} />
      <input type="hidden" name="vrijeme" value={vrijeme} />

      <label>
        <span>Pacijent iz kartoteke (opciono)</span>
        <select
          name="pacijent_id"
          defaultValue={izTermina?.pacijent_id ?? ""}
          onChange={(e) => odaberiPacijenta(e.target.value)}
        >
          <option value="">— bez kartona —</option>
          {pacijenti.map((p) => (
            <option key={p.id} value={p.id}>
              {p.prezime}, {p.ime}
            </option>
          ))}
        </select>
      </label>
      <label>
        <span>Doktor</span>
        <select name="radnik_id" value={radnik} onChange={(e) => setRadnik(e.target.value)}>
          <option value="">— neodređeno —</option>
          {doktori.map((d) => (
            <option key={d.id} value={d.id}>
              Dr. {d.prezime}, {d.ime}
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

      {/* kalendar s pregledom zauzetosti */}
      <div className="puno">
        <span style={{ display: "block", fontWeight: 800, fontSize: "13px", marginBottom: "6px" }}>
          Datum i vrijeme
        </span>
        <div style={{ background: "#FDFBF6", border: "2px solid #EDE5D4", borderRadius: "16px", padding: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
            <button
              type="button"
              onClick={() => mozeNazad && setMjesec(new Date(mjesec.getFullYear(), mjesec.getMonth() - 1, 1))}
              disabled={!mozeNazad}
              aria-label="Prethodni mjesec"
              style={navDugme(mozeNazad)}
            >
              ‹
            </button>
            <div style={{ fontFamily: "var(--font-fredoka)", fontWeight: 600, fontSize: "15.5px" }}>
              {MJESECI[mjesec.getMonth()]} {mjesec.getFullYear()}.
            </div>
            <button
              type="button"
              onClick={() => mozeNaprijed && setMjesec(new Date(mjesec.getFullYear(), mjesec.getMonth() + 1, 1))}
              disabled={!mozeNaprijed}
              aria-label="Sljedeći mjesec"
              style={navDugme(mozeNaprijed)}
            >
              ›
            </button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: "3px", textAlign: "center" }}>
            {DANI_KRATKO.map((d) => (
              <div key={d} style={{ fontSize: "10.5px", fontWeight: 800, opacity: 0.55, padding: "3px 0" }}>
                {d}
              </div>
            ))}
            {celije.map((d, i) => {
              if (!d) return <div key={`p${i}`} />;
              const iso = fmtDatum(d);
              const radni = slotoviZaDan(d.getDay()).length > 0;
              const dostupan = radni && d >= danas && d <= maxDatum;
              const odabran = datum === iso;
              return (
                <button
                  key={iso}
                  type="button"
                  disabled={!dostupan}
                  onClick={() => setDatum(iso)}
                  style={{
                    border: "none",
                    borderRadius: "10px",
                    padding: "6px 0",
                    fontSize: "13px",
                    fontWeight: 700,
                    fontFamily: "inherit",
                    cursor: dostupan ? "pointer" : "default",
                    background: odabran ? "#7EAEE8" : dostupan ? "#FFFFFF" : "transparent",
                    color: "#3D4142",
                    opacity: dostupan ? 1 : 0.3,
                    boxShadow: odabran
                      ? "0 6px 12px -6px rgba(126,174,232,.9)"
                      : dostupan
                        ? "0 1px 0 rgba(61,65,66,.12)"
                        : "none",
                  }}
                >
                  {d.getDate()}
                </button>
              );
            })}
          </div>

          {datum && (
            <div style={{ marginTop: "12px", borderTop: "1px solid #EDE5D4", paddingTop: "12px" }}>
              {ucitavam ? (
                <div style={{ fontSize: "13px", opacity: 0.6, fontWeight: 700 }}>
                  Učitavam zauzetost…
                </div>
              ) : (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {slotovi.map((s) => {
                    const zauzetTermin = zauzetOd(s);
                    const slobodan = !zauzetTermin;
                    const odabran = vrijeme === s;
                    return (
                      <button
                        key={s}
                        type="button"
                        disabled={!slobodan}
                        onClick={() => setVrijeme(s)}
                        title={zauzetTermin ? `Zauzeto: ${zauzetTermin.ime}` : undefined}
                        style={{
                          border: "2px solid " + (odabran ? "#7EAEE8" : "#EDE5D4"),
                          background: odabran ? "#7EAEE8" : slobodan ? "#FFFFFF" : "#F1EBDD",
                          color: "#3D4142",
                          textDecoration: slobodan ? "none" : "line-through",
                          opacity: slobodan ? 1 : 0.5,
                          borderRadius: "999px",
                          padding: "6px 12px",
                          fontSize: "13px",
                          fontWeight: 800,
                          fontFamily: "inherit",
                          cursor: slobodan ? "pointer" : "default",
                        }}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              )}
              <div style={{ marginTop: "10px", fontSize: "12.5px", fontWeight: 700, opacity: 0.6 }}>
                {vrijeme
                  ? `Odabrano: ${parseDatum(datum).getDate()}. ${MJESECI[parseDatum(datum).getMonth()].toLowerCase()} u ${vrijeme}${radnik ? "" : " — zauzetost je prikazana za sve doktore"}`
                  : radnik
                    ? "Precrtani slotovi su zauzeti kod odabranog doktora — zadržite miš da vidite ko."
                    : "Bez odabranog doktora prikazuje se zauzetost svih doktora."}
              </div>
            </div>
          )}
        </div>
      </div>

      <label className="puno">
        <span>Usluga</span>
        <select
          name="usluga"
          defaultValue={
            izTermina?.usluga && USLUGE.includes(izTermina.usluga) ? izTermina.usluga : USLUGE[0]
          }
        >
          {USLUGE.map((u) => (
            <option key={u}>{u}</option>
          ))}
        </select>
      </label>
      <label className="puno">
        <span>Napomena</span>
        <textarea name="napomena" rows={2} defaultValue={izTermina?.napomena ?? ""} />
      </label>
      {state.error && <div className="adm-greska puno">{state.error}</div>}
      <div className="puno">
        <button type="submit" className="adm-dugme" disabled={pending || !datum || !vrijeme}>
          {pending ? "Spremam…" : "Zakaži termin"}
        </button>
      </div>
    </form>
  );
}
