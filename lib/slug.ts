const ZAMJENE: Record<string, string> = {
  č: "c", ć: "c", đ: "dj", š: "s", ž: "z",
  Č: "c", Ć: "c", Đ: "dj", Š: "s", Ž: "z",
};

/** "Kako pobijediti strah od zubara?" → "kako-pobijediti-strah-od-zubara" */
export function slugify(naslov: string): string {
  return naslov
    .split("")
    .map((ch) => ZAMJENE[ch] ?? ch)
    .join("")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
