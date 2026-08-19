/** Whether the string already contains HTML tags (new rich-text records). */
export function isHtml(content: string): boolean {
  return /<[a-z][\s\S]*>/i.test(content);
}

export function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Old plain-text records → paragraphs; HTML is left untouched. */
export function textToHtml(content: string): string {
  if (!content.trim()) return "";
  if (isHtml(content)) return content;
  return content
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => `<p>${escapeHtml(p).replace(/\n/g, "<br>")}</p>`)
    .join("");
}

const ALLOWED = new Set([
  "p", "h1", "h2", "h3", "strong", "em", "b", "i", "u", "s", "strike",
  "ul", "ol", "li", "a", "img", "br", "blockquote", "hr", "span",
]);

function attr(attrs: string, name: string): string | null {
  const m = attrs.match(new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, "i"));
  return m ? (m[1] ?? m[2] ?? m[3] ?? "") : null;
}

function escapeAttr(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

function isSafeUrl(url: string, image: boolean): boolean {
  const u = url.trim();
  if (!u || /^javascript:/i.test(u) || /^vbscript:/i.test(u)) return false;
  if (u.startsWith("/") && !u.startsWith("//")) return true;
  if (/^https?:\/\//i.test(u)) return true;
  if (!image && /^(mailto:|tel:)/i.test(u)) return true;
  return false;
}

/** Strip scripts and keep only tags the editor can produce. */
export function sanitizeHtml(html: string): string {
  let out = html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "");

  out = out.replace(/<\/?([a-z][a-z0-9]*)\b([^>]*)>/gi, (full, tag: string, attrs: string) => {
    const t = tag.toLowerCase();
    const closing = full.startsWith("</");
    if (!ALLOWED.has(t)) return "";
    if (t === "br" || t === "hr") return closing ? "" : `<${t}>`;
    if (t === "img") {
      if (closing) return "";
      const src = attr(attrs, "src");
      const alt = attr(attrs, "alt") ?? "";
      if (!src || !isSafeUrl(src, true)) return "";
      return `<img src="${escapeAttr(src)}" alt="${escapeAttr(alt)}">`;
    }
    if (t === "a") {
      if (closing) return "</a>";
      const href = attr(attrs, "href");
      if (!href || !isSafeUrl(href, false)) return "<a>";
      return `<a href="${escapeAttr(href)}" rel="noopener noreferrer" target="_blank">`;
    }
    return closing ? `</${t}>` : `<${t}>`;
  });

  return out;
}

/** Text without tags — for empty-content validation. */
export function textFromHtml(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}
