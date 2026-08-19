// Opening hours and slot logic — shared by the public form and admin.

export const SERVICES = [
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

export const SLOT_MINUTES = 30;
export const BOOKING_HORIZON_DAYS = 60;
/** Staff can book further ahead than the public form. */
export const ADMIN_HORIZON_DAYS = 180;

type OpeningHours = { from: string; to: string; pause: [string, string] };

// getDay(): 0 = Sunday … 6 = Saturday
export const OPENING_HOURS: Record<number, OpeningHours | null> = {
  0: null,
  1: { from: "08:00", to: "16:00", pause: ["10:30", "11:00"] },
  2: { from: "08:00", to: "16:00", pause: ["10:30", "11:00"] },
  3: { from: "08:00", to: "16:00", pause: ["10:30", "11:00"] },
  4: { from: "10:00", to: "18:00", pause: ["14:00", "14:30"] },
  5: { from: "08:00", to: "16:00", pause: ["10:30", "11:00"] },
  6: null,
};

const toMin = (t: string) => parseInt(t.slice(0, 2), 10) * 60 + parseInt(t.slice(3, 5), 10);
const toHM = (m: number) =>
  `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;

/** All slot start times ("HH:MM") for a weekday. */
export function slotsForDay(weekday: number): string[] {
  const hours = OPENING_HOURS[weekday];
  if (!hours) return [];
  const slots: string[] = [];
  for (let m = toMin(hours.from); m + SLOT_MINUTES <= toMin(hours.to); m += SLOT_MINUTES) {
    if (m >= toMin(hours.pause[0]) && m < toMin(hours.pause[1])) continue;
    slots.push(toHM(m));
  }
  return slots;
}

/** Local date as "YYYY-MM-DD" (no UTC shift). */
export function formatDate(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

export function parseDate(s: string): Date {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
}

/** Whether the date is within the bookable window. */
export function dateInHorizon(date: string, horizon: number = BOOKING_HORIZON_DAYS): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
  const d = parseDate(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const max = new Date(today);
  max.setDate(max.getDate() + horizon);
  return d >= today && d <= max;
}

export const STATUSES: Record<string, { label: string; color: string; bg: string }> = {
  pending: { label: "Na čekanju", color: "#A05A42", bg: "#FBE7DA" },
  confirmed: { label: "Potvrđen", color: "#3E5F86", bg: "#E7F0FB" },
  completed: { label: "Završen", color: "#3E6B4A", bg: "#E3EFE4" },
  cancelled: { label: "Otkazan", color: "#8A8378", bg: "#EFEAE0" },
};

export const MONTHS = [
  "Januar", "Februar", "Mart", "April", "Maj", "Juni",
  "Juli", "August", "Septembar", "Oktobar", "Novembar", "Decembar",
];

export const DAYS_SHORT = ["Pon", "Uto", "Sri", "Čet", "Pet", "Sub", "Ned"];
export const DAYS = ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak", "Subota", "Nedjelja"];
