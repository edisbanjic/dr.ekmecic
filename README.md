# Stomatološka ordinacija dr. Ekmečić

Next.js (App Router) aplikacija — javni sajt sa kalendarskim zakazivanjem termina i admin panel
sa digitalnim kartonom pacijenata i radnika. Backend: Supabase. Hosting: Vercel.

## Pokretanje

```bash
npm install
npm run dev
```

Sajt radi i bez konfigurisanog Supabase-a — javna forma tada samo loguje zahtjev na serveru,
a admin stranice pokazuju uputu za konfiguraciju.

## Supabase setup

1. Kopirajte `.env.example` u `.env.local` i popunite ključeve (Project Settings → API).
2. Pokrenite `supabase/schema.sql` u Supabase SQL editoru — kreira tabele
   `pacijenti`, `radnici`, `termini` i `zapisi` sa RLS politikama.
3. Kreirajte admin korisnika: Supabase dashboard → Authentication → Users → **Add user**
   (email + lozinka). Tim nalogom se prijavljujete na `/admin/login`.

Pristup podacima:
- **Javno zakazivanje** ide kroz server action sa `SUPABASE_SERVICE_ROLE_KEY`
  (ključ ostaje na serveru); posjetiocima se nikad ne vraćaju lični podaci —
  samo zauzeta vremena.
- **Admin panel** koristi sesiju prijavljenog korisnika (`@supabase/ssr` kolačići),
  pa RLS radi pod `authenticated` rolom. Rute `/admin/*` štiti middleware.

## Funkcionalnosti

- **Javni sajt** (`/`) — dizajn iz Claude Design projekta; zakazivanje po kalendaru:
  posjetilac bira datum (radno vrijeme ordinacije, pauze isključene), vidi slobodne
  slotove od 30 min i rezerviše — termin ulazi u bazu sa statusom „na čekanju".
- **Admin** (`/admin`) — pregled dana + statistika.
  - `/admin/kalendar` — sedmični kalendar termina; potvrda, otkazivanje, završavanje;
    ručno kreiranje termina (uz vezanje za karton pacijenta i radnika).
  - `/admin/pacijenti` — kartoteka: podaci, alergije, zapisi zahvata po zubu,
    historija termina.
  - `/admin/radnici` — karton radnika: uloga, kontakt, status.

## Mapa

Footer koristi interaktivnu Mapbox GL mapu (`components/LocationMap.tsx`) kad je
postavljen `NEXT_PUBLIC_MAPBOX_TOKEN`; bez tokena pada na OpenStreetMap iframe.

## Deploy (Vercel)

Import repozitorija na Vercel i postaviti env varijable iz `.env.example`.
Radno vrijeme i trajanje slota se mijenjaju u `lib/termini.ts`.

## Struktura

- `app/page.tsx` — javna stranica (markup iz dizajna)
- `app/actions.ts` — javne server akcije (slobodni slotovi, rezervacija)
- `app/admin/**` — admin panel (login + zaštićene stranice)
- `app/admin/actions.ts` — CRUD za pacijente, radnike, termine i zapise
- `components/` — BookingForm (kalendar + slotovi), ScrollEffects, Faq, LocationMap, admin komponente
- `lib/termini.ts` — radno vrijeme, generisanje slotova, statusi
- `supabase/schema.sql` — šema baze i RLS
