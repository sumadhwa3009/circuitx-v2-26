-- Public Team page support.
-- 1) A function that returns ONLY the public-safe columns of approved + visible members.
--    (No email, phone or USN ever leaves the database through it.)
create or replace function public.get_public_team()
returns table (
  id uuid, full_name text, society text, team_name text, team_slug text, team_sort int,
  designation text, photo_path text, linkedin_url text, instagram_url text, github_url text
)
language sql stable security definer set search_path = '' as $$
  select m.id, m.full_name, m.society, t.name, t.slug, t.sort_order,
         m.designation, m.photo_path, m.linkedin_url, m.instagram_url, m.github_url
  from public.team_members m
  join public.teams t on t.id = m.team_id
  where m.status = 'approved' and m.show_on_website
  order by t.sort_order, m.full_name;
$$;

-- 2) Is this photo path that of an approved, visible member?
create or replace function public.is_public_photo(p text)
returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.team_members m
    where m.photo_path = p and m.status = 'approved' and m.show_on_website
  );
$$;

revoke execute on function public.get_public_team(), public.is_public_photo(text) from public;
grant execute on function public.get_public_team(), public.is_public_photo(text) to anon, authenticated;

-- 3) Let visitors read ONLY those public photos from the otherwise private bucket.
create policy photos_select_public on storage.objects for select to anon, authenticated
  using (bucket_id = 'team-photos' and public.is_public_photo(name));
