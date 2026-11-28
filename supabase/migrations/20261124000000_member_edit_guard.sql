create or replace function public.guard_member_update() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  -- auth.uid() is null for SQL editor / service role, so those are left alone
  if auth.uid() is not null and not public.has_permission('team.manage') then
    new.designation     := old.designation;
    new.status          := old.status;
    new.show_on_website := old.show_on_website;
    new.admin_notes     := old.admin_notes;
  end if;
  return new;
end $$;

create trigger trg_team_members_guard before update on public.team_members
for each row execute function public.guard_member_update();

drop policy tm_update_own on public.team_members;
create policy tm_update_own on public.team_members for update to authenticated
  using (user_id = auth.uid() and status = 'pending' and public.form_is_open())
  with check (
    user_id = auth.uid()
    and email = lower(coalesce(auth.jwt()->>'email',''))
    and status = 'pending' and show_on_website = false and admin_notes is null
  );