"use client";

import { useEffect, useRef, useState } from "react";
import { analyzeSeo, excerpt, SEO_LIMITS, type SeoCheckStatus } from "@/lib/seo-analysis";
import { slugify } from "@/lib/slug";
import type { Post } from "@/lib/types";

const SITE_NAME = "Dr. Ekmečić";
const SITE_HOST = "dr-kamalaekmecic.com";
const DEFAULT_SHARE = "/assets/og-image.jpg";

const ICON: Record<SeoCheckStatus, { mark: string; color: string }> = {
  good: { mark: "✓", color: "#2E8B57" },
  ok: { mark: "!", color: "#D08A1E" },
  bad: { mark: "✕", color: "#D0473A" },
};
const ORDER: Record<SeoCheckStatus, number> = { bad: 0, ok: 1, good: 2 };

const hint: React.CSSProperties = { margin: "6px 0 0", fontSize: "12.5px", fontWeight: 700, opacity: 0.55 };
const cap: React.CSSProperties = {
  margin: "0 0 8px", fontSize: "11.5px", fontWeight: 800, letterSpacing: ".08em",
  textTransform: "uppercase", opacity: 0.55,
};

function truncate(text: string, max: number) {
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
}

function Counter({ value, limits }: { value: string; limits: { min: number; max: number } }) {
  const len = value.trim().length;
  const color = !len ? "inherit" : len < limits.min ? "#D08A1E" : len <= limits.max ? "#2E8B57" : "#D0473A";
  return (
    <span style={{ float: "right", fontSize: "12px", fontWeight: 800, color, opacity: len ? 1 : 0.45 }}>
      {len} / {limits.min}–{limits.max}
    </span>
  );
}

type FormSnapshot = { title: string; summary: string; content: string; slug: string; imageAlt: string; coverFile: string | null };

/** Values the rest of the post form owns (title, content…), read live from the <form>. */
function readForm(form: HTMLFormElement | null, prev: FormSnapshot): FormSnapshot {
  if (!form) return prev;
  const get = (name: string) => {
    // Element or RadioNodeList — both expose `value`.
    const el = form.elements.namedItem(name) as { value?: string } | null;
    return el?.value ?? "";
  };
  const file = form.elements.namedItem("image");
  const picked = file instanceof HTMLInputElement ? file.files?.[0] : undefined;
  return {
    title: get("title"),
    summary: get("summary"),
    content: get("content"),
    slug: get("slug"),
    imageAlt: get("image_alt"),
    coverFile: picked ? picked.name : null,
  };
}

