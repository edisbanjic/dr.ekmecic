import type { Pacijent } from "@/lib/types";

/** Zajednička polja za kreiranje i izmjenu pacijenta. */
export default function PacijentPolja({ p }: { p?: Pacijent }) {
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
