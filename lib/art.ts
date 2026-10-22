import type { Locale } from "./i18n";

// Dr. Zehra's illustrations, grouped the way she posts them (one Instagram
// carousel = one story). Static for now; later this moves to the admin panel.

export type ArtStory = {
  id: string;
  title: Record<Locale, string>;
  /** Number of images: /assets/art/{id}-{n}.webp and {id}-{n}-sm.webp, n = 1..count. */
  count: number;
  /** Accent used behind the card stack. */
  tone: string;
};

export const ART_STORIES: ArtStory[] = [
  { id: "skripanje-zubima", title: { bs: "Škripiš zubima dok spavaš?", en: "Grinding your teeth at night?" }, count: 3, tone: "#F4A08A" },
  { id: "bocica", title: { bs: "Tiha prijetnja u bočici", en: "The silent threat in the baby bottle" }, count: 6, tone: "#5E86B8" },
  { id: "cetkica", title: { bs: "Šta tvoja četkica govori o tebi?", en: "What does your toothbrush say about you?" }, count: 4, tone: "#F2A54A" },
  { id: "pasta", title: { bs: "Kako odabrati pastu za zube?", en: "How to choose a toothpaste?" }, count: 3, tone: "#7EAEE8" },
  { id: "disanje", title: { bs: "Posljedice disanja na usta", en: "What mouth breathing does" }, count: 3, tone: "#B79BD8" },
  { id: "pranje-nakon-jela", title: { bs: "Ne peri zube odmah nakon jela", en: "Don't brush right after eating" }, count: 3, tone: "#5B7FE0" },
  { id: "prevencija", title: { bs: "Ne čekaj bol, biraj prevenciju!", en: "Don't wait for pain, choose prevention!" }, count: 1, tone: "#9B5FD0" },
  { id: "portret", title: { bs: "Dr. Kamala Ekmečić", en: "Dr. Kamala Ekmečić" }, count: 1, tone: "#C9BFAE" },
];

/** Stories shown on the home page strip. */
export const ART_HOME_IDS = ["skripanje-zubima", "bocica", "cetkica", "pasta", "disanje", "pranje-nakon-jela"];

export function artImage(id: string, n: number, small = false): string {
  return `/assets/art/${id}-${n}${small ? "-sm" : ""}.webp`;
}
