"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { sanitizeHtml, textFromHtml } from "@/lib/html";
import { CATEGORIES } from "@/lib/posts";
import { slugify } from "@/lib/slug";
import { getSupabase } from "@/lib/supabase";
import { getSupabaseServer } from "@/lib/supabase-server";
import { dateInHorizon, ADMIN_HORIZON_DAYS, parseDate, slotsForDay } from "@/lib/appointments";
import type { AppointmentStatus } from "@/lib/types";

async function db() {
  const supabase = await getSupabaseServer();
  if (!supabase) throw new Error("Supabase nije konfigurisan.");
  return supabase;
}

const s = (formData: FormData, key: string) => String(formData.get(key) ?? "").trim();
const sOrNull = (formData: FormData, key: string) => s(formData, key) || null;

// ---------- patients ----------

function patientFromForm(formData: FormData) {
  return {
    first_name: s(formData, "first_name"),
    last_name: s(formData, "last_name"),
    phone: sOrNull(formData, "phone"),
    email: sOrNull(formData, "email"),
    date_of_birth: sOrNull(formData, "date_of_birth"),
    address: sOrNull(formData, "address"),
    allergies: sOrNull(formData, "allergies"),
    notes: sOrNull(formData, "notes"),
    staff_id: sOrNull(formData, "staff_id"),
  };
}

export async function createPatient(formData: FormData): Promise<void> {
  const supabase = await db();
  const { data, error } = await supabase
    .from("patients")
    .insert(patientFromForm(formData))
    .select("id")
    .single();
  if (error) throw new Error("Greška pri kreiranju pacijenta: " + error.message);
  revalidatePath("/admin/patients");
  redirect(`/admin/patients/${data.id}`);
}

export async function updatePatient(id: string, formData: FormData): Promise<void> {
  const supabase = await db();
  const { error } = await supabase.from("patients").update(patientFromForm(formData)).eq("id", id);
  if (error) throw new Error("Greška pri izmjeni pacijenta: " + error.message);
  revalidatePath(`/admin/patients/${id}`);
  revalidatePath("/admin/patients");
}

export async function deletePatient(id: string): Promise<void> {
  const supabase = await db();
  const { error } = await supabase.from("patients").delete().eq("id", id);
  if (error) throw new Error("Greška pri brisanju pacijenta: " + error.message);
  revalidatePath("/admin/patients");
  redirect("/admin/patients");
}

export async function createRecord(patientId: string, formData: FormData): Promise<void> {
  const supabase = await db();
  const { error } = await supabase.from("records").insert({
    patient_id: patientId,
    date: s(formData, "date") || undefined,
    tooth: sOrNull(formData, "tooth"),
    description: s(formData, "description"),
    staff_id: sOrNull(formData, "staff_id"),
  });
  if (error) throw new Error("Greška pri dodavanju zapisa: " + error.message);
  revalidatePath(`/admin/patients/${patientId}`);
}

export async function deleteRecord(patientId: string, recordId: string): Promise<void> {
  const supabase = await db();
  const { error } = await supabase.from("records").delete().eq("id", recordId);
  if (error) throw new Error("Greška pri brisanju zapisa: " + error.message);
  revalidatePath(`/admin/patients/${patientId}`);
}

// ---------- staff ----------

function staffFromForm(formData: FormData) {
  return {
    first_name: s(formData, "first_name"),
    last_name: s(formData, "last_name"),
    role: s(formData, "role"),
    phone: sOrNull(formData, "phone"),
    email: sOrNull(formData, "email"),
    hired_at: sOrNull(formData, "hired_at"),
    notes: sOrNull(formData, "notes"),
    active: formData.get("active") === "on",
    is_doctor: formData.get("is_doctor") === "on",
  };
}

export async function createStaff(formData: FormData): Promise<void> {
  const supabase = await db();
  const staff = staffFromForm(formData);
  const { data, error } = await supabase
    .from("staff")
    .insert(staff)
    .select("id")
    .single();
  if (error) throw new Error("Greška pri kreiranju radnika: " + error.message);

  // Staff with an email immediately get a login account without a password:
  // they sign in with email only, and set the password on first login.
  if (staff.email) {
    const admin = getSupabase();
    if (admin) {
      const { data: account } = await admin.auth.admin.createUser({
        email: staff.email,
        email_confirm: true,
        user_metadata: { must_set_password: true },
      });
      if (account?.user) {
        await supabase.from("staff").update({ user_id: account.user.id }).eq("id", data.id);
      }
    }
  }

  revalidatePath("/admin/staff");
  redirect(`/admin/staff/${data.id}`);
}

