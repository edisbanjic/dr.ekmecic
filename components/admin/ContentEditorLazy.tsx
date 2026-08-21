"use client";

import dynamic from "next/dynamic";

/**
 * Code-split ContentEditor: Tiptap (~130 kB of first-load JS) loads only in
 * the browser, after the rest of the post form is already interactive.
 */
const ContentEditorLazy = dynamic(() => import("@/components/admin/ContentEditor"), {
  ssr: false,
  loading: () => <div aria-busy="true" style={{ minHeight: "320px" }} />,
});

export default ContentEditorLazy;
