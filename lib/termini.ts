// Radno vrijeme i logika slotova — dijele je javna forma i admin.

export const USLUGE = [
  "Prvi pregled i konsultacija",
  "Opšta stomatologija",
  "Popravka zuba",
  "Liječenje korijena",
  "Vađenje zuba",
  "Protetika",
  "Izbjeljivanje",
  "Uklanjanje kamenca",
  "Dječija stomatologija",
  "Nešto drugo",
];

export const TRAJANJE_MIN = 30;
export const HORIZONT_DANA = 60;
/** Osoblje može zakazivati dalje unaprijed nego javna forma. */
export const HORIZONT_ADMIN = 180;

type RadnoVrijeme = { od: string; do: string; pauza: [string, string] };

// getDay(): 0 = nedjelja … 6 = subota
export const RADNO_VRIJEME: Record<number, RadnoVrijeme | null> = {
  0: null,
  1: { od: "08:00", do: "16:00", pauza: ["10:30", "11:00"] },
  2: { od: "08:00", do: "16:00", pauza: ["10:30", "11:00"] },
  3: { od: "08:00", do: "16:00", pauza: ["10:30", "11:00"] },
  4: { od: "10:00", do: "18:00", pauza: ["14:00", "14:30"] },
  5: { od: "08:00", do: "16:00", pauza: ["10:30", "11:00"] },
  6: null,
};

const toMin = (t: string) => parseInt(t.slice(0, 2), 10) * 60 + parseInt(t.slice(3, 5), 10);
const toHM = (m: number) =>
  `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;

/** Svi slotovi (početna vremena, "HH:MM") za dan u sedmici. */
export function slotoviZaDan(dan: number): string[] {
  const rv = RADNO_VRIJEME[dan];
  if (!rv) return [];
  const slots: string[] = [];
  for (let m = toMin(rv.od); m + TRAJANJE_MIN <= toMin(rv.do); m += TRAJANJE_MIN) {
    if (m >= toMin(rv.pauza[0]) && m < toMin(rv.pauza[1])) continue;
    slots.push(toHM(m));
  }
  return slots;
}

/** Lokalni datum kao "YYYY-MM-DD" (bez UTC pomaka). */
export function fmtDatum(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

export function parseDatum(s: string): Date {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
}

/** Da li je datum unutar perioda u kojem se može zakazati. */
export function datumUHorizontu(datum: string, horizont: number = HORIZONT_DANA): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(datum)) return false;
  const d = parseDatum(datum);
  const danas = new Date();
  danas.setHours(0, 0, 0, 0);
  const max = new Date(danas);
  max.setDate(max.getDate() + horizont);
  return d >= danas && d <= max;
}

export const STATUSI: Record<string, { label: string; boja: string; pozadina: string }> = {
  na_cekanju: { label: "Na čekanju", boja: "#A05A42", pozadina: "#FBE7DA" },
  potvrdjen: { label: "Potvrđen", boja: "#3E5F86", pozadina: "#E7F0FB" },
  zavrsen: { label: "Završen", boja: "#3E6B4A", pozadina: "#E3EFE4" },
  otkazan: { label: "Otkazan", boja: "#8A8378", pozadina: "#EFEAE0" },
};

export const MJESECI = [
  "Januar", "Februar", "Mart", "April", "Maj", "Juni",
  "Juli", "August", "Septembar", "Oktobar", "Novembar", "Decembar",
];

export const DANI_KRATKO = ["Pon", "Uto", "Sri", "Čet", "Pet", "Sub", "Ned"];
export const DANI = ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak", "Subota", "Nedjelja"];
