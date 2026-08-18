import type { Metadata } from "next";
import { Fredoka, Nunito, Shantell_Sans } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({ subsets: ["latin", "latin-ext"], variable: "--font-fredoka" });
const nunito = Nunito({ subsets: ["latin", "latin-ext"], variable: "--font-nunito" });
const shantell = Shantell_Sans({ subsets: ["latin", "latin-ext"], variable: "--font-shantell" });

export const metadata: Metadata = {
  title: "Dr. Ekmečić — Stomatološka ordinacija Cazin",
  description:
    "Opća stomatološka ordinacija dr. Kamala Ekmečić, Cazin — moderna oprema, nježan pristup i 25+ godina iskustva. Zakažite termin: 037 514 771.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bs" className={`${fredoka.variable} ${nunito.variable} ${shantell.variable}`}>
      <body>{children}</body>
    </html>
  );
}
