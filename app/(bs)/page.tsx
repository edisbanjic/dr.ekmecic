import type { Metadata } from "next";
import HomePage from "@/components/home/HomePage";
import { homeMetadata } from "@/lib/metadata";

export const metadata: Metadata = homeMetadata("bs");

export default function Page() {
  return <HomePage locale="bs" />;
}
