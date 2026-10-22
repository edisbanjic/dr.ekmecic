import type { Metadata } from "next";
import ArtPage from "@/components/art/ArtPage";
import { artMetadata } from "@/lib/metadata";

export const metadata: Metadata = artMetadata("en");

export default function Page() {
  return <ArtPage locale="en" />;
}