export async function updateStaff(id: string, formData: FormData): Promise<void> {
  const supabase = await db();
  const { error } = await supabase.from("staff").update(staffFromForm(formData)).eq("id", id);
  if (error) throw new Error("Greška pri izmjeni radnika: " + error.message);
  revalidatePath(`/admin/staff/${id}`);
  revalidatePath("/admin/staff");
}

export async function deleteStaff(id: string): Promise<void> {
  const supabase = await db();
  const { error } = await supabase.from("staff").delete().eq("id", id);
  if (error) throw new Error("Greška pri brisanju radnika: " + error.message);
  revalidatePath("/admin/staff");
  redirect("/admin/staff");
}

// ---------- appointments ----------

export async function createAppointment(
  _prev: { error?: string },
  formData: FormData
): Promise<{ error?: string }> {
  const appointment = {
    date: s(formData, "date"),
    time: s(formData, "time"),
    name: s(formData, "name"),
    phone: sOrNull(formData, "phone"),
    email: sOrNull(formData, "email"),
    service: sOrNull(formData, "service"),
    notes: sOrNull(formData, "notes"),
    patient_id: sOrNull(formData, "patient_id"),
    staff_id: sOrNull(formData, "staff_id"),
    status: "confirmed" as const,
  };
  // "to arrange" request this appointment was created from — cancelled after booking
  const fromRequest = sOrNull(formData, "from");
  if (!appointment.name) return { error: "Ime je obavezno." };
  if (!dateInHorizon(appointment.date, ADMIN_HORIZON_DAYS)) return { error: "Odaberite ispravan datum." };
  if (!slotsForDay(parseDate(appointment.date).getDay()).includes(appointment.time)) {
    return { error: "Odaberite ispravno vrijeme." };
  }

  const supabase = await db();
  const { error } = await supabase.from("appointments").insert(appointment);
  if (error) {
    if (error.code === "23505") return { error: "Taj slot je već zauzet." };
    return { error: "Greška pri kreiranju termina: " + error.message };
  }
  if (fromRequest) {
    await supabase.from("appointments").update({ status: "cancelled" }).eq("id", fromRequest);
  }
  revalidatePath("/admin/calendar");
  redirect("/admin/calendar?date=" + appointment.date);
}

// ---------- posts (tips / news) ----------

const IMAGE_EXT = new Set(["jpg", "jpeg", "png", "webp", "gif"]);

function imageFromForm(formData: FormData, key = "image"): File | null {
  const image = formData.get(key);
  if (!(image instanceof File) || image.size === 0) return null;
  if (image.size > 4 * 1024 * 1024) throw new Error("Slika je prevelika (maks. 4 MB).");
  const ext = (image.name.split(".").pop() || "").toLowerCase().replace(/[^a-z0-9]/g, "");
  if (!IMAGE_EXT.has(ext) && !image.type.startsWith("image/")) {
    throw new Error("Dozvoljeni formati: JPG, PNG, WebP, GIF.");
  }
  return image;
}

function imageExt(image: File): string {
  const fromName = (image.name.split(".").pop() || "").toLowerCase().replace(/[^a-z0-9]/g, "");
  if (IMAGE_EXT.has(fromName)) return fromName === "jpeg" ? "jpg" : fromName;
  const fromType = (image.type.split("/")[1] || "jpg").toLowerCase();
  return IMAGE_EXT.has(fromType) ? (fromType === "jpeg" ? "jpg" : fromType) : "jpg";
}

function postFromForm(formData: FormData) {
  const category = s(formData, "category");
  return {
    title: s(formData, "title"),
    summary: sOrNull(formData, "summary"),
    content: sanitizeHtml(s(formData, "content")),
    category: CATEGORIES.includes(category) ? category : CATEGORIES[0],
    published: formData.get("published") === "on",
    date: s(formData, "date") || undefined,
  };
}

/** Upload a post cover image; undefined = image was not changed. */
async function uploadPostImage(
  supabase: Awaited<ReturnType<typeof db>>,
  postId: string,
  formData: FormData
): Promise<string | undefined> {
  const image = imageFromForm(formData);
  if (!image) return undefined;
  const path = `cover/${postId}.${imageExt(image)}`;
  const { error } = await supabase.storage
    .from("posts")
    .upload(path, image, { upsert: true, contentType: image.type || undefined });
  if (error) throw new Error("Greška pri uploadu slike: " + error.message);
  const { data: pub } = supabase.storage.from("posts").getPublicUrl(path);
  return `${pub.publicUrl}?v=${Date.now()}`;
}

