import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { getDict, contactPath } from "@/lib/i18n";
import { contactPageJsonLd, subpageBreadcrumb } from "@/lib/seo";
import ContactPage from "@/components/contact/ContactPage";
import { contactMetadata } from "@/lib/metadata";

export const metadata: Metadata = contactMetadata("en");

export default function Page() {
  return (
    <>
      <JsonLd data={contactPageJsonLd("en")} />
      <JsonLd data={subpageBreadcrumb("en", getDict("en").header.nav.contact, contactPath("en"))} />
      <ContactPage locale="en" />
    </>
  );
}
