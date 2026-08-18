import NemaSupabase from "@/components/admin/NemaSupabase";
import TerminForm from "@/components/admin/TerminForm";
import { getSupabaseServer } from "@/lib/supabase-server";
import type { Pacijent, Radnik, Termin } from "@/lib/types";

export default async function NoviTerminPage({
  searchParams,
}: {
  searchParams: Promise<{ iz?: string }>;
}) {
  const supabase = await getSupabaseServer();
  if (!supabase) return <NemaSupabase />;

  const { iz } = await searchParams;
  const [pacijenti, radnici, izvor] = await Promise.all([
    supabase.from("pacijenti").select("*").order("prezime"),
    supabase.from("radnici").select("*").eq("aktivan", true).order("prezime"),
    iz
      ? supabase.from("termini").select("*").eq("id", iz).maybeSingle()
      : Promise.resolve({ data: null }),
  ]);

  const izTermina = (izvor.data as Termin | null) ?? null;

  return (
    <>
      <div className="adm-naslov">
        <h1>Novi termin</h1>
      </div>
      {izTermina && (
        <p style={{ marginTop: "-10px", marginBottom: "20px", fontWeight: 800, opacity: 0.6 }}>
          Podaci su preneseni iz zahtjeva „{izTermina.ime}" — zahtjev se automatski otkazuje
          kad zakažete termin.
        </p>
      )}
      <div className="adm-karta" style={{ maxWidth: "720px" }}>
        <TerminForm
          pacijenti={(pacijenti.data ?? []) as Pacijent[]}
          radnici={(radnici.data ?? []) as Radnik[]}
          izTermina={izTermina}
        />
      </div>
    </>
  );
}