/** Upload an image from the rich-text editor (into post content). */
export async function uploadContentImage(
  formData: FormData
): Promise<{ url?: string; error?: string }> {
  try {
    const supabase = await db();
    const image = imageFromForm(formData);
    if (!image) return { error: "Nema slike." };
    const path = `content/${crypto.randomUUID()}.${imageExt(image)}`;
    const { error } = await supabase.storage
      .from("posts")
      .upload(path, image, { contentType: image.type || undefined });
    if (error) return { error: "Greška pri uploadu slike: " + error.message };
    const { data: pub } = supabase.storage.from("posts").getPublicUrl(path);
    return { url: pub.publicUrl };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Upload nije uspio." };
  }
}

function revalidatePublicPosts() {
  revalidatePath("/");
  revalidatePath("/en");
  // /savjeti is a rewrite of /tips — revalidate the real routes in both locales
  revalidatePath("/tips", "layout");
  revalidatePath("/en/tips", "layout");
}

export async function createPost(formData: FormData): Promise<void> {
  const supabase = await db();
  const post = postFromForm(formData);
  if (!post.title || !textFromHtml(post.content)) {
    throw new Error("Naslov i sadržaj su obavezni.");
  }

  // unique slug: add a numeric suffix if taken
  const base = slugify(post.title) || "post";
  let slug = base;
  for (let i = 2; ; i++) {
    const { data } = await supabase.from("posts").select("id").eq("slug", slug).maybeSingle();
    if (!data) break;
    slug = `${base}-${i}`;
  }

  const { data, error } = await supabase
    .from("posts")
    .insert({ ...post, slug })
    .select("id")
    .single();
  if (error) throw new Error("Greška pri kreiranju objave: " + error.message);

  const imageUrl = await uploadPostImage(supabase, data.id, formData);
  if (imageUrl) {
    await supabase.from("posts").update({ image_url: imageUrl }).eq("id", data.id);
  }

  revalidatePath("/admin/posts");
  revalidatePublicPosts();
  redirect(`/admin/posts/${data.id}`);
}

export async function updatePost(id: string, formData: FormData): Promise<void> {
  const supabase = await db();
  const post = postFromForm(formData);
  if (!post.title || !textFromHtml(post.content)) {
    throw new Error("Naslov i sadržaj su obavezni.");
  }
  const imageUrl = await uploadPostImage(supabase, id, formData);
  const { error } = await supabase
    .from("posts")
    .update({ ...post, ...(imageUrl ? { image_url: imageUrl } : {}) })
    .eq("id", id);
  if (error) throw new Error("Greška pri izmjeni objave: " + error.message);
  revalidatePath(`/admin/posts/${id}`);
  revalidatePath("/admin/posts");
  revalidatePublicPosts();
}

export async function deletePost(id: string): Promise<void> {
  const supabase = await db();
  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) throw new Error("Greška pri brisanju objave: " + error.message);
  revalidatePath("/admin/posts");
  revalidatePublicPosts();
  redirect("/admin/posts");
}

// ---------- my profile ----------

