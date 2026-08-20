import type { Metadata } from "next";
import ContactPage from "@/components/contact/ContactPage";
import { contactMetadata } from "@/lib/metadata";

export const metadata: Metadata = contactMetadata("bs");

export default function Page() {
  return <ContactPage locale="bs" />;
}
