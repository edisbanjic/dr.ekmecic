import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "../globals.css";
import { fontClassName } from "../fonts";
import { getDict } from "@/lib/i18n";
import { getSiteUrl } from "@/lib/site";

const t = getDict("bs");

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: t.meta.home.title,
  description: t.meta.home.description,
  applicationName: t.meta.siteName,
  // Google Search Console: set GOOGLE_SITE_VERIFICATION in the env to verify without a DNS record.
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
  other: {
    "geo.region": "BA",
    "geo.placename": "Cazin",
    ICBM: "44.966270, 15.932116",
  },
};

export const viewport: Viewport = {
  themeColor: "#F5F0E8",
};

/** Root layout for the Bosnian (default) site at /. English lives under /en. */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bs" className={fontClassName}>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
