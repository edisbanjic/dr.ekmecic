"use server";

import { canonicalPhone } from "@/lib/match";
import { getSupabase } from "@/lib/supabase";
import { dateInHorizon, parseDate, slotsForDay, SERVICES } from "@/lib/appointments";
import { getDict, LOCALES, type Locale } from "@/lib/i18n";
import type { Doctor } from "@/lib/types";

export type BookingResult = { ok: boolean; error?: string };

/** Active doctors for the public dropdown — id and name only. */
export async function getDoctors(): Promise<Doctor[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("staff")
    .select("id, first_name, last_name")
    .eq("active", true)
    .eq("is_doctor", true)
    .order("last_name");
  if (error) {
    console.error("Failed to load doctors:", error);
    return [];
  }
  return (data ?? []) as Doctor[];
}

/**
 * Occupied start times ("HH:MM") for the given date and doctor — no personal
 * data. Appointments without an assigned doctor block every doctor.
 */
export async function getBooked(date: string, staffId: string | null): Promise<string[]> {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return [];
  const supabase = getSupabase();
  if (!supabase) return [];
  let query = supabase
    .from("appointments")
    .select("time")
    .eq("date", date)
    .neq("status", "cancelled");
  if (staffId) {
    query = query.or(`staff_id.eq.${staffId},staff_id.is.null`);
  }
  const { data, error } = await query;
  if (error) {
    console.error("Failed to load booked appointments:", error);
    return [];
  }
  return (data ?? []).map((r) => String(r.time).slice(0, 5));
}

export async function submitBooking(formData: FormData): Promise<BookingResult> {
  // errors go back in the language of the page the form was submitted from
  const lang = String(formData.get("lang") ?? "");
  const locale: Locale = (LOCALES as string[]).includes(lang) ? (lang as Locale) : "bs";
  const t = getDict(locale).bookingErrors;
  // propose = "1": patient did not pick a date — the clinic contacts them
  const propose = String(formData.get("propose") ?? "") === "1";
  const firstName = String(formData.get("first_name") ?? "").trim();
  const lastName = String(formData.get("last_name") ?? "").trim();
  const appointment = {
    // single name field in the DB; matching and "+ New chart" expect "First Last"
    name: [firstName, lastName].filter(Boolean).join(" "),
    phone: String(formData.get("phone") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim() || null,
    service: String(formData.get("service") ?? "").trim(),
    notes: String(formData.get("notes") ?? "").trim() || null,
    date: (String(formData.get("date") ?? "").trim() || null) as string | null,
    time: (String(formData.get("time") ?? "").trim() || null) as string | null,
    staff_id: String(formData.get("staff_id") ?? "").trim() || null,
  };

  if (!firstName || !lastName || !appointment.phone) {
    return { ok: false, error: t.required };
  }
  const phone = canonicalPhone(appointment.phone);
  if (!phone) {
    return { ok: false, error: t.phone };
  }
  appointment.phone = phone;
  if (appointment.email && !/^\S+@\S+\.\S+$/.test(appointment.email)) {
    return { ok: false, error: t.email };
  }
  if (!SERVICES.includes(appointment.service)) {
    return { ok: false, error: t.service };
  }
  if (propose) {
    appointment.date = null;
    appointment.time = null;
  } else {
    if (!appointment.date || !dateInHorizon(appointment.date)) {
      return { ok: false, error: t.date };
    }
    if (
      !appointment.time ||
      !slotsForDay(parseDate(appointment.date).getDay()).includes(appointment.time)
    ) {
      return { ok: false, error: t.slot };
    }
  }

  const supabase = getSupabase();
  if (!supabase) {
    // Supabase is not configured yet — accept the request so the site still works.
    console.log("Appointment request (Supabase not configured):", appointment);
    return { ok: true };
  }

  // doctor is optional, but if chosen must be a real active doctor
  if (appointment.staff_id) {
    const doctors = await getDoctors();
    if (!doctors.some((d) => d.id === appointment.staff_id)) {
      return { ok: false, error: t.doctor };
    }
  }

  const { error } = await supabase.from("appointments").insert(appointment);
  if (error) {
    if (error.code === "23505") {
      return { ok: false, error: t.taken };
    }
    console.error("Failed to save appointment:", error);
    return { ok: false, error: t.generic };
  }
  return { ok: true };
}
