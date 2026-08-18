import { novaObjava } from "@/app/admin/actions";
import NemaSupabase from "@/components/admin/NemaSupabase";
import ObjavaPolja from "@/components/admin/ObjavaPolja";
import { getSupabaseServer } from "@/lib/supabase-server";

export default async function NovaObjavaPage() {
  const supabase = await getSupabaseServer();
  if (!supabase) return <NemaSupabase />;

  return (
    <>
      <div className="adm-naslov">
        <h1>Nova objava</h1>
      </div>
      <div className="adm-karta" style={{ maxWidth: "820px" }}>
        <form action={novaObjava} className="adm-forma">
          <ObjavaPolja />
          <div className="puno">
            <button type="submit" className="adm-dugme">Sačuvaj objavu</button>
          </div>
        </form>
      </div>
    </>
  );
}
