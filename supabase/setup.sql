-- ─────────────────────────────────────────────────────────────────
--  Kriptovalute.hr — Supabase setup SQL
--  Pokreni jednom u Supabase SQL editoru (Dashboard → SQL Editor)
-- ─────────────────────────────────────────────────────────────────

-- ── Korisničke postavke ──────────────────────────────────────────
create table if not exists public.user_settings (
  user_id  uuid references auth.users(id) on delete cascade primary key,
  avatar   text not null default 'satoshi',
  currency text not null default 'eur',
  theme    text not null default 'dark',
  updated_at timestamptz not null default now()
);

alter table public.user_settings enable row level security;

create policy "Korisnik čita vlastite postavke"
  on public.user_settings for select
  using (auth.uid() = user_id);

create policy "Korisnik upisuje vlastite postavke"
  on public.user_settings for insert
  with check (auth.uid() = user_id);

create policy "Korisnik ažurira vlastite postavke"
  on public.user_settings for update
  using (auth.uid() = user_id);

-- ── Portfolio ─────────────────────────────────────────────────────
create table if not exists public.user_portfolio (
  id          uuid default gen_random_uuid() primary key,
  user_id     uuid references auth.users(id) on delete cascade not null,
  coin_id     text not null,
  coin_name   text,
  coin_symbol text,
  amount      numeric not null default 0,
  buy_price   numeric,
  added_at    timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  unique(user_id, coin_id)
);

alter table public.user_portfolio enable row level security;

create policy "Korisnik čita vlastiti portfolio"
  on public.user_portfolio for select
  using (auth.uid() = user_id);

create policy "Korisnik upisuje u vlastiti portfolio"
  on public.user_portfolio for insert
  with check (auth.uid() = user_id);

create policy "Korisnik ažurira vlastiti portfolio"
  on public.user_portfolio for update
  using (auth.uid() = user_id);

create policy "Korisnik briše iz vlastitog portfolia"
  on public.user_portfolio for delete
  using (auth.uid() = user_id);
