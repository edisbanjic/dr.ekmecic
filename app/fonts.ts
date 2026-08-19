import { Baloo_2, Nunito, Shantell_Sans } from "next/font/google";

// Heading font is Baloo 2: visually almost identical to Fredoka, but unlike
// Fredoka it has complete Bosnian letters (Č/č/Ć/ć/đ). The CSS variable is
// still named --font-fredoka (via globals.css) so inline styles stay untouched.
const baloo = Baloo_2({ subsets: ["latin", "latin-ext"], variable: "--font-baloo" });
const nunito = Nunito({ subsets: ["latin", "latin-ext"], variable: "--font-nunito" });
const shantell = Shantell_Sans({ subsets: ["latin", "latin-ext"], variable: "--font-shantell" });

/** Shared by both root layouts (bs at /, en at /en). */
export const fontClassName = `${baloo.variable} ${nunito.variable} ${shantell.variable}`;
