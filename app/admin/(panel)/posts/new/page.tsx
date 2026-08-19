import { createPost } from "@/app/admin/actions";
import NoSupabase from "@/components/admin/NoSupabase";
import PostFields from "@/components/admin/PostFields";
import { getSupabaseServer } from "@/lib/supabase-server";

export default async function NewPostPage() {
  const supabase = await getSupabaseServer();
  if (!supabase) return <NoSupabase />;

  return (
    <>
      <div className="adm-heading">
        <h1>Nova objava</h1>
      </div>
      <div className="adm-card" style={{ maxWidth: "820px" }}>
        <form action={createPost} className="adm-form">
          <PostFields />
          <div className="full">
            <button type="submit" className="adm-btn">Sačuvaj objavu</button>
          </div>
        </form>
      </div>
    </>
  );
}
