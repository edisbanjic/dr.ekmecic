'use client';

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
  type CSSProperties,
} from 'react';
import { getDoktori, getZauzeto, submitBooking } from '@/app/actions';
import { kanonskiTelefon } from '@/lib/match';
import {
  DANI_KRATKO,
  fmtDatum,
  HORIZONT_DANA,
  MJESECI,
  parseDatum,
  slotoviZaDan,
  USLUGE,
} from '@/lib/termini';
import type { Doktor } from '@/lib/types';

const labelTextStyle: CSSProperties = {
  display: 'block',
  fontWeight: 800,
  fontSize: '13.5px',
  marginBottom: '6px',
};
const fieldStyle: CSSProperties = {
  width: '100%',
  boxSizing: 'border-box',
  padding: '13px 16px',
  borderRadius: '16px',
  border: '2px solid #EDE5D4',
  background: '#FDFBF6',
  fontSize: '15px',
  transition: 'border-color .25s ease, box-shadow .25s ease',
};
const dugmeStyle: CSSProperties = {
  background: '#7EAEE8',
  color: '#243038',
  border: 'none',
  fontFamily: 'var(--font-fredoka)',
  fontWeight: 600,
  fontSize: '17px',
  padding: '15px 32px',
  borderRadius: '999px',
  boxShadow: '0 14px 26px -12px rgba(126,174,232,.8)',
  transition: 'transform .3s cubic-bezier(.34,1.56,.64,1)',
  cursor: 'pointer',
};

const Obavezno = () => (
  <span aria-hidden="true" style={{ color: '#C0503A' }}>
    {' '}
    *
  </span>
);

function danasBezVremena() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

type Podaci = {
  ime: string;
  prezime: string;
  telefon: string;
  email: string;
  usluga: string;
};

