import { CATEGORIES } from "./categories";
import { getSupabase } from "./supabase";
import type { Post } from "./types";

// re-exported for existing imports; the source of truth is the pure module
export { CATEGORIES, CATEGORY_COLORS } from "./categories";
export { formatPrettyDate } from "./i18n";

/** Published posts, newest first; optionally filtered by category. */
export async function getPosts(limit?: number, category?: string): Promise<Post[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  let query = supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("date", { ascending: false });
  if (category && CATEGORIES.includes(category)) query = query.eq("category", category);
  if (limit) query = query.limit(limit);
  const { data, error } = await query;
  if (error) {
    console.error("Failed to load posts:", error);
    return [];
  }
  return (data ?? []) as Post[];
}

export async function getPost(slug: string): Promise<Post | null> {
  const supabase = getSupabase();
  if (!supabase) return null;
  const { data } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  return (data as Post) ?? null;
}

/** Split content into paragraphs: a blank line separates them. */
export function paragraphs(content: string): string[] {
  return content
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
}
