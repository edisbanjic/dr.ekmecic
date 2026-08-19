import { notFound } from "next/navigation";
import { deleteStaff, updateStaff } from "@/app/admin/actions";
import ConfirmButton from "@/components/admin/ConfirmButton";
import NoSupabase from "@/components/admin/NoSupabase";
import StaffFields from "@/components/admin/StaffFields";
import { getSupabaseServer } from "@/lib/supabase-server";
import type { Staff } from "@/lib/types";

export default async function StaffMemberPage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await getSupabaseServer();
  if (!supabase) return <NoSupabase />;

  const { id } = await params;
  const { data } = await supabase.from("staff").select("*").eq("id", id).maybeSingle();
  const member = data as Staff | null;
  if (!member) notFound();

  return (
    <>
      <div className="adm-heading">
        <h1>
          {member.last_name}, {member.first_name}
        </h1>
        <ConfirmButton action={deleteStaff.bind(null, member.id)} message="Obrisati karton radnika?">
          Obriši karton
        </ConfirmButton>
      </div>
      <div className="adm-card" style={{ maxWidth: "720px" }}>
        <form action={updateStaff.bind(null, member.id)} className="adm-form">
          <StaffFields staff={member} />
          <div className="full">
            <button type="submit" className="adm-btn">Spremi izmjene</button>
          </div>
        </form>
      </div>
    </>
  );
}