export default function BookingForm() {
  const danas = useMemo(danasBezVremena, []);
  const [korak, setKorak] = useState<1 | 2>(1);
  const [podaci, setPodaci] = useState<Podaci>({
    ime: '',
    prezime: '',
    telefon: '',
    email: '',
    usluga: USLUGE[0],
  });
  const [greske, setGreske] = useState<Record<string, boolean>>({});
  const [doktori, setDoktori] = useState<Doktor[]>([]);
  const [doktor, setDoktor] = useState('');
  const [mjesec, setMjesec] = useState(
    () => new Date(danas.getFullYear(), danas.getMonth(), 1),
  );
  const [datum, setDatum] = useState<string | null>(null);
  const [vrijeme, setVrijeme] = useState<string | null>(null);
  const [zauzeto, setZauzeto] = useState<string[]>([]);
  const [ucitavam, setUcitavam] = useState(false);
  const [sent, setSent] = useState<
    { datum: string; vrijeme: string } | 'predlozi' | null
  >(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const vrh = useRef<HTMLDivElement>(null);

  const maxDatum = useMemo(() => {
    const d = new Date(danas);
    d.setDate(d.getDate() + HORIZONT_DANA);
    return d;
  }, [danas]);

  useEffect(() => {
    let aktivan = true;
    getDoktori().then((d) => {
      if (!aktivan) return;
      setDoktori(d);
      if (d.length === 1) setDoktor(d[0].id);
    });
    return () => {
      aktivan = false;
    };
  }, []);

  useEffect(() => {
    if (!datum) return;
    let aktivan = true;
    setUcitavam(true);
    setVrijeme(null);
    getZauzeto(datum, doktor || null)
      .then((z) => aktivan && setZauzeto(z))
      .finally(() => aktivan && setUcitavam(false));
    return () => {
      aktivan = false;
    };
  }, [datum, doktor]);

  // ćelije mjeseca, sedmica počinje ponedjeljkom
  const celije = useMemo(() => {
    const prvi = new Date(mjesec.getFullYear(), mjesec.getMonth(), 1);
    const zadnji = new Date(mjesec.getFullYear(), mjesec.getMonth() + 1, 0);
    const praznih = (prvi.getDay() + 6) % 7;
    const cells: (Date | null)[] = Array(praznih).fill(null);
    for (let i = 1; i <= zadnji.getDate(); i++) {
      cells.push(new Date(mjesec.getFullYear(), mjesec.getMonth(), i));
    }
    return cells;
  }, [mjesec]);

  const mozeNazad = mjesec > new Date(danas.getFullYear(), danas.getMonth(), 1);
  const mozeNaprijed =
    new Date(mjesec.getFullYear(), mjesec.getMonth() + 1, 1) <= maxDatum;
  const slotovi = datum ? slotoviZaDan(parseDatum(datum).getDay()) : [];

  const skrolNaVrh = () =>
    vrh.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  // ažurira polje i skida crveni border čim se počne ispravljati
  const upisi = (polje: keyof Podaci, vrijednost: string) => {
    setPodaci((p) => ({ ...p, [polje]: vrijednost }));
    setGreske((g) => (g[polje] ? { ...g, [polje]: false } : g));
  };

  const naKorak2 = () => {
    const nove: Record<string, boolean> = {
      ime: !podaci.ime.trim(),
      prezime: !podaci.prezime.trim(),
      telefon: !kanonskiTelefon(podaci.telefon),
      email:
        podaci.email.trim() !== '' && !/^\S+@\S+\.\S+$/.test(podaci.email),
    };
    setGreske(nove);
    if (Object.values(nove).some(Boolean)) {
      setError(
        podaci.telefon.trim() && nove.telefon
          ? 'Unesite ispravan broj telefona (npr. 61 123 456).'
          : null,
      );
      return;
    }
    setError(null);
    setKorak(2);
    skrolNaVrh();
  };

  const posalji = (predlozi: boolean) => {
    if (!predlozi && (!datum || !vrijeme)) {
      setError(
        'Odaberite datum i vrijeme, ili kliknite „Predložite mi termin“.',
      );
      return;
    }
    const formData = new FormData();
    formData.set('ime', podaci.ime);
    formData.set('prezime', podaci.prezime);
    formData.set('telefon', kanonskiTelefon(podaci.telefon) ?? podaci.telefon);
    formData.set('email', podaci.email);
    formData.set('usluga', podaci.usluga);
    formData.set('radnik_id', doktor);
    if (predlozi) {
      formData.set('predlozi', '1');
    } else {
      formData.set('datum', datum!);
      formData.set('vrijeme', vrijeme!);
    }
    setError(null);
    startTransition(async () => {
      const result = await submitBooking(formData);
      if (result.ok) {
        setSent(predlozi ? 'predlozi' : { datum: datum!, vrijeme: vrijeme! });
        skrolNaVrh();
      } else {
        setError(result.error ?? 'Nešto je pošlo po zlu. Pokušajte ponovo.');
      }
    });
  };

  if (sent) {
    const poruka =
      sent === 'predlozi' ? (
        <>
          Hvala na povjerenju! Nazvat ćemo vas u najkraćem roku i zajedno
          pronaći termin koji vam odgovara.
        </>
      ) : (
        <>
          Rezervisali ste {parseDatum(sent.datum).getDate()}.{' '}
          {MJESECI[parseDatum(sent.datum).getMonth()].toLowerCase()} u{' '}
          {sent.vrijeme}. Nazvat ćemo vas u najkraćem roku da potvrdimo termin.
        </>
      );
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '10px',
          padding: '26px 10px',
        }}
      >
        <svg viewBox="0 0 100 100" style={{ width: '62px' }} aria-hidden="true">
          <path
            d="M50 5C31 5 15 15 15 34c0 13 6 21 10 33 3 9 3.5 23 12 23 8 0 6.5-16 13-16s5 16 13 16c8.5 0 9-14 12-23 4-12 10-20 10-33C85 15 69 5 50 5Z"
            fill="#7EAEE8"
          />
          <circle cx="41" cy="34" r="3.5" fill="#243038" />
          <circle cx="59" cy="34" r="3.5" fill="#243038" />
          <path
            d="M40 45c4 6 16 6 20 0"
            stroke="#243038"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
        <div
          style={{
            fontFamily: 'var(--font-fredoka)',
            fontWeight: 600,
            fontSize: '26px',
          }}
        >
          Zahtjev je poslan!
        </div>
        <p
          style={{
            margin: 0,
            fontSize: '15.5px',
            lineHeight: 1.6,
            opacity: 0.8,
            maxWidth: '380px',
          }}
        >
          {poruka} <span style={{ color: '#F4A08A' }}>✦</span>
        </p>
      </div>
    );
  }

  return (
    <div
      ref={vrh}
      style={{ display: 'grid', gap: '18px', scrollMarginTop: '110px' }}
    >
      {/* indikator koraka */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: '13px',
          fontWeight: 800,
        }}
      >
        <span
          style={{
            background: korak === 1 ? '#7EAEE8' : '#E7F0FB',
            color: '#243038',
            borderRadius: '999px',
            padding: '5px 14px',
          }}
        >
          1 · Vaši podaci
        </span>
        <span style={{ opacity: 0.35 }}>—</span>
        <span
          style={{
            background: korak === 2 ? '#7EAEE8' : '#E7F0FB',
            color: '#243038',
            borderRadius: '999px',
            padding: '5px 14px',
            opacity: korak === 2 ? 1 : 0.6,
          }}
        >
          2 · Termin
        </span>
      </div>

      {korak === 1 && (
        <>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))',
              gap: '16px',
            }}
          >
            <label style={{ display: 'block' }}>
              <span style={labelTextStyle}>
                Ime
                <Obavezno />
              </span>
              <input
                required
                type="text"
                autoComplete="given-name"
                value={podaci.ime}
                onChange={(e) => upisi('ime', e.target.value)}
                placeholder="npr. Amina"
                style={{
                  ...fieldStyle,
                  ...(greske.ime ? { borderColor: '#C0503A' } : {}),
                }}
              />
            </label>
            <label style={{ display: 'block' }}>
              <span style={labelTextStyle}>
                Prezime
                <Obavezno />
              </span>
              <input
                required
                type="text"
                autoComplete="family-name"
                value={podaci.prezime}
                onChange={(e) => upisi('prezime', e.target.value)}
                placeholder="npr. Hodžić"
                style={{
                  ...fieldStyle,
                  ...(greske.prezime ? { borderColor: '#C0503A' } : {}),
                }}
              />
            </label>
            <label style={{ display: 'block' }}>
              <span style={labelTextStyle}>
                Broj telefona
                <Obavezno />
              </span>
              <span
                className="tel-polje"
                style={{
                  ...fieldStyle,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '0 0 0 16px',
                  ...(greske.telefon ? { borderColor: '#C0503A' } : {}),
                }}
              >
                <span
                  style={{ fontWeight: 800, opacity: 0.7, flex: '0 0 auto' }}
                >
                  +387
                </span>
                <input
                  required
                  type="tel"
                  inputMode="numeric"
                  value={podaci.telefon}
                  onChange={(e) =>
                    upisi('telefon', e.target.value.replace(/[^\d\s/-]/g, ''))
                  }
                  placeholder="61 123 456"
                  style={{
                    flex: 1,
                    minWidth: 0,
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    font: 'inherit',
                    fontSize: '15px',
                    padding: '13px 16px 13px 0',
                  }}
                />
              </span>
            </label>
            <label style={{ display: 'block' }}>
              <span style={labelTextStyle}>
                Email{' '}
                <span style={{ opacity: 0.5, fontWeight: 600 }}>(opciono)</span>
              </span>
              <input
                type="email"
                autoComplete="email"
                value={podaci.email}
                onChange={(e) => upisi('email', e.target.value)}
                placeholder="npr. amina@gmail.com"
                style={{
                  ...fieldStyle,
                  ...(greske.email ? { borderColor: '#C0503A' } : {}),
                }}
              />
            </label>
            {doktori.length > 0 && (
              <label style={{ display: 'block' }}>
                <span style={labelTextStyle}>
                  Doktor{' '}
                  <span style={{ opacity: 0.5, fontWeight: 600 }}>
                    (opciono)
                  </span>
                </span>
                <select
                  value={doktor}
                  onChange={(e) => setDoktor(e.target.value)}
                  style={{ ...fieldStyle, appearance: 'none' }}
                >
                  <option value="">— bez preferencije —</option>
                  {doktori.map((d) => (
                    <option key={d.id} value={d.id}>
                      Dr. {d.ime} {d.prezime}
                    </option>
                  ))}
                </select>
              </label>
            )}
            <label style={{ display: 'block' }}>
              <span style={labelTextStyle}>Usluga</span>
              <select
                value={podaci.usluga}
                onChange={(e) => upisi('usluga', e.target.value)}
                style={{ ...fieldStyle, appearance: 'none' }}
              >
                {USLUGE.map((u) => (
                  <option key={u}>{u}</option>
                ))}
              </select>
            </label>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              flexWrap: 'wrap',
            }}
          >
            <button
              type="button"
              onClick={naKorak2}
              className="hv-cta"
              style={dugmeStyle}
            >
              Dalje — odaberi termin →
            </button>
            {error && (
              <span
                role="alert"
                style={{
                  fontSize: '13.5px',
                  fontWeight: 700,
                  color: '#C0503A',
                }}
              >
                {error}
              </span>
            )}
          </div>
        </>
      )}

      {korak === 2 && (
        <>
          {/* kalendar */}
          <div>
            <span style={labelTextStyle}>Odaberite datum</span>
            <div
              style={{
                background: '#FDFBF6',
                border: '2px solid #EDE5D4',
                borderRadius: '20px',
                padding: '14px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '10px',
                }}
              >
                <button
                  type="button"
                  onClick={() =>
                    mozeNazad &&
                    setMjesec(
                      new Date(mjesec.getFullYear(), mjesec.getMonth() - 1, 1),
                    )
                  }
                  disabled={!mozeNazad}
                  aria-label="Prethodni mjesec"
                  style={{
                    border: 'none',
                    background: '#E7F0FB',
                    borderRadius: '999px',
                    width: '32px',
                    height: '32px',
                    cursor: mozeNazad ? 'pointer' : 'default',
                    opacity: mozeNazad ? 1 : 0.35,
                    fontSize: '16px',
                  }}
                >
                  ‹
                </button>
                <div
                  style={{
                    fontFamily: 'var(--font-fredoka)',
                    fontWeight: 600,
                    fontSize: '17px',
                  }}
                >
                  {MJESECI[mjesec.getMonth()]} {mjesec.getFullYear()}.
                </div>
                <button
                  type="button"
                  onClick={() =>
                    mozeNaprijed &&
                    setMjesec(
                      new Date(mjesec.getFullYear(), mjesec.getMonth() + 1, 1),
                    )
                  }
                  disabled={!mozeNaprijed}
                  aria-label="Sljedeći mjesec"
                  style={{
                    border: 'none',
                    background: '#E7F0FB',
                    borderRadius: '999px',
                    width: '32px',
                    height: '32px',
                    cursor: mozeNaprijed ? 'pointer' : 'default',
                    opacity: mozeNaprijed ? 1 : 0.35,
                    fontSize: '16px',
                  }}
                >
                  ›
                </button>
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(7,1fr)',
                  gap: '4px',
                  textAlign: 'center',
                }}
              >
                {DANI_KRATKO.map((d) => (
                  <div
                    key={d}
                    style={{
                      fontSize: '11.5px',
                      fontWeight: 800,
                      opacity: 0.55,
                      padding: '4px 0',
                    }}
                  >
                    {d}
                  </div>
                ))}
                {celije.map((d, i) => {
                  if (!d) return <div key={`p${i}`} />;
                  const iso = fmtDatum(d);
                  const radni = slotoviZaDan(d.getDay()).length > 0;
                  const dostupan = radni && d >= danas && d <= maxDatum;
                  const odabran = datum === iso;
                  return (
                    <button
                      key={iso}
                      type="button"
                      disabled={!dostupan}
                      onClick={() => setDatum(iso)}
                      style={{
                        border: 'none',
                        borderRadius: '12px',
                        padding: '8px 0',
                        fontSize: '14px',
                        fontWeight: 700,
                        fontFamily: 'inherit',
                        cursor: dostupan ? 'pointer' : 'default',
                        background: odabran
                          ? '#7EAEE8'
                          : dostupan
                            ? '#FFFFFF'
                            : 'transparent',
                        color: odabran ? '#243038' : '#3D4142',
                        opacity: dostupan ? 1 : 0.3,
                        boxShadow: odabran
                          ? '0 8px 16px -8px rgba(126,174,232,.9)'
                          : dostupan
                            ? '0 1px 0 rgba(61,65,66,.12)'
                            : 'none',
                      }}
                    >
                      {d.getDate()}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* slotovi */}
          {datum && (
            <div>
              <span style={labelTextStyle}>Odaberite vrijeme</span>
              {ucitavam ? (
                <div
                  style={{
                    fontSize: '14px',
                    opacity: 0.6,
                    fontWeight: 700,
                    padding: '6px 2px',
                  }}
                >
                  Učitavam slobodne termine…
                </div>
              ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {slotovi.map((s) => {
                    const slobodan = !zauzeto.includes(s);
                    const odabran = vrijeme === s;
                    return (
                      <button
                        key={s}
                        type="button"
                        disabled={!slobodan}
                        onClick={() => setVrijeme(s)}
                        style={{
                          border:
                            '2px solid ' + (odabran ? '#7EAEE8' : '#EDE5D4'),
                          background: odabran
                            ? '#7EAEE8'
                            : slobodan
                              ? '#FFFFFF'
                              : '#F1EBDD',
                          color: odabran ? '#243038' : '#3D4142',
                          textDecoration: slobodan ? 'none' : 'line-through',
                          opacity: slobodan ? 1 : 0.45,
                          borderRadius: '999px',
                          padding: '8px 14px',
                          fontSize: '14px',
                          fontWeight: 800,
                          fontFamily: 'inherit',
                          cursor: slobodan ? 'pointer' : 'default',
                        }}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              flexWrap: 'wrap',
            }}
          >
            <button
              type="button"
              onClick={() => posalji(false)}
              disabled={pending || !datum || !vrijeme}
              className="hv-cta"
              style={{
                ...dugmeStyle,
                cursor: pending || !datum || !vrijeme ? 'default' : 'pointer',
                opacity: pending || !datum || !vrijeme ? 0.6 : 1,
              }}
            >
              {pending ? 'Šaljemo…' : 'Rezerviši termin'}
            </button>
            <button
              type="button"
              onClick={() => posalji(true)}
              disabled={pending}
              style={{
                background: 'transparent',
                border: '2px solid #3D4142',
                color: '#3D4142',
                fontFamily: 'var(--font-fredoka)',
                fontWeight: 600,
                fontSize: '15px',
                padding: '12px 22px',
                borderRadius: '999px',
                cursor: pending ? 'default' : 'pointer',
              }}
            >
              Ne mogu naći termin — predložite mi vi
            </button>
            <button
              type="button"
              onClick={() => {
                setKorak(1);
                setError(null);
              }}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontWeight: 800,
                fontSize: '13.5px',
                opacity: 0.6,
                textDecoration: 'underline',
                textUnderlineOffset: '3px',
              }}
            >
              ← nazad na podatke
            </button>
            {error && (
              <span
                role="alert"
                style={{
                  fontSize: '13.5px',
                  fontWeight: 700,
                  color: '#C0503A',
                }}
              >
                {error}
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
}
