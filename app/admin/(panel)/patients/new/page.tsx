import { createPatient } from "@/app/admin/actions";
import NoSupabase from "@/components/admin/NoSupabase";
import PatientFields from "@/components/admin/PatientFields";
import { getDoctorsAdmin } from "@/lib/admin";
import { getSupabaseServer } from "@/lib/supabase-server";

export default async function NewPatientPage() {
  const supabase = await getSupabaseServer();
  if (!supabase) return <NoSupabase />;

  const doctors = await getDoctorsAdmin(supabase);

  return (
    <>
      <div className="adm-heading">
        <h1>Novi pacijent</h1>
      </div>
      <div className="adm-card" style={{ maxWidth: "720px" }}>
        <form action={createPatient} className="adm-form">
          <PatientFields doctors={doctors} />
          <div className="full">
            <button type="submit" className="adm-btn">Kreiraj karton</button>
          </div>
        </form>
      </div>
    </>
  );
}
