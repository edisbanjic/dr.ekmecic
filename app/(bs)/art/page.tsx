import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { getDict, artPath } from "@/lib/i18n";
import { artPageJsonLd, subpageBreadcrumb } from "@/lib/seo";
import ArtPage from "@/components/art/ArtPage";
import { artMetadata } from "@/lib/metadata";

export const metadata: Metadata = artMetadata("bs");

export default function Page() {
  return (
    <>
      <JsonLd data={artPageJsonLd("bs")} />
      <JsonLd data={subpageBreadcrumb("bs", getDict("bs").meta.art.title.split(" | ")[0], artPath("bs"))} />
      <ArtPage locale="bs" />
    </>
  );
}
