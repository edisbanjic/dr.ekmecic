import type { Radnik } from "@/lib/types";

/** Zajednička polja za kreiranje i izmjenu radnika. */
export default function RadnikPolja({ r }: { r?: Radnik }) {
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
        <input required name="uloga" defaultValue={r?.uloga ?? ""} placeholder="npr. stomatolog, asistent…" />
      </label>
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
      <label className="puno" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <input
          type="checkbox"
          name="je_doktor"
          defaultChecked={r?.je_doktor ?? false}
          style={{ width: "auto" }}
        />
        <span style={{ margin: 0 }}>Doktor — prima termine (vidljiv u dropdownu za zakazivanje)</span>
      </label>
    </>
  );
}
