import CoverImage from "@/components/admin/CoverImage";
import ContentEditor from "@/components/admin/ContentEditorLazy";
import { CATEGORIES } from "@/lib/posts";
import { formatDate } from "@/lib/appointments";
import type { Post } from "@/lib/types";

/** Shared fields for creating and editing a post. */
export default function PostFields({ post }: { post?: Post }) {
  return (
    <>
      <label className="full">
        <span>Naslov</span>
        <input required name="title" defaultValue={post?.title ?? ""} placeholder="npr. Kako pobijediti strah od zubara?" />
      </label>
      <label>
        <span>Datum</span>
        <input type="date" name="date" defaultValue={post?.date ?? formatDate(new Date())} />
      </label>
      <label>
        <span>Kategorija</span>
        <select name="category" defaultValue={post?.category ?? CATEGORIES[0]}>
          {CATEGORIES.map((k) => (
            <option key={k} value={k}>{k}</option>
          ))}
        </select>
      </label>
      <label className="full">
        <span>Sažetak (kratki uvod na kartici)</span>
        <input name="summary" defaultValue={post?.summary ?? ""} placeholder="Rečenica-dvije koje mame na čitanje…" />
      </label>
      <CoverImage url={post?.image_url} />
      <ContentEditor content={post?.content} />
      <label className="full" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <input type="checkbox" name="published" defaultChecked={post?.published ?? false} style={{ width: "auto" }} />
        <span style={{ margin: 0 }}>Objavljena — vidljiva na sajtu</span>
      </label>
    </>
  );
}
