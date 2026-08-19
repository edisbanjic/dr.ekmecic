import { notFound } from "next/navigation";
import { deletePost, updatePost } from "@/app/admin/actions";
import ConfirmButton from "@/components/admin/ConfirmButton";
import NoSupabase from "@/components/admin/NoSupabase";
import PostFields from "@/components/admin/PostFields";
import { getSupabaseServer } from "@/lib/supabase-server";
import type { Post } from "@/lib/types";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await getSupabaseServer();
  if (!supabase) return <NoSupabase />;

  const { id } = await params;
  const { data } = await supabase.from("posts").select("*").eq("id", id).maybeSingle();
  const post = data as Post | null;
  if (!post) notFound();

  return (
    <>
      <div className="adm-heading">
        <h1>Izmjena objave</h1>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {post.published && (
            <a href={`/savjeti/${post.slug}`} target="_blank" rel="noopener" className="adm-btn secondary sm">
              Pogledaj na sajtu →
            </a>
          )}
          <ConfirmButton action={deletePost.bind(null, post.id)} message="Obrisati ovu objavu?">
            Obriši
          </ConfirmButton>
        </div>
      </div>
      <div className="adm-card" style={{ maxWidth: "820px" }}>
        <form action={updatePost.bind(null, post.id)} className="adm-form">
          <PostFields post={post} />
          <div className="full">
            <button type="submit" className="adm-btn">Spremi izmjene</button>
          </div>
        </form>
      </div>
    </>
  );
}
