import type { Metadata } from "next";
import { Baloo_2, Fredoka, Nunito, Shantell_Sans } from "next/font/google";
import "./globals.css";

// Fredoka nema glifove Č/č/Ć/ć/đ — Baloo 2 (vrlo sličan zaobljeni font) ih
// pokriva kao fallback; globals.css slaže --font-fredoka kao Fredoka + Baloo.
const fredoka = Fredoka({ subsets: ["latin", "latin-ext"], variable: "--font-fredoka-base" });
const baloo = Baloo_2({ subsets: ["latin", "latin-ext"], variable: "--font-baloo" });
const nunito = Nunito({ subsets: ["latin", "latin-ext"], variable: "--font-nunito" });
const shantell = Shantell_Sans({ subsets: ["latin", "latin-ext"], variable: "--font-shantell" });

export const metadata: Metadata = {
  title: "Dr. Ekmečić — Stomatološka ordinacija Cazin",
  description:
    "Opća stomatološka ordinacija dr. Kamala Ekmečić, Cazin — moderna oprema, nježan pristup i 25+ godina iskustva. Zakažite termin: 037 514 771.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="bs"
      className={`${fredoka.variable} ${baloo.variable} ${nunito.variable} ${shantell.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
