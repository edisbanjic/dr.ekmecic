"use server";

import { redirect } from "next/navigation";
import { getSupabase } from "@/lib/supabase";
import { getSupabaseServer } from "@/lib/supabase-server";

export type PrijavaState = { error?: string };

export async function prijava(_prev: PrijavaState, formData: FormData): Promise<PrijavaState> {
  const email = String(formData.get("email") ?? "").trim();
  const lozinka = String(formData.get("lozinka") ?? "");
  if (!email) return { error: "Unesite email." };

  const supabase = await getSupabaseServer();
  if (!supabase) {
    return { error: "Supabase nije konfigurisan — popunite .env.local (vidi README)." };
  }

  // Prva prijava bez lozinke — dozvoljena samo dok je nalog u onboarding stanju.
  if (!lozinka) {
    const admin = getSupabase();
    if (!admin) return { error: "Supabase nije konfigurisan." };
    const { data, error } = await admin.auth.admin.generateLink({ type: "magiclink", email });
    if (error || !data?.user) return { error: "Pogrešan email ili lozinka." };
    if (data.user.user_metadata?.mora_postaviti_lozinku !== true) {
      return { error: "Unesite lozinku." };
    }
    const { error: otpError } = await supabase.auth.verifyOtp({
      type: "email",
      token_hash: data.properties.hashed_token,
    });
    if (otpError) return { error: "Prijava nije uspjela. Pokušajte ponovo." };
    redirect("/admin/postavi-lozinku");
  }

  const { data: signin, error } = await supabase.auth.signInWithPassword({
    email,
    password: lozinka,
  });
  if (error) return { error: "Pogrešan email ili lozinka." };
  if (signin.user?.user_metadata?.mora_postaviti_lozinku === true) {
    redirect("/admin/postavi-lozinku");
  }
  redirect("/admin");
}

export type LozinkaState = { error?: string };

export async function postaviLozinku(
  _prev: LozinkaState,
  formData: FormData
): Promise<LozinkaState> {
  const lozinka = String(formData.get("lozinka") ?? "");
  const potvrda = String(formData.get("potvrda") ?? "");
  if (lozinka.length < 8) return { error: "Lozinka mora imati bar 8 znakova." };
  if (lozinka !== potvrda) return { error: "Lozinke se ne podudaraju." };

  const supabase = await getSupabaseServer();
  if (!supabase) return { error: "Supabase nije konfigurisan." };
  const { error } = await supabase.auth.updateUser({
    password: lozinka,
    data: { mora_postaviti_lozinku: false },
  });
  if (error) return { error: "Greška pri postavljanju lozinke: " + error.message };

  redirect("/admin");
}

export async function odjava(): Promise<void> {
  const supabase = await getSupabaseServer();
  if (supabase) await supabase.auth.signOut();
  redirect("/admin/login");
}
