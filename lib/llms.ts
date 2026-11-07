// /llms.txt and /llms-full.txt — a plain Markdown summary of the clinic for AI
// assistants (ChatGPT, Claude, Perplexity…), following https://llmstxt.org.
import { artPath, contactPath, getDict, homePath, postPath, tipsPath } from "./i18n";
import { getPosts } from "./posts";
import { absoluteUrl, CLINIC } from "./seo";
import { htmlToPlainText } from "./seo-analysis";

const PHONE_DISPLAY = "037 514 771";

export async function buildLlmsTxt({ full }: { full: boolean }): Promise<string> {
  const bs = getDict("bs");
  const en = getDict("en");
  const posts = (await getPosts()).filter((p) => !p.no_index);
  const services = Object.values(bs.services.cards);
  const servicesEn = Object.values(en.services.cards);

  const lines: string[] = [
    `# ${bs.meta.clinicName}`,
    "",
    `> ${bs.meta.home.description}`,
    `> EN: ${en.meta.home.description}`,
    "",
    "Opća (privatna) stomatološka ordinacija u Cazinu, Bosna i Hercegovina (Unsko-sanski kanton). " +
      "Ordinaciju vodi dr. Kamala Ekmečić (30+ godina iskustva), uz dr. Zehru Ekmečić i medicinsku sestru Lejlu Nadarević. " +
      "Liječe se odrasli i djeca.",
    "",
    "## Kontakt i lokacija",
    "",
    `- Adresa: ${CLINIC.street}, ${CLINIC.postalCode} ${CLINIC.city}, Bosna i Hercegovina`,
    `- Telefon: ${PHONE_DISPLAY} (${CLINIC.phone})`,
    `- Email: ${CLINIC.email}`,
    `- Karta: https://www.google.com/maps/search/?api=1&query=${CLINIC.latitude},${CLINIC.longitude}`,
    `- Zakazivanje termina: telefonom ili online na ${absoluteUrl(homePath("bs"))}/#booking`,
    `- Instagram: ${CLINIC.instagram}`,
    `- Facebook: ${CLINIC.facebook}`,
    "",
    "## Radno vrijeme",
    "",
    "- Ponedjeljak – srijeda i petak: 08:00 – 16:00 (pauza 10:30 – 11:00)",
    "- Četvrtak: 10:00 – 18:00 (pauza 14:00 – 14:30)",
    "- Subota, nedjelja i praznici: ne radimo",
    `- ${bs.hours.callFirstText}`,
    "",
    "## Tim",
    "",
    `- **dr. Kamala Ekmečić**, doktorica stomatologije. ${bs.about.education}. ${bs.about.p1}`,
    `- **dr. Zehra Ekmečić**, doktorica dentalne medicine. ${bs.about.team.education}. ${bs.about.team.p1}`,
    `- **Lejla Nadarević**, medicinska sestra. ${bs.about.tech.p1}`,
    "",
    "## Usluge",
    "",
    ...services.map((s) => `- **${s.title}**: ${s.text}`),
    "",
    "### Services (English)",
    "",
    ...servicesEn.map((s) => `- **${s.title}**: ${s.text}`),
    "",
    "## Česta pitanja",
    "",
    ...bs.faq.items.flatMap((f) => [`### ${f.q}`, "", f.a, ""]),
    "## Stranice",
    "",
    `- [Početna](${absoluteUrl(homePath("bs"))}): usluge, tim, radno vrijeme, recenzije, online zakazivanje`,
    `- [Kontakt](${absoluteUrl(contactPath("bs"))}): telefon, email, adresa i karta`,
    `- [Savjeti i novosti](${absoluteUrl(tipsPath("bs"))}): ${bs.meta.tips.description}`,
    `- [Art kutak](${absoluteUrl(artPath("bs"))}): ${bs.meta.art.description}`,
    `- [English version](${absoluteUrl(homePath("en"))}): ${en.meta.home.description}`,
    "",
  ];

  if (posts.length) {
    lines.push("## Savjeti i novosti", "");
    for (const p of posts) {
      const desc = p.seo_description?.trim() || p.summary?.trim() || "";
      lines.push(`- [${p.title}](${absoluteUrl(postPath("bs", p.slug))}) (${p.date})${desc ? `: ${desc}` : ""}`);
    }
    lines.push("");
  }

  if (full) {
    for (const p of posts) {
      lines.push(`## ${p.title}`, "", `URL: ${absoluteUrl(postPath("bs", p.slug))}`, `Datum: ${p.date}`, "", htmlToPlainText(p.content), "");
    }
  } else {
    lines.push("## Optional", "", `- [Puni tekst svih savjeta](${absoluteUrl("/llms-full.txt")})`, "");
  }

  return lines.join("\n");
}
