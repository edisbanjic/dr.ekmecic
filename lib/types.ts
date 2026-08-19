export type Patient = {
  id: string;
  created_at: string;
  first_name: string;
  last_name: string;
  phone: string | null;
  email: string | null;
  date_of_birth: string | null;
  address: string | null;
  allergies: string | null;
  notes: string | null;
  staff_id: string | null;
};

export type Staff = {
  id: string;
  created_at: string;
  first_name: string;
  last_name: string;
  role: string;
  phone: string | null;
  email: string | null;
  hired_at: string | null;
  notes: string | null;
  active: boolean;
  is_doctor: boolean;
  user_id: string | null;
  image_url: string | null;
  biography: string | null;
  internal_notes: string | null;
};

/** Publicly visible doctor fields (dropdown on the site). */
export type Doctor = {
  id: string;
  first_name: string;
  last_name: string;
};

export type AppointmentStatus = "pending" | "confirmed" | "cancelled" | "completed";

export type Appointment = {
  id: string;
  created_at: string;
  /** null = patient is waiting for the clinic to propose a time */
  date: string | null;
  time: string | null;
  duration_min: number;
  name: string;
  phone: string | null;
  email: string | null;
  service: string | null;
  notes: string | null;
  report: string | null;
  status: AppointmentStatus;
  patient_id: string | null;
  staff_id: string | null;
};

export type Post = {
  id: string;
  created_at: string;
  title: string;
  slug: string;
  summary: string | null;
  content: string;
  image_url: string | null;
  category: string;
  published: boolean;
  date: string;
};

export type ChartRecord = {
  id: string;
  created_at: string;
  patient_id: string;
  staff_id: string | null;
  date: string;
  tooth: string | null;
  description: string;
};

export function fullName(p: { first_name: string; last_name: string }): string {
  return `${p.first_name} ${p.last_name}`.trim();
}
