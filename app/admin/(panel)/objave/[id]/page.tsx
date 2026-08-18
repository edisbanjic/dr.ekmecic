import { notFound } from "next/navigation";
import { obrisiObjavu, urediObjavu } from "@/app/admin/actions";
import ConfirmButton from "@/components/admin/ConfirmButton";
import NemaSupabase from "@/components/admin/NemaSupabase";
import ObjavaPolja from "@/components/admin/ObjavaPolja";
import { getSupabaseServer } from "@/lib/supabase-server";
import type { Objava } from "@/lib/types";

export default async function ObjavaPage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await getSupabaseServer();
  if (!supabase) return <NemaSupabase />;

  const { id } = await params;
  const { data } = await supabase.from("objave").select("*").eq("id", id).maybeSingle();
  const objava = data as Objava | null;
  if (!objava) notFound();

  return (
    <>
      <div className="adm-naslov">
        <h1>Izmjena objave</h1>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {objava.objavljena && (
            <a href={`/savjeti/${objava.slug}`} target="_blank" rel="noopener" className="adm-dugme sekundarno malo">
              Pogledaj na sajtu →
            </a>
          )}
          <ConfirmButton action={obrisiObjavu.bind(null, objava.id)} poruka="Obrisati ovu objavu?">
            Obriši
          </ConfirmButton>
        </div>
      </div>
      <div className="adm-karta" style={{ maxWidth: "820px" }}>
        <form action={urediObjavu.bind(null, objava.id)} className="adm-forma">
          <ObjavaPolja o={objava} />
          <div className="puno">
            <button type="submit" className="adm-dugme">Spremi izmjene</button>
          </div>
        </form>
      </div>
    </>
  );
}
