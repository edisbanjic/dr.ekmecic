import JsonLd from "@/components/JsonLd";
import { LocaleProvider } from "@/components/LocaleProvider";
import ScrollEffects from "@/components/ScrollEffects";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import type { Locale } from "@/lib/i18n";
import { clinicJsonLd, faqJsonLd } from "@/lib/seo";
import AboutSection from "./AboutSection";
import BookingSection from "./BookingSection";
import FaqSection from "./FaqSection";
import Hero from "./Hero";
import HoursSection from "./HoursSection";
import Marquee from "./Marquee";
import ReviewsSection from "./ReviewsSection";
import ServicesSection from "./ServicesSection";

/**
 * The complete landing page for one locale — pages stay thin wrappers.
 * Sections read their copy from LocaleProvider, so the language switcher
 * can swap text in place without remounting the DOM.
 */
export default function HomePage({ locale }: { locale: Locale }) {
  return (
    <LocaleProvider initial={locale}>
      <JsonLd data={clinicJsonLd(locale)} />
      <JsonLd data={faqJsonLd(locale)} />
      <ScrollEffects />
      <SiteHeader home />
      <main>
        <Hero />
        <Marquee />
        <ServicesSection />
        <AboutSection />
        <HoursSection />
        <BookingSection />
        <ReviewsSection />
        <FaqSection />
      </main>
      <SiteFooter home />
    </LocaleProvider>
  );
}
