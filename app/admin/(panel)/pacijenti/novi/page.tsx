import { noviPacijent } from "@/app/admin/actions";
import NemaSupabase from "@/components/admin/NemaSupabase";
import PacijentPolja from "@/components/admin/PacijentPolja";
import { getSupabaseServer } from "@/lib/supabase-server";

export default async function NoviPacijentPage() {
  const supabase = await getSupabaseServer();
  if (!supabase) return <NemaSupabase />;

  return (
    <>
      <div className="adm-naslov">
        <h1>Novi pacijent</h1>
      </div>
      <div className="adm-karta" style={{ maxWidth: "720px" }}>
        <form action={noviPacijent} className="adm-forma">
          <PacijentPolja />
          <div className="puno">
            <button type="submit" className="adm-dugme">Kreiraj karton</button>
          </div>
        </form>
      </div>
    </>
  );
}
