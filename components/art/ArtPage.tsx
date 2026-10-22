import Subpage from "@/components/Subpage";
import ArtPageView from "@/components/art/ArtPageView";
import type { Locale } from "@/lib/i18n";

/** Zehra's art corner for one locale — shared chrome via Subpage. */
export default function ArtPage({ locale }: { locale: Locale }) {
  return (
    <Subpage locale={locale}>
      <ArtPageView />
    </Subpage>
  );
}
