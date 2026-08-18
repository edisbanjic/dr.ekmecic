import type { SupabaseClient } from "@supabase/supabase-js";
import type { Radnik } from "./types";

/** Karton radnika povezan s prijavljenim nalogom (null ako nije povezan). */
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
  return (data as Radnik) ?? null;
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