export async function saveProfile(
  staffId: string,
  _prev: { error?: string; ok?: boolean },
  formData: FormData
): Promise<{ error?: string; ok?: boolean }> {
  const supabase = await db();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Niste prijavljeni." };

  const updates: Record<string, unknown> = {
    first_name: s(formData, "first_name"),
    last_name: s(formData, "last_name"),
    email: sOrNull(formData, "email"),
    phone: sOrNull(formData, "phone"),
    role: s(formData, "role") || "osoblje",
    biography: sOrNull(formData, "biography"),
    internal_notes: sOrNull(formData, "internal_notes"),
  };
  if (!updates.first_name || !updates.last_name) return { error: "Ime i prezime su obavezni." };

  const image = formData.get("image");
  if (image instanceof File && image.size > 0) {
    if (image.size > 4 * 1024 * 1024) return { error: "Slika je prevelika (maks. 4 MB)." };
    const ext = (image.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
    const path = `${staffId}.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(path, image, { upsert: true, contentType: image.type || undefined });
    if (uploadError) return { error: "Greška pri uploadu slike: " + uploadError.message };
    const { data: pub } = supabase.storage.from("avatars").getPublicUrl(path);
    // query param busts cache after replacing an image under the same name
    updates.image_url = `${pub.publicUrl}?v=${Date.now()}`;
  }

  const { error } = await supabase
    .from("staff")
    .update(updates)
    .eq("id", staffId)
    .eq("user_id", user.id);
  if (error) return { error: "Greška pri spremanju profila: " + error.message };

  revalidatePath("/admin/profile");
  revalidatePath("/admin/staff");
  return { ok: true };
}

export async function createMyProfile(formData: FormData): Promise<void> {
  const supabase = await db();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Niste prijavljeni.");

  const { error } = await supabase.from("staff").insert({
    first_name: s(formData, "first_name"),
    last_name: s(formData, "last_name"),
    role: s(formData, "role") || "osoblje",
    email: user.email ?? null,
    is_doctor: formData.get("is_doctor") === "on",
    user_id: user.id,
  });
  if (error) throw new Error("Greška pri kreiranju profila: " + error.message);
  revalidatePath("/admin/profile");
  revalidatePath("/admin/staff");
}

export async function linkAppointmentToPatient(
  appointmentId: string,
  patientId: string
): Promise<void> {
  const supabase = await db();
  const { error } = await supabase
    .from("appointments")
    .update({ patient_id: patientId })
    .eq("id", appointmentId);
  if (error) throw new Error("Greška pri povezivanju termina: " + error.message);
  revalidatePath("/admin/calendar");
  revalidatePath(`/admin/patients/${patientId}`);
  revalidatePath("/admin");
}

/** Create a patient chart from a public request and link the appointment to it. */
export async function createChartFromAppointment(appointmentId: string): Promise<void> {
  const supabase = await db();
  const { data: appointment } = await supabase
    .from("appointments")
    .select("*")
    .eq("id", appointmentId)
    .maybeSingle();
  if (!appointment) throw new Error("Termin nije pronađen.");

  const parts = String(appointment.name ?? "").trim().split(/\s+/);
  const { data: patient, error } = await supabase
    .from("patients")
    .insert({
      first_name: parts[0] || "—",
      last_name: parts.slice(1).join(" ") || "—",
      phone: appointment.phone,
      staff_id: appointment.staff_id,
    })
    .select("id")
    .single();
  if (error) throw new Error("Greška pri kreiranju kartona: " + error.message);

  await supabase.from("appointments").update({ patient_id: patient.id }).eq("id", appointmentId);
  revalidatePath("/admin/calendar");
  redirect(`/admin/patients/${patient.id}`);
}

/** Occupied slots for a day (with patient name) — for the new-appointment calendar. */
export async function getBookedAdmin(
  date: string,
  staffId: string | null
): Promise<{ time: string; name: string }[]> {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return [];
  const supabase = await db();
  let query = supabase
    .from("appointments")
    .select("time, name")
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
  return (data ?? []).map((r) => ({ time: String(r.time).slice(0, 5), name: r.name }));
}

/**
 * Complete an appointment with an optional procedure note. The note is stored
 * on the appointment, and if it is linked to a patient chart, also in records.
 */
export async function completeAppointment(appointmentId: string, formData: FormData): Promise<void> {
  const supabase = await db();
  const report = sOrNull(formData, "report");

  const { data: appointment, error } = await supabase
    .from("appointments")
    .update({ status: "completed", ...(report ? { report } : {}) })
    .eq("id", appointmentId)
    .select("*")
    .single();
  if (error) throw new Error("Greška pri završavanju termina: " + error.message);

  if (report && appointment.patient_id) {
    const { error: recordError } = await supabase.from("records").insert({
      patient_id: appointment.patient_id,
      staff_id: appointment.staff_id,
      date: appointment.date ?? undefined,
      description: report,
    });
    if (recordError) console.error("Chart record insert failed:", recordError);
    revalidatePath(`/admin/patients/${appointment.patient_id}`);
  }

  revalidatePath("/admin/calendar");
  revalidatePath("/admin");
}

/** Assign (or change) the doctor for an appointment, guarding against a double-booked slot. */
export async function assignDoctor(appointmentId: string, formData: FormData): Promise<void> {
  const supabase = await db();
  const staffId = sOrNull(formData, "staff_id");
  const { data: existing } = await supabase
    .from("appointments")
    .select("date")
    .eq("id", appointmentId)
    .maybeSingle();

  const { error } = await supabase
    .from("appointments")
    .update({ staff_id: staffId })
    .eq("id", appointmentId);
  if (error) {
    if (error.code === "23505") {
      const date = existing?.date ? `date=${existing.date}&` : "";
      redirect(`/admin/calendar?${date}error=slot-taken`);
    }
    throw new Error("Greška pri dodjeli doktora: " + error.message);
  }
  revalidatePath("/admin/calendar");
  revalidatePath("/admin");
}

export async function changeAppointmentStatus(id: string, status: AppointmentStatus): Promise<void> {
  const supabase = await db();
  const { error } = await supabase.from("appointments").update({ status }).eq("id", id);
  if (error) throw new Error("Greška pri izmjeni termina: " + error.message);
  revalidatePath("/admin/calendar");
  revalidatePath("/admin");
}
