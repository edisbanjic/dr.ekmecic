import type { SupabaseClient } from "@supabase/supabase-js";
import type { Radnik } from "./types";

/**
 * Karton radnika povezan s prijavljenim nalogom. Ako veza još ne postoji,
 * automatski se uspostavlja preko emaila: karton čiji email odgovara
 * emailu logina postaje "moj" pri prvoj posjeti.
 */
export async function getMojRadnik(supabase: SupabaseClient): Promise<Radnik | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("radnici")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();
  if (data) return data as Radnik;

  if (!user.email) return null;
  const { data: poEmailu } = await supabase
    .from("radnici")
    .select("*")
    .ilike("email", user.email)
    .is("user_id", null)
    .limit(1);
  const karton = (poEmailu?.[0] as Radnik) ?? null;
  if (!karton) return null;

  const { data: povezan } = await supabase
    .from("radnici")
    .update({ user_id: user.id })
    .eq("id", karton.id)
    .is("user_id", null)
    .select("*")
    .maybeSingle();
  return (povezan as Radnik) ?? { ...karton, user_id: user.id };
}

/** Aktivni doktori (za dropdown filtere u adminu). */
export async function getDoktoriAdmin(supabase: SupabaseClient): Promise<Radnik[]> {
  const { data } = await supabase
    .from("radnici")
    .select("*")
    .eq("je_doktor", true)
    .eq("aktivan", true)
    .order("prezime");
  return (data ?? []) as Radnik[];
}
