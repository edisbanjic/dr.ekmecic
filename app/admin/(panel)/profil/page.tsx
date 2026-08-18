import { kreirajMojProfil } from "@/app/admin/actions";
import NemaSupabase from "@/components/admin/NemaSupabase";
import ProfilForm from "@/components/admin/ProfilForm";
import { getMojRadnik } from "@/lib/admin";
import { getSupabaseServer } from "@/lib/supabase-server";

export default async function ProfilPage() {
  const supabase = await getSupabaseServer();
  if (!supabase) return <NemaSupabase />;

  // automatski se povezuje s kartonom radnika preko emaila logina
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

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <div className="adm-naslov">
        <h1>Moj profil</h1>
      </div>
      <div className="adm-karta" style={{ maxWidth: "760px" }}>
        <h2 style={{ marginTop: 0, fontFamily: "var(--font-fredoka)", fontSize: "20px" }}>
          Popunite svoj profil
        </h2>
        <p style={{ lineHeight: 1.6, opacity: 0.8 }}>
          Za nalog <b>{user?.email}</b> još ne postoji karton radnika, pa nam trebaju osnovni
          podaci — samo jednom. Nakon toga kalendar i početna stranica podrazumijevano
          prikazuju vaše termine.
        </p>
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
            <input type="checkbox" name="je_doktor" defaultChecked style={{ width: "auto" }} />
            <span style={{ margin: 0 }}>Doktor — prima termine (vidljiv pri zakazivanju)</span>
          </label>
          <div className="puno">
            <button type="submit" className="adm-dugme">Sačuvaj</button>
          </div>
        </form>
      </div>
    </>
  );
}
