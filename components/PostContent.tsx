import { escapeHtml, isHtml, sanitizeHtml } from "@/lib/html";
import { paragraphs } from "@/lib/posts";

/** Render post content (HTML from the editor or legacy plain text). */
export default function PostContent({ content }: { content: string }) {
  const html = isHtml(content)
    ? sanitizeHtml(content)
    : paragraphs(content)
        .map((p) => `<p>${escapeHtml(p)}</p>`)
        .join("");
  return <div className="post-content" dangerouslySetInnerHTML={{ __html: html }} />;
}
