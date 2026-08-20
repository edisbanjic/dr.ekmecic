import type { Metadata } from "next";
import ContactPage from "@/components/contact/ContactPage";
import { contactMetadata } from "@/lib/metadata";

export const metadata: Metadata = contactMetadata("en");

export default function Page() {
  return <ContactPage locale="en" />;
}
