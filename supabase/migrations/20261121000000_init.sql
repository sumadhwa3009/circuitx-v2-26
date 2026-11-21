-- CircuitX'26 backend: admins, teams, organiser submissions, form switch, audit log, photo storage.
-- Run once in Supabase → SQL Editor (or via the Supabase CLI).

create extension if not exists pgcrypto;

-- ───────────── tables ─────────────
create table public.admins (
  id uuid primary key default gen_random_uuid(),
  email text not null unique check (email = lower(email)),
  role text not null default 'admin' check (role in ('super_admin','admin')),
  permissions text[] not null default '{}',
  created_by text,
  created_at timestamptz not null default now()
);

create table public.teams (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  sort_order int not null default 0,
  is_active boolean not null default true
);

create table public.team_members (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  full_name text not null check (char_length(full_name) between 2 and 100),
  usn text not null unique check (usn = upper(usn) and usn ~ '^[A-Z0-9]{8,15}$'),
  email text not null unique check (email = lower(email)),
  phone text not null check (phone ~ '^[0-9]{10}$'),
  photo_path text not null,
  team_id uuid not null references public.teams(id),
  designation text not null default 'Member',
  linkedin_url text check (char_length(linkedin_url) <= 300),
  instagram_url text check (char_length(instagram_url) <= 300),
  github_url text check (char_length(github_url) <= 300),
  branch text check (char_length(branch) <= 60),
  year smallint check (year between 1 and 4),
  tshirt_size text check (tshirt_size in ('XS','S','M','L','XL','XXL')),
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  show_on_website boolean not null default false,
  admin_notes text,
  submitted_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.form_settings (
  key text primary key,
  is_open boolean not null default false,
  closes_at timestamptz,
  closed_message text not null default 'The organisers form is not accepting responses right now.',
  updated_by text,
  updated_at timestamptz not null default now()
);

create table public.audit_log (
  id bigint generated always as identity primary key,
  actor_email text not null,
  action text not null,
  entity text,
  entity_id text,
  details jsonb,
  created_at timestamptz not null default now()
);

create function public.touch_updated_at() returns trigger
language plpgsql set search_path = '' as $$
begin new.updated_at = now(); return new; end $$;

create trigger trg_team_members_touch before update on public.team_members
for each row execute function public.touch_updated_at();

-- ───────────── helper functions (security definer = no RLS recursion) ─────────────
create function public.is_admin() returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.admins a
                 where a.email = lower(coalesce(auth.jwt()->>'email','')));
$$;

create function public.is_super_admin() returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.admins a
                 where a.email = lower(coalesce(auth.jwt()->>'email','')) and a.role = 'super_admin');
$$;

create function public.has_permission(p text) returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.admins a
                 where a.email = lower(coalesce(auth.jwt()->>'email',''))
                   and (a.role = 'super_admin' or p = any(a.permissions)));
$$;

create function public.form_is_open() returns boolean
language sql stable security definer set search_path = '' as $$
  select coalesce((select s.is_open and (s.closes_at is null or s.closes_at > now())
                   from public.form_settings s where s.key = 'team_registration'), false);
$$;

revoke execute on function public.is_admin(), public.is_super_admin(), public.has_permission(text), public.form_is_open() from public;
grant execute on function public.is_admin(), public.is_super_admin(), public.has_permission(text), public.form_is_open() to anon, authenticated;

-- ───────────── row level security ─────────────
alter table public.admins        enable row level security;
alter table public.teams         enable row level security;
alter table public.team_members  enable row level security;
alter table public.form_settings enable row level security;
alter table public.audit_log     enable row level security;

-- admins: everyone signed in may read their OWN row; super admins manage all
create policy admins_select on public.admins for select to authenticated
  using (email = lower(coalesce(auth.jwt()->>'email','')) or public.is_super_admin());
create policy admins_write on public.admins for all to authenticated
  using (public.is_super_admin()) with check (public.is_super_admin());

-- teams: public read, team.manage writes
create policy teams_select on public.teams for select to anon, authenticated using (true);
create policy teams_write on public.teams for all to authenticated
  using (public.has_permission('team.manage')) with check (public.has_permission('team.manage'));

-- form_settings: public read (so the form can show open/closed), team.manage updates
create policy fs_select on public.form_settings for select to anon, authenticated using (true);
create policy fs_update on public.form_settings for update to authenticated
  using (public.has_permission('team.manage')) with check (public.has_permission('team.manage'));

-- team_members
create policy tm_select_own on public.team_members for select to authenticated
  using (user_id = auth.uid());
create policy tm_select_admin on public.team_members for select to authenticated
  using (public.has_permission('team.manage'));

create policy tm_insert_own on public.team_members for insert to authenticated
  with check (
    user_id = auth.uid()
    and email = lower(coalesce(auth.jwt()->>'email',''))   -- email always comes from the Google session
    and public.form_is_open()                              -- toggle enforced in the database
    and status = 'pending' and show_on_website = false
    and designation = 'Member' and admin_notes is null
  );

create policy tm_update_own on public.team_members for update to authenticated
  using (user_id = auth.uid() and status = 'pending' and public.form_is_open())
  with check (
    user_id = auth.uid()
    and email = lower(coalesce(auth.jwt()->>'email',''))
    and status = 'pending' and show_on_website = false
    and designation = 'Member' and admin_notes is null
  );

create policy tm_update_admin on public.team_members for update to authenticated
  using (public.has_permission('team.manage')) with check (public.has_permission('team.manage'));
create policy tm_delete_admin on public.team_members for delete to authenticated
  using (public.has_permission('team.manage'));

-- audit_log: any admin can write, super admins read
create policy audit_insert on public.audit_log for insert to authenticated with check (public.is_admin());
create policy audit_select on public.audit_log for select to authenticated using (public.is_super_admin());

-- ───────────── photo storage (private bucket) ─────────────
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('team-photos', 'team-photos', false, 2097152, array['image/jpeg','image/png','image/webp'])
on conflict (id) do nothing;

create policy photos_insert_own on storage.objects for insert to authenticated
  with check (bucket_id = 'team-photos' and (storage.foldername(name))[1] = auth.uid()::text and public.form_is_open());
create policy photos_update_own on storage.objects for update to authenticated
  using (bucket_id = 'team-photos' and (storage.foldername(name))[1] = auth.uid()::text and public.form_is_open());
create policy photos_select on storage.objects for select to authenticated
  using (bucket_id = 'team-photos' and ((storage.foldername(name))[1] = auth.uid()::text or public.has_permission('team.manage')));
create policy photos_delete_admin on storage.objects for delete to authenticated
  using (bucket_id = 'team-photos' and public.has_permission('team.manage'));

-- ───────────── seed data ─────────────
insert into public.teams (name, slug, sort_order) values
  ('Chairperson','chairperson',1),
  ('Event Head','event-head',2),
  ('Event Coordinators','event-coordinators',3),
  ('Design','design',4),
  ('Operations & Logistics','operations-logistics',5),
  ('Marketing','marketing',6),
  ('Web & Tech','web-tech',7),
  ('Content & Documentation','content-documentation',8),
  ('Sponsorship & PR','sponsorship-pr',9),
  ('Registration & Participant Management','registration-participants',10),
  ('Hospitality & Food','hospitality-food',11),
  ('Technical & Hardware Support','technical-hardware',12),
  ('Finance','finance',13),
  ('Volunteers','volunteers',14);

insert into public.form_settings (key, is_open) values ('team_registration', false);

insert into public.admins (email, role, created_by)
values ('sumadhwarao2005@gmail.com', 'super_admin', 'seed');
