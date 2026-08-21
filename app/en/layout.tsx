import type { Metadata, Viewport } from "next";
import "../globals.css";
import { fontClassName } from "../fonts";
import { getDict } from "@/lib/i18n";
import { getSiteUrl } from "@/lib/site";

const t = getDict("en");

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: t.meta.home.title,
  description: t.meta.home.description,
  applicationName: t.meta.siteName,
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

/** Root layout for the English site at /en. Bosnian (default) lives at /. */
export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontClassName}>
      <body>{children}</body>
    </html>
  );
}
