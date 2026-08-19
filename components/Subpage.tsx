import { BookingModalProvider } from "@/components/BookingModal";
import { LocaleProvider } from "@/components/LocaleProvider";
import ScrollEffects from "@/components/ScrollEffects";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import type { Locale } from "@/lib/i18n";

type SubpageProps = {
  locale?: Locale;
  children: React.ReactNode;
};

/** Same header and footer as the landing page, for subpages such as /savjeti. */
export default function Subpage({ locale = "bs", children }: SubpageProps) {
  return (
    <LocaleProvider initial={locale}>
      <BookingModalProvider>
        <ScrollEffects />
        <SiteHeader />
        <main style={{ minHeight: "100vh", background: "#FBF8F1", paddingTop: "72px", paddingBottom: "clamp(50px,7vw,80px)" }}>
          {children}
        </main>
        <SiteFooter />
      </BookingModalProvider>
    </LocaleProvider>
  );
}
