import { noviRadnik } from "@/app/admin/actions";
import NemaSupabase from "@/components/admin/NemaSupabase";
import RadnikPolja from "@/components/admin/RadnikPolja";
import { getSupabaseServer } from "@/lib/supabase-server";

export default async function NoviRadnikPage() {
  const supabase = await getSupabaseServer();
  if (!supabase) return <NemaSupabase />;

  return (
    <>
      <div className="adm-naslov">
        <h1>Novi radnik</h1>
      </div>
      <div className="adm-karta" style={{ maxWidth: "720px" }}>
        <form action={noviRadnik} className="adm-forma">
          <RadnikPolja />
          <div className="puno">
            <button type="submit" className="adm-dugme">Kreiraj karton</button>
          </div>
        </form>
      </div>
    </>
  );
}
