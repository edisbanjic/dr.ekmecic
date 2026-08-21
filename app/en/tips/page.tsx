import type { Metadata } from "next";
import TipsIndex from "@/components/tips/TipsIndex";
import { tipsMetadata } from "@/lib/metadata";

// Static + ISR: served from the CDN; admin post actions revalidate on change.
export const dynamic = "force-static";
export const revalidate = 3600;

export const metadata: Metadata = tipsMetadata("en");

export default function Page() {
  return <TipsIndex locale="en" />;
}