/** SEO section of the post form: fields + live score, Google and share previews, checklist. */
export default function PostSeo({ post }: { post?: Post }) {
  const ref = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState<FormSnapshot>({
    title: post?.title ?? "",
    summary: post?.summary ?? "",
    content: post?.content ?? "",
    slug: post?.slug ?? "",
    imageAlt: post?.image_alt ?? "",
    coverFile: null,
  });
  const [keyword, setKeyword] = useState(post?.focus_keyword ?? "");
  const [seoTitle, setSeoTitle] = useState(post?.seo_title ?? "");
  const [seoDescription, setSeoDescription] = useState(post?.seo_description ?? "");
  const [ogPreview, setOgPreview] = useState<string | null>(post?.og_image ?? null);

  // The editor writes its HTML into a hidden input without firing events, so poll.
  useEffect(() => {
    const formEl = ref.current?.closest("form") ?? null;
    const tick = () =>
      setForm((prev) => {
        const next = readForm(formEl, prev);
        return JSON.stringify(next) === JSON.stringify(prev) ? prev : next;
      });
    tick();
    const id = window.setInterval(tick, 700);
    return () => window.clearInterval(id);
  }, []);

  const slug = form.slug || post?.slug || slugify(form.title) || "naslov-objave";
  const effectiveTitle = seoTitle.trim() || (form.title ? `${form.title} | ${SITE_NAME}` : "");
  const effectiveDescription = seoDescription.trim() || form.summary.trim() || excerpt(form.content, 160);
  const hasCover = Boolean(form.coverFile || post?.image_url);
  const shareImage = ogPreview || post?.image_url || DEFAULT_SHARE;

  const analysis = analyzeSeo({
    title: effectiveTitle,
    description: effectiveDescription,
    slug,
    contentHtml: form.content,
    focusKeyword: keyword,
    coverImage: hasCover ? "cover" : null,
    coverImageAlt: form.imageAlt,
    ogImage: ogPreview,
  });
  const checks = [...analysis.checks].sort((a, b) => ORDER[a.status] - ORDER[b.status]);
  const scoreColor = analysis.score >= 80 ? "#2E8B57" : analysis.score >= 50 ? "#D08A1E" : "#D0473A";

  return (
    <div ref={ref} className="full" style={{ borderTop: "2px solid #EDE5D4", paddingTop: "18px", marginTop: "6px" }}>
      <h2 style={{ margin: "0 0 4px", fontSize: "18px" }}>SEO i dijeljenje</h2>
      <p style={{ ...hint, marginBottom: "16px" }}>
        Sve je opcionalno — prazna polja koriste naslov, sažetak i cover sliku.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))", gap: "24px", alignItems: "start" }}>
        {/* fields */}
        <div style={{ display: "grid", gap: "16px", minWidth: 0 }}>
          <label>
            <span>Ključna riječ (fraza)</span>
            <input
              name="focus_keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="npr. strah od zubara"
            />
            <p style={hint}>Ono što bi pacijent ukucao u Google. Ne prikazuje se na stranici — služi za provjere.</p>
          </label>
          <label>
            <span>
              SEO naslov <Counter value={effectiveTitle} limits={SEO_LIMITS.title} />
            </span>
            <input
              name="seo_title"
              value={seoTitle}
              onChange={(e) => setSeoTitle(e.target.value)}
              placeholder={form.title ? `${form.title} | ${SITE_NAME}` : "Naslov u Google rezultatima"}
            />
          </label>
          <label>
            <span>
              Meta opis <Counter value={effectiveDescription} limits={SEO_LIMITS.description} />
            </span>
            <textarea
              name="seo_description"
              rows={3}
              value={seoDescription}
              onChange={(e) => setSeoDescription(e.target.value)}
              placeholder={form.summary || "Kratak opis ispod naslova na Googleu"}
            />
          </label>
          <label>
            <span>Posebna slika za dijeljenje (opcionalno)</span>
            <input
              type="file"
              name="og_image"
              accept="image/jpeg,image/png,image/webp"
              onChange={(e) => {
                const f = e.target.files?.[0];
                setOgPreview(f ? URL.createObjectURL(f) : post?.og_image ?? null);
              }}
            />
            <p style={hint}>Najbolje 1200×630 px, JPG ili PNG. Bez nje se koristi cover slika.</p>
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <input type="checkbox" name="no_index" defaultChecked={post?.no_index ?? false} style={{ width: "auto" }} />
            <span style={{ margin: 0 }}>Sakrij od Googlea (noindex) — npr. kratka obavijest</span>
          </label>
        </div>

        {/* previews + checks */}
        <div style={{ display: "grid", gap: "18px", minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "56px", height: "56px", borderRadius: "999px", background: scoreColor, color: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "19px",
              }}
            >
              {analysis.score}
            </div>
            <div>
              <div style={{ fontWeight: 900 }}>SEO ocjena</div>
              <div style={{ fontSize: "12.5px", fontWeight: 700, opacity: 0.6 }}>
                {analysis.wordCount} riječi · ~{Math.max(1, Math.round(analysis.wordCount / 200))} min čitanja
              </div>
            </div>
          </div>

          <div>
            <p style={cap}>Google pregled</p>
            <div style={{ background: "#fff", border: "1px solid #E4E0D8", borderRadius: "12px", padding: "14px 16px", fontFamily: "Arial, sans-serif" }}>
              <div style={{ fontSize: "12px", color: "#4D5156", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {SITE_HOST} › savjeti › {slug}
              </div>
              <div style={{ marginTop: "4px", fontSize: "18px", lineHeight: 1.3, color: "#1A0DAB" }}>
                {truncate(effectiveTitle || "Naslov objave", SEO_LIMITS.title.max + 5)}
              </div>
              <div style={{ marginTop: "4px", fontSize: "13.5px", lineHeight: 1.45, color: "#4D5156" }}>
                {truncate(effectiveDescription || "Dodajte meta opis ili sažetak.", SEO_LIMITS.description.max + 5)}
              </div>
            </div>
          </div>

          <div>
            <p style={cap}>Facebook / Viber / WhatsApp pregled</p>
            <div style={{ border: "1px solid #E4E0D8", borderRadius: "12px", overflow: "hidden", background: "#fff" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={shareImage} alt="" style={{ display: "block", width: "100%", aspectRatio: "1200/630", objectFit: "cover" }} />
              <div style={{ padding: "10px 12px", background: "#F2F3F5" }}>
                <div style={{ fontSize: "11px", textTransform: "uppercase", color: "#65676B" }}>{SITE_HOST}</div>
                <div style={{ fontSize: "14.5px", fontWeight: 700, lineHeight: 1.3 }}>
                  {truncate(seoTitle.trim() || form.title || "Naslov objave", 90)}
                </div>
                <div style={{ fontSize: "12.5px", color: "#65676B", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {effectiveDescription}
                </div>
              </div>
            </div>
            {!form.coverFile && !ogPreview && !post?.image_url && (
              <p style={hint}>Nema covera ni posebne slike — koristi se opća slika ordinacije.</p>
            )}
          </div>

          <div>
            <p style={cap}>Provjere</p>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "7px" }}>
              {checks.map((c) => (
                <li key={c.id} style={{ display: "flex", gap: "9px", fontSize: "13.5px", fontWeight: 600, lineHeight: 1.4 }}>
                  <span style={{ color: ICON[c.status].color, fontWeight: 900, width: "14px", flexShrink: 0, textAlign: "center" }}>
                    {ICON[c.status].mark}
                  </span>
                  <span>{c.message}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
