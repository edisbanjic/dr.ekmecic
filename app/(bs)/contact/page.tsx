import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { getDict, contactPath } from "@/lib/i18n";
import { contactPageJsonLd, subpageBreadcrumb } from "@/lib/seo";
import ContactPage from "@/components/contact/ContactPage";
import { contactMetadata } from "@/lib/metadata";

export const metadata: Metadata = contactMetadata("bs");

export default function Page() {
  return (
    <>
      <JsonLd data={contactPageJsonLd("bs")} />
      <JsonLd data={subpageBreadcrumb("bs", getDict("bs").header.nav.contact, contactPath("bs"))} />
      <ContactPage locale="bs" />
    </>
  );
}
