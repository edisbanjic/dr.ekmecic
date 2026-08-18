import { kreirajMojProfil, poveziProfil } from "@/app/admin/actions";
import NemaSupabase from "@/components/admin/NemaSupabase";
import ProfilForm from "@/components/admin/ProfilForm";
import { getMojRadnik } from "@/lib/admin";
import { getSupabaseServer } from "@/lib/supabase-server";
import type { Radnik } from "@/lib/types";

export default async function ProfilPage() {
  const supabase = await getSupabaseServer();
  if (!supabase) return <NemaSupabase />;

  const mojRadnik = await getMojRadnik(supabase);

  if (mojRadnik) {
    return (
      <>
        <div className="adm-naslov">
          <h1>Moj profil</h1>
        </div>
        <div className="adm-karta" style={{ maxWidth: "760px" }}>
          <ProfilForm radnik={mojRadnik} />
        </div>
      </>
    );
  }

  // nalog još nije povezan s kartonom radnika
  const { data } = await supabase
    .from("radnici")
    .select("*")
    .is("user_id", null)
    .order("prezime");
  const slobodni = (data ?? []) as Radnik[];

  return (
    <>
      <div className="adm-naslov">
        <h1>Moj profil</h1>
      </div>
      <div style={{ display: "grid", gap: "20px", maxWidth: "760px" }}>
        <div className="adm-karta">
          <h2 style={{ marginTop: 0, fontFamily: "var(--font-fredoka)", fontSize: "20px" }}>
            Povežite nalog s kartonom radnika
          </h2>
          <p style={{ lineHeight: 1.6, opacity: 0.8 }}>
            Vaš nalog još nije povezan ni s jednim kartonom. Odaberite svoj karton iz liste, ili
            kreirajte novi ako još ne postoji. Nakon povezivanja kalendar i početna stranica
            podrazumijevano prikazuju vaše termine.
          </p>
          {slobodni.length > 0 && (
            <form action={poveziProfil} className="adm-forma">
              <label className="puno">
                <span>Moj karton</span>
                <select required name="radnik_id">
                  <option value="">— odaberite —</option>
                  {slobodni.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.prezime}, {r.ime} ({r.uloga})
                    </option>
                  ))}
                </select>
              </label>
              <div className="puno">
                <button type="submit" className="adm-dugme">Poveži</button>
              </div>
            </form>
          )}
        </div>
        <div className="adm-karta">
          <h2 style={{ marginTop: 0, fontFamily: "var(--font-fredoka)", fontSize: "20px" }}>
            …ili kreirajte novi karton
          </h2>
          <form action={kreirajMojProfil} className="adm-forma">
            <label>
              <span>Ime</span>
              <input required name="ime" />
            </label>
            <label>
              <span>Prezime</span>
              <input required name="prezime" />
            </label>
            <label>
              <span>Uloga</span>
              <input name="uloga" placeholder="npr. stomatolog" />
            </label>
            <label className="puno" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <input type="checkbox" name="je_doktor" style={{ width: "auto" }} />
              <span style={{ margin: 0 }}>Doktor — prima termine</span>
            </label>
            <div className="puno">
              <button type="submit" className="adm-dugme sekundarno">Kreiraj i poveži</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
