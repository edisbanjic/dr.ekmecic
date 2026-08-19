import Link from "next/link";
import NoSupabase from "@/components/admin/NoSupabase";
import { CATEGORIES, CATEGORY_COLORS } from "@/lib/posts";
import { getSupabaseServer } from "@/lib/supabase-server";
import type { Post } from "@/lib/types";

const PAGE_SIZE = 12;

function statusTone(published: boolean) {
  return published
    ? { color: "#3E6B4A", background: "#E3EFE4" }
    : { color: "#8A8378", background: "#EFEAE0" };
}

function paramSlug(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function matchesQuery(post: Post, query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return `${post.title} ${post.summary ?? ""}`.toLowerCase().includes(q);
}

function copyParams(params: Record<string, string | undefined>) {
  const next = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value) next.set(key, value);
  }
  return next;
}

function CategorySection({
  title,
  posts,
  tone,
  searchKey,
  pageKey,
  allParams,
}: {
  title: string;
  posts: Post[];
  tone: { color: string; bg: string };
  searchKey: string;
  pageKey: string;
  allParams: Record<string, string | undefined>;
}) {
  const queryText = allParams[searchKey]?.trim() ?? "";
  const currentPage = Math.max(1, Number.parseInt(allParams[pageKey] ?? "1", 10) || 1);
  const filteredPosts = posts.filter((post) => matchesQuery(post, queryText));
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const start = (safePage - 1) * PAGE_SIZE;
  const visiblePosts = filteredPosts.slice(start, start + PAGE_SIZE);

  const hrefForPage = (targetPage: number) => {
    const params = copyParams(allParams);
    if (targetPage > 1) params.set(pageKey, String(targetPage));
    else params.delete(pageKey);
    return `/admin/posts${params.toString() ? `?${params.toString()}` : ""}`;
  };
  const resetHref = (() => {
    const params = copyParams(allParams);
    params.delete(searchKey);
    params.delete(pageKey);
    return `/admin/posts${params.toString() ? `?${params.toString()}` : ""}`;
  })();

  return (
    <section style={{ border: "1px solid #F2E9DB", borderRadius: "18px", overflow: "hidden" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          flexWrap: "wrap",
          padding: "14px 16px",
          background: "#FCF9F3",
          borderBottom: "1px solid #F2E9DB",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
          <span className="adm-badge" style={{ color: tone.color, background: tone.bg }}>
            {title}
          </span>
          <strong style={{ fontSize: "14px" }}>
            {queryText ? `${filteredPosts.length} / ${posts.length} objava` : `${posts.length} objava`}
          </strong>
        </div>
      </div>

      <div style={{ padding: "14px 16px", borderBottom: "1px solid #F2E9DB", background: "#FFFFFF" }}>
        <form method="get" style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {Object.entries(allParams).map(([key, value]) => {
            if (!value || key === searchKey || key === pageKey) return null;
            return <input key={key} type="hidden" name={key} value={value} />;
          })}
          <input
            type="search"
            name={searchKey}
            defaultValue={queryText}
            placeholder={`Pretraži ${title.toLowerCase()}...`}
            style={{
              flex: "1 1 260px",
              minWidth: 0,
              padding: "11px 14px",
              borderRadius: "14px",
              border: "2px solid #EDE5D4",
              background: "#FDFBF6",
              fontSize: "14.5px",
            }}
          />
          <button type="submit" className="adm-btn secondary sm">Pretraži</button>
          {queryText ? (
            <Link href={resetHref} className="adm-btn secondary sm">
              Reset
            </Link>
          ) : null}
        </form>
      </div>

      {visiblePosts.length === 0 ? (
        <div className="adm-empty" style={{ padding: "24px 16px" }}>
          Nema objava za ovu pretragu.
        </div>
      ) : (
        <table className="adm-table">
          <thead>
            <tr>
              <th>NASLOV</th>
              <th>DATUM</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {visiblePosts.map((o) => (
              <tr key={o.id}>
                <td>
                  <Link href={`/admin/posts/${o.id}`}>{o.title}</Link>
                </td>
                <td style={{ whiteSpace: "nowrap" }}>{o.date}</td>
                <td>
                  <span className="adm-badge" style={statusTone(o.published)}>
                    {o.published ? "Objavljena" : "Skica"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {filteredPosts.length > PAGE_SIZE && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "10px",
            flexWrap: "wrap",
            padding: "14px 16px",
            borderTop: "1px solid #F2E9DB",
            background: "#FCF9F3",
          }}
        >
          <div style={{ fontSize: "13px", fontWeight: 800, opacity: 0.6 }}>
            Stranica {safePage} / {totalPages}
          </div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <Link
              href={hrefForPage(Math.max(1, safePage - 1))}
              className="adm-btn secondary sm"
              aria-disabled={safePage <= 1}
              style={safePage <= 1 ? { pointerEvents: "none", opacity: 0.45 } : undefined}
            >
              ← Prethodna
            </Link>
            <Link
              href={hrefForPage(Math.min(totalPages, safePage + 1))}
              className="adm-btn secondary sm"
              aria-disabled={safePage >= totalPages}
              style={safePage >= totalPages ? { pointerEvents: "none", opacity: 0.45 } : undefined}
            >
              Sljedeća →
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}

export default async function PostsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const supabase = await getSupabaseServer();
  if (!supabase) return <NoSupabase />;
  const params = await searchParams;

  const { data } = await supabase
    .from("posts")
    .select("*")
    .order("date", { ascending: false });
  const posts = (data ?? []) as Post[];
  const groupedPosts = CATEGORIES.map((category) => ({
    category,
    posts: posts.filter((post) => post.category === category),
  })).filter((group) => group.posts.length > 0);
  const uncategorizedPosts = posts.filter((post) => !CATEGORIES.includes(post.category));

  return (
    <>
      <div className="adm-heading">
        <h1>Objave</h1>
        <Link href="/admin/posts/new" className="adm-btn">+ Nova objava</Link>
      </div>

      <div className="adm-card">
        {posts.length === 0 ? (
          <div className="adm-empty">
            Još nema objava — napišite prvu.
          </div>
        ) : (
          <div style={{ display: "grid", gap: "18px" }}>
            {groupedPosts.map((group) => {
              const tone = CATEGORY_COLORS[group.category];
              const slug = paramSlug(group.category);
              return (
                <CategorySection
                  key={group.category}
                  title={group.category}
                  posts={group.posts}
                  tone={tone}
                  searchKey={`q-${slug}`}
                  pageKey={`page-${slug}`}
                  allParams={params}
                />
              );
            })}

            {uncategorizedPosts.length > 0 && (
              <CategorySection
                title="Ostalo"
                posts={uncategorizedPosts}
                tone={{ color: "#8A8378", bg: "#EFEAE0" }}
                searchKey="q-ostalo"
                pageKey="page-ostalo"
                allParams={params}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
}
