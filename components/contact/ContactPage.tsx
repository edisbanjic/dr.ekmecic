import Subpage from "@/components/Subpage";
import ContactPageView from "@/components/contact/ContactPageView";
import type { Locale } from "@/lib/i18n";

/** Contact page for one locale — shared chrome via Subpage. */
export default function ContactPage({ locale }: { locale: Locale }) {
  return (
    <Subpage locale={locale}>
      <ContactPageView />
    </Subpage>
  );
}
