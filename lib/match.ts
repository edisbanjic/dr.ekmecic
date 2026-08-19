// Match an existing patient from a public booking request.

export type PatientBrief = {
  id: string;
  first_name: string;
  last_name: string;
  phone: string | null;
};

/** Reduce a number to local form with a leading zero: "061 123-456", "+387 61…" → "061123456". */
export function normalizePhone(t: string | null | undefined): string | null {
  if (!t) return null;
  let d = t.replace(/\D/g, "");
  if (d.startsWith("00387")) d = "0" + d.slice(5);
  else if (d.startsWith("387")) d = "0" + d.slice(3);
  return d.length >= 6 ? d : null;
}

/**
 * Validate input and return the number in canonical form "+387 61 123 456".
 * Accepts "061 123 456", "61123456", "+387 61…", "00387…"; null = invalid.
 */
export function canonicalPhone(input: string): string | null {
  let d = input.replace(/\D/g, "");
  if (d.startsWith("00387")) d = d.slice(5);
  else if (d.startsWith("387")) d = d.slice(3);
  if (d.startsWith("0")) d = d.slice(1);
  if (d.length < 8 || d.length > 9) return null;
  return `+387 ${d.slice(0, 2)} ${d.slice(2, 5)} ${d.slice(5)}`;
}

const normalizeName = (s: string) => s.trim().toLowerCase().replace(/\s+/g, " ");

/**
 * Find a patient matching the request: phone first (strong signal),
 * then full name ("First Last" or "Last First").
 */
export function findPatient<T extends PatientBrief>(
  appointment: { name: string; phone: string | null },
  patients: T[]
): T | null {
  const tel = normalizePhone(appointment.phone);
  if (tel) {
    const byPhone = patients.find((p) => normalizePhone(p.phone) === tel);
    if (byPhone) return byPhone;
  }
  const name = normalizeName(appointment.name);
  if (!name) return null;
  return (
    patients.find(
      (p) =>
        normalizeName(`${p.first_name} ${p.last_name}`) === name ||
        normalizeName(`${p.last_name} ${p.first_name}`) === name
    ) ?? null
  );
}
