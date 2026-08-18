"use server";

import { redirect } from "next/navigation";
import { getSupabaseServer } from "@/lib/supabase-server";

export type PrijavaState = { error?: string };

export async function prijava(_prev: PrijavaState, formData: FormData): Promise<PrijavaState> {
  const email = String(formData.get("email") ?? "").trim();
  const lozinka = String(formData.get("lozinka") ?? "");
  if (!email || !lozinka) return { error: "Unesite email i lozinku." };

  const supabase = await getSupabaseServer();
  if (!supabase) {
    return { error: "Supabase nije konfigurisan — popunite .env.local (vidi README)." };
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password: lozinka });
  if (error) return { error: "Pogrešan email ili lozinka." };

  redirect("/admin");
}

export async function odjava(): Promise<void> {
  const supabase = await getSupabaseServer();
  if (supabase) await supabase.auth.signOut();
  redirect("/admin/login");
}
