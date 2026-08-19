# Dental clinic dr. Ekmečić

Next.js (App Router) app — public site with calendar booking and an admin panel
with digital charts for patients and staff. Backend: Supabase. Hosting: Vercel.

## Run locally

```bash
npm install
npm run dev
```

The site works without Supabase configured — the public form then only logs the
request on the server, and admin pages show setup instructions.

## Supabase setup

1. Copy `.env.example` to `.env.local` and fill in the keys (Project Settings → API).
2. Run `supabase/schema.sql` in the Supabase SQL editor — creates tables
   `patients`, `staff`, `appointments`, `records` and `posts` with RLS policies.
   Safe to re-run in development (drops previous tables first).
3. Create an admin user: Supabase dashboard → Authentication → Users → **Add user**
   (email + password). Sign in at `/admin/login`.

Data access:
- **Public booking** goes through a server action with `SUPABASE_SERVICE_ROLE_KEY`
  (the key stays on the server); visitors never receive personal data —
  only occupied times.
- **Admin panel** uses the signed-in user's session (`@supabase/ssr` cookies),
  so RLS runs under the `authenticated` role. `/admin/*` routes are guarded by middleware.

## Features

- **Public site** (`/`) — booking by calendar: the visitor picks a date
  (clinic opening hours, breaks excluded), sees free 30-min slots and reserves —
  the appointment enters the database with status “pending”.
- **Admin** (`/admin`) — day overview + stats.
  - `/admin/calendar` — weekly appointment calendar; confirm, cancel, complete;
    manual booking (linked to a patient chart and staff member).
  - `/admin/patients` — charts: details, allergies, tooth procedure notes,
    appointment history.
  - `/admin/staff` — staff records: role, contact, status.
  - `/admin/posts` — tips/news published on `/savjeti` (rewritten from `app/tips`).

## Map

The footer uses an interactive Mapbox GL map (`components/LocationMap.tsx`) when
`NEXT_PUBLIC_MAPBOX_TOKEN` is set; without a token it falls back to an OpenStreetMap iframe.

## Deploy (Vercel)

Import the repository on Vercel and set the env vars from `.env.example`.
Opening hours and slot length are changed in `lib/appointments.ts`.

## Structure

- `app/page.tsx` — public page
- `app/actions.ts` — public server actions (free slots, booking)
- `app/admin/**` — admin panel (login + protected pages)
- `app/admin/actions.ts` — CRUD for patients, staff, appointments and records
- `components/` — BookingForm, ScrollEffects, Faq, LocationMap, admin components
- `lib/appointments.ts` — opening hours, slot generation, statuses
- `supabase/schema.sql` — database schema and RLS
