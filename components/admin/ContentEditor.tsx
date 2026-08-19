"use client";

import { useEffect, useRef, useState } from "react";
import { uploadContentImage } from "@/app/admin/actions";
import { textFromHtml, textToHtml } from "@/lib/html";
import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";

const TOOLS: { cmd: string; label: string; title: string; run: (ed: Editor) => void }[] = [
  { cmd: "bold", label: "B", title: "Podebljano", run: (ed) => ed.chain().focus().toggleBold().run() },
  { cmd: "italic", label: "I", title: "Kurziv", run: (ed) => ed.chain().focus().toggleItalic().run() },
  { cmd: "heading2", label: "H2", title: "Naslov", run: (ed) => ed.chain().focus().toggleHeading({ level: 2 }).run() },
  { cmd: "heading3", label: "H3", title: "Podnaslov", run: (ed) => ed.chain().focus().toggleHeading({ level: 3 }).run() },
  { cmd: "bulletList", label: "• lista", title: "Lista", run: (ed) => ed.chain().focus().toggleBulletList().run() },
  { cmd: "orderedList", label: "1. lista", title: "Numerisana lista", run: (ed) => ed.chain().focus().toggleOrderedList().run() },
];

function isActive(ed: Editor, cmd: string) {
  if (cmd === "heading2") return ed.isActive("heading", { level: 2 });
  if (cmd === "heading3") return ed.isActive("heading", { level: 3 });
  return ed.isActive(cmd);
}

export default function ContentEditor({ content }: { content?: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<Editor | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const syncHiddenInput = (html: string) => {
    const el = inputRef.current;
    if (!el) return;
    el.value = html;
    el.setCustomValidity(textFromHtml(html) ? "" : "Unesite sadržaj objave.");
  };

  const insertImages = async (files: File[]) => {
    const ed = editorRef.current;
    if (!ed || !files.length) return;
    setError("");
    setBusy(true);
    try {
      for (const file of files) {
        const fd = new FormData();
        fd.set("image", file);
        const res = await uploadContentImage(fd);
        if (res.error || !res.url) throw new Error(res.error ?? "Upload nije uspio.");
        ed.chain().focus().setImage({ src: res.url }).run();
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload nije uspio.");
    } finally {
      setBusy(false);
    }
  };

  const editor = useEditor({
    immediatelyRender: false,
    shouldRerenderOnTransaction: true,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        codeBlock: false,
        link: {
          openOnClick: false,
          autolink: true,
          HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" },
        },
      }),
      Image.configure({
        allowBase64: false,
        HTMLAttributes: { class: "post-img" },
      }),
    ],
    content: textToHtml(content ?? ""),
    onCreate: ({ editor: ed }) => {
      syncHiddenInput(ed.getHTML());
    },
    editorProps: {
      attributes: { class: "content-prose" },
      handleDrop: (_view, event, _slice, moved) => {
        if (moved) return false;
        const files = [...(event.dataTransfer?.files ?? [])].filter((f) => f.type.startsWith("image/"));
        if (!files.length) return false;
        event.preventDefault();
        void insertImages(files);
        return true;
      },
      handlePaste: (_view, event) => {
        const files = [...(event.clipboardData?.files ?? [])].filter((f) => f.type.startsWith("image/"));
        if (!files.length) return false;
        event.preventDefault();
        void insertImages(files);
        return true;
      },
    },
    onUpdate: ({ editor: ed }) => {
      syncHiddenInput(ed.getHTML());
    },
  });

  editorRef.current = editor;

  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    syncHiddenInput(el.value);
  }, [editor]);

  useEffect(() => {
    const input = inputRef.current;
    const form = input?.form;
    if (!form) return;

    const syncBeforeSubmit = () => {
      syncHiddenInput(editorRef.current?.getHTML() ?? "");
    };
    const syncFormData = (event: FormDataEvent) => {
      event.formData.set("content", editorRef.current?.getHTML() ?? "");
    };

    form.addEventListener("submit", syncBeforeSubmit);
    form.addEventListener("formdata", syncFormData);
    return () => {
      form.removeEventListener("submit", syncBeforeSubmit);
      form.removeEventListener("formdata", syncFormData);
    };
  }, [editor]);

  const setLink = () => {
    if (!editor) return;
    const current = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Unesite URL", current || "https://");
    if (url === null) return;
    if (!url.trim()) editor.chain().focus().unsetLink().run();
    else editor.chain().focus().setLink({ href: url.trim() }).run();
  };

  return (
    <div className="full">
      <span>Sadržaj</span>
      <div className={`content-editor${busy ? " uploading" : ""}`}>
        <div className="content-toolbar" role="toolbar" aria-label="Formatiranje teksta">
          {TOOLS.map((a) => (
            <button
              key={a.cmd}
              type="button"
              title={a.title}
              className={editor && isActive(editor, a.cmd) ? "active" : undefined}
              onClick={() => editor && a.run(editor)}
            >
              {a.label}
            </button>
          ))}
          <button
            type="button"
            title="Link"
            className={editor?.isActive("link") ? "active" : undefined}
            onClick={setLink}
          >
            Link
          </button>
          <button type="button" title="Ubaci sliku" disabled={busy} onClick={() => fileRef.current?.click()}>
            {busy ? "Upload…" : "Slika"}
          </button>
        </div>
        <EditorContent editor={editor} />
      </div>
      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        hidden
        onChange={(e) => {
          const files = [...(e.target.files ?? [])];
          e.target.value = "";
          void insertImages(files);
        }}
      />
      <input
        ref={inputRef}
        type="hidden"
        name="content"
        defaultValue={textToHtml(content ?? "")}
      />
      {error && <div className="adm-error" style={{ marginTop: "10px" }}>{error}</div>}
      <p style={{ margin: "8px 0 0", fontSize: "12.5px", fontWeight: 700, opacity: 0.55 }}>
        Slike u tekst: dugme „Slika“, ili zalijepi / prevuci. JPG, PNG, WebP, GIF · do 4 MB.
      </p>
    </div>
  );
}
