import NemaSupabase from "@/components/admin/NemaSupabase";
import TerminForm from "@/components/admin/TerminForm";
import { getSupabaseServer } from "@/lib/supabase-server";
import type { Pacijent, Radnik } from "@/lib/types";

export default async function NoviTerminPage() {
  const supabase = await getSupabaseServer();
  if (!supabase) return <NemaSupabase />;

  const [pacijenti, radnici] = await Promise.all([
    supabase.from("pacijenti").select("*").order("prezime"),
    supabase.from("radnici").select("*").eq("aktivan", true).order("prezime"),
  ]);

  return (
    <>
      <div className="adm-naslov">
        <h1>Novi termin</h1>
      </div>
      <div className="adm-karta" style={{ maxWidth: "720px" }}>
        <TerminForm
          pacijenti={(pacijenti.data ?? []) as Pacijent[]}
          radnici={(radnici.data ?? []) as Radnik[]}
        />
      </div>
    </>
  );
}
