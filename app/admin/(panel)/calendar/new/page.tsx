import NoSupabase from "@/components/admin/NoSupabase";
import AppointmentForm from "@/components/admin/AppointmentForm";
import { getSupabaseServer } from "@/lib/supabase-server";
import type { Patient, Staff, Appointment } from "@/lib/types";

export default async function NewAppointmentPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const supabase = await getSupabaseServer();
  if (!supabase) return <NoSupabase />;

  const { from } = await searchParams;
  const [patients, staff, source] = await Promise.all([
    supabase.from("patients").select("*").order("last_name"),
    supabase.from("staff").select("*").eq("active", true).order("last_name"),
    from
      ? supabase.from("appointments").select("*").eq("id", from).maybeSingle()
      : Promise.resolve({ data: null }),
  ]);

  const fromAppointment = (source.data as Appointment | null) ?? null;

  return (
    <>
      <div className="adm-heading">
        <h1>Novi termin</h1>
      </div>
      {fromAppointment && (
        <p style={{ marginTop: "-10px", marginBottom: "20px", fontWeight: 800, opacity: 0.6 }}>
          Podaci su preneseni iz zahtjeva „{fromAppointment.name}" — zahtjev se automatski otkazuje
          kad zakažete termin.
        </p>
      )}
      <div className="adm-card" style={{ maxWidth: "720px" }}>
        <AppointmentForm
          patients={(patients.data ?? []) as Patient[]}
          staff={(staff.data ?? []) as Staff[]}
          fromAppointment={fromAppointment}
        />
      </div>
    </>
  );
}
