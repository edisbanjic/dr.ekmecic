import { createMyProfile } from "@/app/admin/actions";
import NoSupabase from "@/components/admin/NoSupabase";
import ProfileForm from "@/components/admin/ProfileForm";
import { getMyStaff } from "@/lib/admin";
import { getSupabaseServer } from "@/lib/supabase-server";

export default async function ProfilePage() {
  const supabase = await getSupabaseServer();
  if (!supabase) return <NoSupabase />;

  // automatically linked to the staff record via the login email
  const myStaff = await getMyStaff(supabase);

  if (myStaff) {
    return (
      <>
        <div className="adm-heading">
          <h1>Moj profil</h1>
        </div>
        <div className="adm-card" style={{ maxWidth: "760px" }}>
          <ProfileForm staff={myStaff} />
        </div>
      </>
    );
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <div className="adm-heading">
        <h1>Moj profil</h1>
      </div>
      <div className="adm-card" style={{ maxWidth: "760px" }}>
        <h2 style={{ marginTop: 0, fontFamily: "var(--font-fredoka)", fontSize: "20px" }}>
          Popunite svoj profil
        </h2>
        <p style={{ lineHeight: 1.6, opacity: 0.8 }}>
          Za nalog <b>{user?.email}</b> još ne postoji karton radnika, pa nam trebaju osnovni
          podaci — samo jednom. Nakon toga kalendar i početna stranica podrazumijevano
          prikazuju vaše termine.
        </p>
        <form action={createMyProfile} className="adm-form">
          <label>
            <span>Ime</span>
            <input required name="first_name" />
          </label>
          <label>
            <span>Prezime</span>
            <input required name="last_name" />
          </label>
          <label>
            <span>Uloga</span>
            <input name="role" placeholder="npr. stomatolog" />
          </label>
          <label className="full" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <input type="checkbox" name="is_doctor" defaultChecked style={{ width: "auto" }} />
            <span style={{ margin: 0 }}>Doktor — prima termine (vidljiv pri zakazivanju)</span>
          </label>
          <div className="full">
            <button type="submit" className="adm-btn">Sačuvaj</button>
          </div>
        </form>
      </div>
    </>
  );
}
