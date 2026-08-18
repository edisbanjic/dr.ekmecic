"use server";

import { getSupabase } from "@/lib/supabase";
import { datumUHorizontu, parseDatum, slotoviZaDan, USLUGE } from "@/lib/termini";

export type BookingResult = { ok: boolean; error?: string };

/** Zauzeta početna vremena ("HH:MM") za dati datum — bez ličnih podataka. */
export async function getZauzeto(datum: string): Promise<string[]> {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(datum)) return [];
  const supabase = getSupabase();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("termini")
    .select("vrijeme")
    .eq("datum", datum)
    .neq("status", "otkazan");
  if (error) {
    console.error("Greška pri čitanju zauzetih termina:", error);
    return [];
  }
  return (data ?? []).map((r) => String(r.vrijeme).slice(0, 5));
}

export async function submitBooking(formData: FormData): Promise<BookingResult> {
  const termin = {
    ime: String(formData.get("ime") ?? "").trim(),
    telefon: String(formData.get("telefon") ?? "").trim(),
    usluga: String(formData.get("usluga") ?? "").trim(),
    napomena: String(formData.get("napomena") ?? "").trim() || null,
    datum: String(formData.get("datum") ?? "").trim(),
    vrijeme: String(formData.get("vrijeme") ?? "").trim(),
  };

  if (!termin.ime || !termin.telefon) {
    return { ok: false, error: "Ime i broj telefona su obavezni." };
  }
  if (!USLUGE.includes(termin.usluga)) {
    return { ok: false, error: "Odaberite uslugu." };
  }
  if (!datumUHorizontu(termin.datum)) {
    return { ok: false, error: "Odaberite datum u kalendaru." };
  }
  if (!slotoviZaDan(parseDatum(termin.datum).getDay()).includes(termin.vrijeme)) {
    return { ok: false, error: "Odaberite slobodan termin." };
  }

  const supabase = getSupabase();
  if (!supabase) {
    // Supabase još nije konfigurisan — prihvati zahtjev da sajt radi.
    console.log("Zahtjev za termin (Supabase nije konfigurisan):", termin);
    return { ok: true };
  }

  const { error } = await supabase.from("termini").insert(termin);
  if (error) {
    if (error.code === "23505") {
      return { ok: false, error: "Ovaj termin je upravo zauzet — odaberite drugi." };
    }
    console.error("Greška pri spremanju termina:", error);
    return { ok: false, error: "Nešto je pošlo po zlu. Pokušajte ponovo ili nas nazovite." };
  }
  return { ok: true };
}
