// Prepoznavanje postojećeg pacijenta iz podataka javnog zahtjeva.

export type PacijentKratko = {
  id: string;
  ime: string;
  prezime: string;
  telefon: string | null;
};

/** Svodi broj na lokalni oblik sa vodećom nulom: "061 123-456", "+387 61…" → "061123456". */
export function normalizujTelefon(t: string | null | undefined): string | null {
  if (!t) return null;
  let d = t.replace(/\D/g, "");
  if (d.startsWith("00387")) d = "0" + d.slice(5);
  else if (d.startsWith("387")) d = "0" + d.slice(3);
  return d.length >= 6 ? d : null;
}

const normalizujIme = (s: string) => s.trim().toLowerCase().replace(/\s+/g, " ");

/**
 * Nađe pacijenta koji odgovara zahtjevu: prvo po telefonu (jak signal),
 * zatim po punom imenu ("Ime Prezime" ili "Prezime Ime").
 */
export function nadjiPacijenta<T extends PacijentKratko>(
  termin: { ime: string; telefon: string | null },
  pacijenti: T[]
): T | null {
  const tel = normalizujTelefon(termin.telefon);
  if (tel) {
    const poTelefonu = pacijenti.find((p) => normalizujTelefon(p.telefon) === tel);
    if (poTelefonu) return poTelefonu;
  }
  const ime = normalizujIme(termin.ime);
  if (!ime) return null;
  return (
    pacijenti.find(
      (p) =>
        normalizujIme(`${p.ime} ${p.prezime}`) === ime ||
        normalizujIme(`${p.prezime} ${p.ime}`) === ime
    ) ?? null
  );
}
