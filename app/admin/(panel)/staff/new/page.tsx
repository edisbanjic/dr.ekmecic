import { createStaff } from "@/app/admin/actions";
import NoSupabase from "@/components/admin/NoSupabase";
import StaffFields from "@/components/admin/StaffFields";
import { getSupabaseServer } from "@/lib/supabase-server";

export default async function NewStaffPage() {
  const supabase = await getSupabaseServer();
  if (!supabase) return <NoSupabase />;

  return (
    <>
      <div className="adm-heading">
        <h1>Novi radnik</h1>
      </div>
      <div className="adm-card" style={{ maxWidth: "720px" }}>
        <form action={createStaff} className="adm-form">
          <StaffFields />
          <div className="full">
            <button type="submit" className="adm-btn">Kreiraj karton</button>
          </div>
        </form>
      </div>
    </>
  );
}
