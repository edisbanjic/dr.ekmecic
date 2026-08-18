import { getSupabase } from "./supabase";
import { MJESECI, parseDatum } from "./termini";
import type { Objava } from "./types";

/** Objavljene objave, najnovije prve. */
export async function getObjave(limit?: number): Promise<Objava[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  let query = supabase
    .from("objave")
    .select("*")
    .eq("objavljena", true)
    .order("datum", { ascending: false });
  if (limit) query = query.limit(limit);
  const { data, error } = await query;
  if (error) {
    console.error("Greška pri čitanju objava:", error);
    return [];
  }
  return (data ?? []) as Objava[];
}

export async function getObjava(slug: string): Promise<Objava | null> {
  const supabase = getSupabase();
  if (!supabase) return null;
  const { data } = await supabase
    .from("objave")
    .select("*")
    .eq("slug", slug)
    .eq("objavljena", true)
    .maybeSingle();
  return (data as Objava) ?? null;
}

/** "2026-08-20" → "20. august 2026." */
export function lijepDatum(datum: string): string {
  const d = parseDatum(datum);
  return `${d.getDate()}. ${MJESECI[d.getMonth()].toLowerCase()} ${d.getFullYear()}.`;
}

/** Sadržaj u pasuse: prazan red razdvaja. */
export function pasusi(sadrzaj: string): string[] {
  return sadrzaj
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
}
