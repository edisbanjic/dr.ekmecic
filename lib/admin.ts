import type { SupabaseClient } from "@supabase/supabase-js";
import type { Staff } from "./types";

/**
 * Staff record linked to the signed-in account. If the link does not exist
 * yet, it is established via email: the record whose email matches the
 * login email becomes "mine" on first visit.
 */
export async function getMyStaff(supabase: SupabaseClient): Promise<Staff | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("staff")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();
  if (data) return data as Staff;

  if (!user.email) return null;
  const { data: byEmail } = await supabase
    .from("staff")
    .select("*")
    .ilike("email", user.email)
    .is("user_id", null)
    .limit(1);
  const record = (byEmail?.[0] as Staff) ?? null;
  if (!record) return null;

  const { data: linked } = await supabase
    .from("staff")
    .update({ user_id: user.id })
    .eq("id", record.id)
    .is("user_id", null)
    .select("*")
    .maybeSingle();
  return (linked as Staff) ?? { ...record, user_id: user.id };
}

/** Active doctors (for admin filter dropdowns). */
export async function getDoctorsAdmin(supabase: SupabaseClient): Promise<Staff[]> {
  const { data } = await supabase
    .from("staff")
    .select("*")
    .eq("is_doctor", true)
    .eq("active", true)
    .order("last_name");
  return (data ?? []) as Staff[];
}
