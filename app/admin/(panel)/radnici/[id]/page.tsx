import { notFound } from "next/navigation";
import { obrisiRadnika, urediRadnika } from "@/app/admin/actions";
import ConfirmButton from "@/components/admin/ConfirmButton";
import NemaSupabase from "@/components/admin/NemaSupabase";
import RadnikPolja from "@/components/admin/RadnikPolja";
import { getSupabaseServer } from "@/lib/supabase-server";
import type { Radnik } from "@/lib/types";

export default async function RadnikPage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await getSupabaseServer();
  if (!supabase) return <NemaSupabase />;

  const { id } = await params;
  const { data } = await supabase.from("radnici").select("*").eq("id", id).maybeSingle();
  const radnik = data as Radnik | null;
  if (!radnik) notFound();

  return (
    <>
      <div className="adm-naslov">
        <h1>
          {radnik.prezime}, {radnik.ime}
        </h1>
        <ConfirmButton action={obrisiRadnika.bind(null, radnik.id)} poruka="Obrisati karton radnika?">
          Obriši karton
        </ConfirmButton>
      </div>
      <div className="adm-karta" style={{ maxWidth: "720px" }}>
        <form action={urediRadnika.bind(null, radnik.id)} className="adm-forma">
          <RadnikPolja r={radnik} />
          <div className="puno">
            <button type="submit" className="adm-dugme">Spremi izmjene</button>
          </div>
        </form>
      </div>
    </>
  );
}
