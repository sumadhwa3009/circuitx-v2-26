-- Announcements module: replaces the hardcoded list in src/data/announcements.ts
create table public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 3 and 140),
  description text not null check (char_length(description) between 3 and 1000),
  category text not null default 'Update'
    check (category in ('Registration','Deadline','Shortlisting','Instructions','Update')),
  link_url text check (char_length(link_url) <= 500),
  announced_on date not null default (timezone('Asia/Kolkata', now()))::date,
  is_published boolean not null default true,
  show_in_popup boolean not null default false,
  created_by text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger trg_announcements_touch before update on public.announcements
for each row execute function public.touch_updated_at();

alter table public.announcements enable row level security;

-- visitors: published announcements only
create policy ann_public_select on public.announcements for select to anon, authenticated
  using (is_published);
-- admins with the permission: everything
create policy ann_admin_select on public.announcements for select to authenticated
  using (public.has_permission('announcements.manage'));
create policy ann_admin_insert on public.announcements for insert to authenticated
  with check (public.has_permission('announcements.manage'));
create policy ann_admin_update on public.announcements for update to authenticated
  using (public.has_permission('announcements.manage')) with check (public.has_permission('announcements.manage'));
create policy ann_admin_delete on public.announcements for delete to authenticated
  using (public.has_permission('announcements.manage'));

grant select on public.announcements to anon;
grant select, insert, update, delete on public.announcements to authenticated;

-- move the four existing announcements into the database
insert into public.announcements (title, description, category, link_url, announced_on, is_published, show_in_popup, created_by) values
('Round 1 registrations are now open',
 'Register your team of 2 to 4 members on Unstop and submit your idea. Round 1 is free, and registrations close on 30 November at 11:59 PM. The shortlist of 20 teams, 10 from each theme, is announced on 10 December.',
 'Registration', 'https://unstop.com/p/circuitx-bms-institute-of-technology-and-management-bmsitm-bangalore-1811526', '2026-11-20', true, true, 'seed'),
('The official idea PPT template is out',
 'All ideas must be submitted on the official PPT template. Download it, fill it in and upload it with your Round 1 registration on Unstop.',
 'Instructions', 'https://docs.google.com/presentation/d/1PeX-Um33cy2XsQI6503K0eRa2mSDGFT6WK3JZGqIT2o/edit?usp=sharing', '2026-11-20', true, false, 'seed'),
('Themes released: Powering a Sustainable Future and Embedded Intelligence',
 'CircuitX''26 has two themes. There are no problem statements, so pick one theme and choose your own problem within it. See the full descriptions and focus areas of both themes.',
 'Update', '/themes', '2026-11-19', true, false, 'seed'),
('The CircuitX''26 website is live',
 'Explore the schedule, prizes and event details here. Announcements will be posted on this page as the event progresses.',
 'Update', null, '2026-11-15', true, false, 'seed');
