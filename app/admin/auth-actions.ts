"use server";

import { redirect } from "next/navigation";
import { getSupabase } from "@/lib/supabase";
import { getSupabaseServer } from "@/lib/supabase-server";

export type LoginState = { error?: string };

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!email) return { error: "Unesite email." };

  const supabase = await getSupabaseServer();
  if (!supabase) {
    return { error: "Supabase nije konfigurisan — popunite .env.local (vidi README)." };
  }

  // First login without a password — allowed only while the account is onboarding.
  if (!password) {
    const admin = getSupabase();
    if (!admin) return { error: "Supabase nije konfigurisan." };
    const { data, error } = await admin.auth.admin.generateLink({ type: "magiclink", email });
    if (error || !data?.user) return { error: "Pogrešan email ili lozinka." };
    if (data.user.user_metadata?.must_set_password !== true) {
      return { error: "Unesite lozinku." };
    }
    const { error: otpError } = await supabase.auth.verifyOtp({
      type: "email",
      token_hash: data.properties.hashed_token,
    });
    if (otpError) return { error: "Prijava nije uspjela. Pokušajte ponovo." };
    redirect("/admin/set-password");
  }

  const { data: signin, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) return { error: "Pogrešan email ili lozinka." };
  if (signin.user?.user_metadata?.must_set_password === true) {
    redirect("/admin/set-password");
  }
  redirect("/admin");
}

export type PasswordState = { error?: string };

export async function setPassword(
  _prev: PasswordState,
  formData: FormData
): Promise<PasswordState> {
  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm") ?? "");
  if (password.length < 8) return { error: "Lozinka mora imati bar 8 znakova." };
  if (password !== confirm) return { error: "Lozinke se ne podudaraju." };

  const supabase = await getSupabaseServer();
  if (!supabase) return { error: "Supabase nije konfigurisan." };
  const { error } = await supabase.auth.updateUser({
    password,
    data: { must_set_password: false },
  });
  if (error) return { error: "Greška pri postavljanju lozinke: " + error.message };

  redirect("/admin");
}

export async function logout(): Promise<void> {
  const supabase = await getSupabaseServer();
  if (supabase) await supabase.auth.signOut();
  redirect("/admin/login");
}
