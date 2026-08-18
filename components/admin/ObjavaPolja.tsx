import { fmtDatum } from "@/lib/termini";
import type { Objava } from "@/lib/types";

/** Zajednička polja za kreiranje i izmjenu objave. */
export default function ObjavaPolja({ o }: { o?: Objava }) {
  return (
    <>
      <label className="puno">
        <span>Naslov</span>
        <input required name="naslov" defaultValue={o?.naslov ?? ""} placeholder="npr. Kako pobijediti strah od zubara?" />
      </label>
      <label>
        <span>Datum</span>
        <input type="date" name="datum" defaultValue={o?.datum ?? fmtDatum(new Date())} />
      </label>
      <label className="puno">
        <span>Sažetak (kratki uvod na kartici)</span>
        <input name="sazetak" defaultValue={o?.sazetak ?? ""} placeholder="Rečenica-dvije koje mame na čitanje…" />
      </label>
      <label className="puno">
        <span>Sadržaj (prazan red = novi pasus)</span>
        <textarea required name="sadrzaj" rows={12} defaultValue={o?.sadrzaj ?? ""} />
      </label>
      <label className="puno" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <input type="checkbox" name="objavljena" defaultChecked={o?.objavljena ?? false} style={{ width: "auto" }} />
        <span style={{ margin: 0 }}>Objavljena — vidljiva na sajtu</span>
      </label>
    </>
  );
}
