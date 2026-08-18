import { noviPacijent } from "@/app/admin/actions";
import NemaSupabase from "@/components/admin/NemaSupabase";
import PacijentPolja from "@/components/admin/PacijentPolja";
import { getDoktoriAdmin } from "@/lib/admin";
import { getSupabaseServer } from "@/lib/supabase-server";

export default async function NoviPacijentPage() {
  const supabase = await getSupabaseServer();
  if (!supabase) return <NemaSupabase />;

  const doktori = await getDoktoriAdmin(supabase);

  return (
    <>
      <div className="adm-naslov">
        <h1>Novi pacijent</h1>
      </div>
      <div className="adm-karta" style={{ maxWidth: "720px" }}>
        <form action={noviPacijent} className="adm-forma">
          <PacijentPolja doktori={doktori} />
          <div className="puno">
            <button type="submit" className="adm-dugme">Kreiraj karton</button>
          </div>
        </form>
      </div>
    </>
  );
}
