"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSupabaseServer } from "@/lib/supabase-server";
import { datumUHorizontu, parseDatum, slotoviZaDan } from "@/lib/termini";
import type { TerminStatus } from "@/lib/types";

async function db() {
  const supabase = await getSupabaseServer();
  if (!supabase) throw new Error("Supabase nije konfigurisan.");
  return supabase;
}

const s = (formData: FormData, key: string) => String(formData.get(key) ?? "").trim();
const sOrNull = (formData: FormData, key: string) => s(formData, key) || null;

// ---------- pacijenti ----------

function pacijentIzForme(formData: FormData) {
  return {
    ime: s(formData, "ime"),
    prezime: s(formData, "prezime"),
    telefon: sOrNull(formData, "telefon"),
    email: sOrNull(formData, "email"),
    datum_rodjenja: sOrNull(formData, "datum_rodjenja"),
    adresa: sOrNull(formData, "adresa"),
    alergije: sOrNull(formData, "alergije"),
    napomena: sOrNull(formData, "napomena"),
  };
}

export async function noviPacijent(formData: FormData): Promise<void> {
  const supabase = await db();
  const { data, error } = await supabase
    .from("pacijenti")
    .insert(pacijentIzForme(formData))
    .select("id")
    .single();
  if (error) throw new Error("Greška pri kreiranju pacijenta: " + error.message);
  revalidatePath("/admin/pacijenti");
  redirect(`/admin/pacijenti/${data.id}`);
}

export async function urediPacijenta(id: string, formData: FormData): Promise<void> {
  const supabase = await db();
  const { error } = await supabase.from("pacijenti").update(pacijentIzForme(formData)).eq("id", id);
  if (error) throw new Error("Greška pri izmjeni pacijenta: " + error.message);
  revalidatePath(`/admin/pacijenti/${id}`);
  revalidatePath("/admin/pacijenti");
}

export async function obrisiPacijenta(id: string): Promise<void> {
  const supabase = await db();
  const { error } = await supabase.from("pacijenti").delete().eq("id", id);
  if (error) throw new Error("Greška pri brisanju pacijenta: " + error.message);
  revalidatePath("/admin/pacijenti");
  redirect("/admin/pacijenti");
}

export async function noviZapis(pacijentId: string, formData: FormData): Promise<void> {
  const supabase = await db();
  const { error } = await supabase.from("zapisi").insert({
    pacijent_id: pacijentId,
    datum: s(formData, "datum") || undefined,
    zub: sOrNull(formData, "zub"),
    opis: s(formData, "opis"),
    radnik_id: sOrNull(formData, "radnik_id"),
  });
  if (error) throw new Error("Greška pri dodavanju zapisa: " + error.message);
  revalidatePath(`/admin/pacijenti/${pacijentId}`);
}

export async function obrisiZapis(pacijentId: string, zapisId: string): Promise<void> {
  const supabase = await db();
  const { error } = await supabase.from("zapisi").delete().eq("id", zapisId);
  if (error) throw new Error("Greška pri brisanju zapisa: " + error.message);
  revalidatePath(`/admin/pacijenti/${pacijentId}`);
}

// ---------- radnici ----------

function radnikIzForme(formData: FormData) {
  return {
    ime: s(formData, "ime"),
    prezime: s(formData, "prezime"),
    uloga: s(formData, "uloga"),
    telefon: sOrNull(formData, "telefon"),
    email: sOrNull(formData, "email"),
    datum_zaposlenja: sOrNull(formData, "datum_zaposlenja"),
    napomena: sOrNull(formData, "napomena"),
    aktivan: formData.get("aktivan") === "on",
  };
}

export async function noviRadnik(formData: FormData): Promise<void> {
  const supabase = await db();
  const { data, error } = await supabase
    .from("radnici")
    .insert(radnikIzForme(formData))
    .select("id")
    .single();
  if (error) throw new Error("Greška pri kreiranju radnika: " + error.message);
  revalidatePath("/admin/radnici");
  redirect(`/admin/radnici/${data.id}`);
}

export async function urediRadnika(id: string, formData: FormData): Promise<void> {
  const supabase = await db();
  const { error } = await supabase.from("radnici").update(radnikIzForme(formData)).eq("id", id);
  if (error) throw new Error("Greška pri izmjeni radnika: " + error.message);
  revalidatePath(`/admin/radnici/${id}`);
  revalidatePath("/admin/radnici");
}

export async function obrisiRadnika(id: string): Promise<void> {
  const supabase = await db();
  const { error } = await supabase.from("radnici").delete().eq("id", id);
  if (error) throw new Error("Greška pri brisanju radnika: " + error.message);
  revalidatePath("/admin/radnici");
  redirect("/admin/radnici");
}

// ---------- termini ----------

export async function noviTermin(
  _prev: { error?: string },
  formData: FormData
): Promise<{ error?: string }> {
  const termin = {
    datum: s(formData, "datum"),
    vrijeme: s(formData, "vrijeme"),
    ime: s(formData, "ime"),
    telefon: sOrNull(formData, "telefon"),
    usluga: sOrNull(formData, "usluga"),
    napomena: sOrNull(formData, "napomena"),
    pacijent_id: sOrNull(formData, "pacijent_id"),
    radnik_id: sOrNull(formData, "radnik_id"),
    status: "potvrdjen" as const,
  };
  if (!termin.ime) return { error: "Ime je obavezno." };
  if (!datumUHorizontu(termin.datum)) return { error: "Odaberite ispravan datum." };
  if (!slotoviZaDan(parseDatum(termin.datum).getDay()).includes(termin.vrijeme)) {
    return { error: "Odaberite ispravno vrijeme." };
  }

  const supabase = await db();
  const { error } = await supabase.from("termini").insert(termin);
  if (error) {
    if (error.code === "23505") return { error: "Taj slot je već zauzet." };
    return { error: "Greška pri kreiranju termina: " + error.message };
  }
  revalidatePath("/admin/kalendar");
  redirect("/admin/kalendar?datum=" + termin.datum);
}

export async function promijeniStatusTermina(id: string, status: TerminStatus): Promise<void> {
  const supabase = await db();
  const { error } = await supabase.from("termini").update({ status }).eq("id", id);
  if (error) throw new Error("Greška pri izmjeni termina: " + error.message);
  revalidatePath("/admin/kalendar");
  revalidatePath("/admin");
}
