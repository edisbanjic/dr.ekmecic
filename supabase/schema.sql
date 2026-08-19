-- Clinic schema — run in the Supabase SQL editor.
-- Safe to re-run in development: drops the previous Bosnian and English tables first.

drop table if exists zapisi cascade;
drop table if exists termini cascade;
drop table if exists pacijenti cascade;
drop table if exists radnici cascade;
drop table if exists objave cascade;
drop table if exists records cascade;
drop table if exists appointments cascade;
drop table if exists patients cascade;
drop table if exists staff cascade;
drop table if exists posts cascade;

drop policy if exists "objave slike citanje" on storage.objects;
drop policy if exists "objave slike upload" on storage.objects;
drop policy if exists "objave slike izmjena" on storage.objects;
drop policy if exists "objave slike brisanje" on storage.objects;
drop policy if exists "avatari citanje" on storage.objects;
drop policy if exists "avatari upload" on storage.objects;
drop policy if exists "avatari izmjena" on storage.objects;
drop policy if exists "avatari brisanje" on storage.objects;
drop policy if exists "posts images read" on storage.objects;
drop policy if exists "posts images upload" on storage.objects;
drop policy if exists "posts images update" on storage.objects;
drop policy if exists "posts images delete" on storage.objects;
drop policy if exists "avatars read" on storage.objects;
drop policy if exists "avatars upload" on storage.objects;
drop policy if exists "avatars update" on storage.objects;
drop policy if exists "avatars delete" on storage.objects;

-- Direct DELETE from storage.objects/buckets is blocked by Supabase.
-- Old buckets (objave, avatari) can stay unused; new ones are created below.

-- Staff records
create table staff (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  first_name text not null,
  last_name text not null,
  role text not null,
  phone text,
  email text,
  hired_at date,
  notes text,
  active boolean not null default true,
  -- doctors appear in the public dropdown and have their own slots
  is_doctor boolean not null default false,
  -- link to the auth account ("My profile" and "my appointments" filter)
  user_id uuid unique references auth.users (id) on delete set null,
  image_url text,
  biography text,
  internal_notes text
);

-- Patient records
create table patients (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  first_name text not null,
  last_name text not null,
  phone text,
  email text,
  date_of_birth date,
  address text,
  allergies text,
  notes text,
  -- primary doctor
  staff_id uuid references staff (id) on delete set null
);

-- Appointments (public booking + admin calendar)
create table appointments (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  -- null = patient asked the clinic to propose a time
  date date,
  time time,
  duration_min int not null default 30,
  name text not null,
  phone text,
  email text,
  service text,
  notes text,
  -- staff note when completing the appointment
  report text,
  status text not null default 'pending'
    check (status in ('pending', 'confirmed', 'cancelled', 'completed')),
  patient_id uuid references patients (id) on delete set null,
  staff_id uuid references staff (id) on delete set null
);

-- One active appointment per slot PER DOCTOR (appointments without a doctor share one bucket)
create unique index appointments_slot_idx on appointments (coalesce(staff_id::text, ''), date, time)
  where status <> 'cancelled';

-- Chart notes (procedures, findings, remarks)
create table records (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  patient_id uuid not null references patients (id) on delete cascade,
  staff_id uuid references staff (id) on delete set null,
  date date not null default current_date,
  tooth text,
  description text not null
);

-- RLS: only signed-in staff have access; public booking goes through
-- a server action with the service role key.
alter table patients enable row level security;
alter table staff enable row level security;
alter table appointments enable row level security;
alter table records enable row level security;

create policy "staff full access" on patients
  for all to authenticated using (true) with check (true);
create policy "staff full access" on staff
  for all to authenticated using (true) with check (true);
create policy "staff full access" on appointments
  for all to authenticated using (true) with check (true);
create policy "staff full access" on records
  for all to authenticated using (true) with check (true);

-- Posts (tips/news) — written from the admin panel
create table posts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  title text not null,
  slug text not null unique,
  summary text,
  content text not null,
  image_url text,
  category text not null default 'Savjeti',
  published boolean not null default false,
  date date not null default current_date
);

alter table posts enable row level security;
create policy "staff full access" on posts
  for all to authenticated using (true) with check (true);
create policy "public read published" on posts
  for select to anon using (published);

-- Storage: publicly readable post images, upload for staff only
insert into storage.buckets (id, name, public) values ('posts', 'posts', true)
on conflict (id) do nothing;

create policy "posts images read" on storage.objects
  for select using (bucket_id = 'posts');
create policy "posts images upload" on storage.objects
  for insert to authenticated with check (bucket_id = 'posts');
create policy "posts images update" on storage.objects
  for update to authenticated using (bucket_id = 'posts');
create policy "posts images delete" on storage.objects
  for delete to authenticated using (bucket_id = 'posts');

-- Storage: publicly readable profile photos, upload for staff only
insert into storage.buckets (id, name, public) values ('avatars', 'avatars', true)
on conflict (id) do nothing;

create policy "avatars read" on storage.objects
  for select using (bucket_id = 'avatars');
create policy "avatars upload" on storage.objects
  for insert to authenticated with check (bucket_id = 'avatars');
create policy "avatars update" on storage.objects
  for update to authenticated using (bucket_id = 'avatars');
create policy "avatars delete" on storage.objects
  for delete to authenticated using (bucket_id = 'avatars');
