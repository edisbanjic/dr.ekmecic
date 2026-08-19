import type { Metadata } from "next";
import "../globals.css";
import { fontClassName } from "../fonts";
import { getDict } from "@/lib/i18n";
import { getSiteUrl } from "@/lib/site";

const t = getDict("bs");

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: t.meta.home.title,
  description: t.meta.home.description,
};

/** Root layout for the Bosnian (default) site at /. English lives under /en. */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bs" className={fontClassName}>
      <body>{children}</body>
    </html>
  );
}
