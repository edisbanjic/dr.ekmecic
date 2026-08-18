"use server";

import { getSupabase } from "@/lib/supabase";
import { datumUHorizontu, parseDatum, slotoviZaDan, USLUGE } from "@/lib/termini";
import type { Doktor } from "@/lib/types";

export type BookingResult = { ok: boolean; error?: string };

/** Aktivni doktori za javni dropdown — samo id i ime. */
export async function getDoktori(): Promise<Doktor[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("radnici")
    .select("id, ime, prezime")
    .eq("aktivan", true)
    .eq("je_doktor", true)
    .order("prezime");
  if (error) {
    console.error("Greška pri čitanju doktora:", error);
    return [];
  }
  return (data ?? []) as Doktor[];
}

/**
 * Zauzeta početna vremena ("HH:MM") za dati datum i doktora — bez ličnih
 * podataka. Termini bez dodijeljenog doktora blokiraju sve doktore.
 */
export async function getZauzeto(datum: string, radnikId: string | null): Promise<string[]> {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(datum)) return [];
  const supabase = getSupabase();
  if (!supabase) return [];
  let query = supabase
    .from("termini")
    .select("vrijeme")
    .eq("datum", datum)
    .neq("status", "otkazan");
  if (radnikId) {
    query = query.or(`radnik_id.eq.${radnikId},radnik_id.is.null`);
  }
  const { data, error } = await query;
  if (error) {
    console.error("Greška pri čitanju zauzetih termina:", error);
    return [];
  }
  return (data ?? []).map((r) => String(r.vrijeme).slice(0, 5));
}

export async function submitBooking(formData: FormData): Promise<BookingResult> {
  // predlozi = "1": pacijent nije birao datum — ordinacija ga kontaktira
  const predlozi = String(formData.get("predlozi") ?? "") === "1";
  const termin = {
    ime: String(formData.get("ime") ?? "").trim(),
    telefon: String(formData.get("telefon") ?? "").trim(),
    usluga: String(formData.get("usluga") ?? "").trim(),
    napomena: String(formData.get("napomena") ?? "").trim() || null,
    datum: (String(formData.get("datum") ?? "").trim() || null) as string | null,
    vrijeme: (String(formData.get("vrijeme") ?? "").trim() || null) as string | null,
    radnik_id: String(formData.get("radnik_id") ?? "").trim() || null,
  };

  if (!termin.ime || !termin.telefon) {
    return { ok: false, error: "Ime i broj telefona su obavezni." };
  }
  if (!USLUGE.includes(termin.usluga)) {
    return { ok: false, error: "Odaberite uslugu." };
  }
  if (predlozi) {
    termin.datum = null;
    termin.vrijeme = null;
  } else {
    if (!termin.datum || !datumUHorizontu(termin.datum)) {
      return { ok: false, error: "Odaberite datum u kalendaru." };
    }
    if (
      !termin.vrijeme ||
      !slotoviZaDan(parseDatum(termin.datum).getDay()).includes(termin.vrijeme)
    ) {
      return { ok: false, error: "Odaberite slobodan termin." };
    }
  }

  const supabase = getSupabase();
  if (!supabase) {
    // Supabase još nije konfigurisan — prihvati zahtjev da sajt radi.
    console.log("Zahtjev za termin (Supabase nije konfigurisan):", termin);
    return { ok: true };
  }

  // odabrani doktor mora biti stvaran aktivan doktor
  const doktori = await getDoktori();
  if (doktori.length > 0) {
    if (!termin.radnik_id || !doktori.some((d) => d.id === termin.radnik_id)) {
      return { ok: false, error: "Odaberite doktora." };
    }
  } else {
    termin.radnik_id = null;
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
