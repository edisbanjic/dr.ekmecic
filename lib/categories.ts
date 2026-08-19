// Post categories — pure constants, safe to import from client components
// (lib/posts.ts pulls in the Supabase client, so keep these separate).

export const CATEGORIES = ["Savjeti", "Novosti", "Iz ordinacije"];

/** Badge colors by category (site palette). */
export const CATEGORY_COLORS: Record<string, { color: string; bg: string }> = {
  Savjeti: { color: "#3E5F86", bg: "#E7F0FB" },
  Novosti: { color: "#A05A42", bg: "#FBE7DA" },
  "Iz ordinacije": { color: "#3E6B4A", bg: "#E3EFE4" },
};
