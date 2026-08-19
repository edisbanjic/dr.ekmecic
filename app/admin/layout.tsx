import type { Metadata } from "next";
import "../globals.css";
import { fontClassName } from "../fonts";

export const metadata: Metadata = {
  title: "Admin — Ordinacija dr. Ekmečić",
  robots: { index: false, follow: false },
};

/** Root layout for the admin panel — always Bosnian, never indexed. */
export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bs" className={fontClassName}>
      <body>{children}</body>
    </html>
  );
}
