import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { getDict, artPath } from "@/lib/i18n";
import { artPageJsonLd, subpageBreadcrumb } from "@/lib/seo";
import ArtPage from "@/components/art/ArtPage";
import { artMetadata } from "@/lib/metadata";

export const metadata: Metadata = artMetadata("en");

export default function Page() {
  return (
    <>
      <JsonLd data={artPageJsonLd("en")} />
      <JsonLd data={subpageBreadcrumb("en", getDict("en").meta.art.title.split(" | ")[0], artPath("en"))} />
      <ArtPage locale="en" />
    </>
  );
}
