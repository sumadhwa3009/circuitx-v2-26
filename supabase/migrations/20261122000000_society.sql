-- Which IEEE society the organiser belongs to. Nullable so earlier submissions are not broken;
-- the form and server require it for every new or edited submission.
alter table public.team_members
  add column if not exists society text check (society in ('IEEE PES', 'IEEE CASS'));
