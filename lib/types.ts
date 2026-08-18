export type Pacijent = {
  id: string;
  created_at: string;
  ime: string;
  prezime: string;
  telefon: string | null;
  email: string | null;
  datum_rodjenja: string | null;
  adresa: string | null;
  alergije: string | null;
  napomena: string | null;
  radnik_id: string | null;
};

export type Radnik = {
  id: string;
  created_at: string;
  ime: string;
  prezime: string;
  uloga: string;
  telefon: string | null;
  email: string | null;
  datum_zaposlenja: string | null;
  napomena: string | null;
  aktivan: boolean;
  je_doktor: boolean;
  user_id: string | null;
  slika_url: string | null;
  biografija: string | null;
  biljeske: string | null;
};

/** Javno vidljivi podaci o doktoru (za dropdown na sajtu). */
export type Doktor = {
  id: string;
  ime: string;
  prezime: string;
};

export type TerminStatus = "na_cekanju" | "potvrdjen" | "otkazan" | "zavrsen";

export type Termin = {
  id: string;
  created_at: string;
  /** null = pacijent čeka da mu ordinacija predloži termin */
  datum: string | null;
  vrijeme: string | null;
  trajanje_min: number;
  ime: string;
  telefon: string | null;
  email: string | null;
  usluga: string | null;
  napomena: string | null;
  izvjestaj: string | null;
  status: TerminStatus;
  pacijent_id: string | null;
  radnik_id: string | null;
};

export type Zapis = {
  id: string;
  created_at: string;
  pacijent_id: string;
  radnik_id: string | null;
  datum: string;
  zub: string | null;
  opis: string;
};
