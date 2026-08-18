import type { Pacijent, Radnik } from "@/lib/types";

/** Zajednička polja za kreiranje i izmjenu pacijenta. */
export default function PacijentPolja({ p, doktori }: { p?: Pacijent; doktori: Radnik[] }) {
  return (
    <>
      <label>
        <span>Ime</span>
        <input required name="ime" defaultValue={p?.ime ?? ""} />
      </label>
      <label>
        <span>Prezime</span>
        <input required name="prezime" defaultValue={p?.prezime ?? ""} />
      </label>
      <label>
        <span>Telefon</span>
        <input name="telefon" defaultValue={p?.telefon ?? ""} />
      </label>
      <label>
        <span>Email</span>
        <input type="email" name="email" defaultValue={p?.email ?? ""} />
      </label>
      <label>
        <span>Datum rođenja</span>
        <input type="date" name="datum_rodjenja" defaultValue={p?.datum_rodjenja ?? ""} />
      </label>
      <label>
        <span>Adresa</span>
        <input name="adresa" defaultValue={p?.adresa ?? ""} />
      </label>
      <label className="puno">
        <span>Primarni doktor</span>
        <select name="radnik_id" defaultValue={p?.radnik_id ?? ""}>
          <option value="">— neodređen —</option>
          {doktori.map((d) => (
            <option key={d.id} value={d.id}>
              Dr. {d.ime} {d.prezime}
            </option>
          ))}
        </select>
      </label>
      <label className="puno">
        <span>Alergije</span>
        <input name="alergije" defaultValue={p?.alergije ?? ""} placeholder="npr. penicilin" />
      </label>
      <label className="puno">
        <span>Napomena</span>
        <textarea name="napomena" rows={3} defaultValue={p?.napomena ?? ""} />
      </label>
    </>
  );
}
