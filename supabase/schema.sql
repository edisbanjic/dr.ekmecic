-- Šema baze za ordinaciju — pokrenuti u Supabase SQL editoru.

-- Digitalni karton radnika
create table radnici (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  ime text not null,
  prezime text not null,
  uloga text not null,
  telefon text,
  email text,
  datum_zaposlenja date,
  napomena text,
  aktivan boolean not null default true,
  -- doktori se pojavljuju u javnom dropdownu i imaju vlastite slotove
  je_doktor boolean not null default false,
  -- veza sa auth nalogom ("Moj profil" i filter "moji termini")
  user_id uuid unique references auth.users (id) on delete set null,
  slika_url text,
  biografija text,
  biljeske text
);

-- Digitalni karton pacijenata
create table pacijenti (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  ime text not null,
  prezime text not null,
  telefon text,
  email text,
  datum_rodjenja date,
  adresa text,
  alergije text,
  napomena text,
  -- čiji je klijent (primarni doktor)
  radnik_id uuid references radnici (id) on delete set null
);

-- Termini (javno zakazivanje + admin kalendar)
create table termini (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  -- null = pacijent je tražio da mu ordinacija predloži termin
  datum date,
  vrijeme time,
  trajanje_min int not null default 30,
  ime text not null,
  telefon text,
  usluga text,
  napomena text,
  status text not null default 'na_cekanju'
    check (status in ('na_cekanju', 'potvrdjen', 'otkazan', 'zavrsen')),
  pacijent_id uuid references pacijenti (id) on delete set null,
  radnik_id uuid references radnici (id) on delete set null
);

-- Jedan aktivan termin po slotu PO DOKTORU (termini bez doktora dijele jedan "bucket")
create unique index termini_slot_idx on termini (coalesce(radnik_id::text, ''), datum, vrijeme)
  where status <> 'otkazan';

-- Zapisi u kartonu pacijenta (zahvati, nalazi, napomene)
create table zapisi (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  pacijent_id uuid not null references pacijenti (id) on delete cascade,
  radnik_id uuid references radnici (id) on delete set null,
  datum date not null default current_date,
  zub text,
  opis text not null
);

-- RLS: samo prijavljeni (osoblje) imaju pristup; javno zakazivanje ide
-- kroz server action sa service role ključem.
alter table pacijenti enable row level security;
alter table radnici enable row level security;
alter table termini enable row level security;
alter table zapisi enable row level security;

create policy "osoblje puni pristup" on pacijenti
  for all to authenticated using (true) with check (true);
create policy "osoblje puni pristup" on radnici
  for all to authenticated using (true) with check (true);
create policy "osoblje puni pristup" on termini
  for all to authenticated using (true) with check (true);
create policy "osoblje puni pristup" on zapisi
  for all to authenticated using (true) with check (true);

-- Storage: javno čitljive profilne slike, upload samo za osoblje
insert into storage.buckets (id, name, public) values ('avatari', 'avatari', true)
on conflict (id) do nothing;

create policy "avatari citanje" on storage.objects
  for select using (bucket_id = 'avatari');
create policy "avatari upload" on storage.objects
  for insert to authenticated with check (bucket_id = 'avatari');
create policy "avatari izmjena" on storage.objects
  for update to authenticated using (bucket_id = 'avatari');
create policy "avatari brisanje" on storage.objects
  for delete to authenticated using (bucket_id = 'avatari');
