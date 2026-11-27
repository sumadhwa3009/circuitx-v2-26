import { can, getSession, requireAdmin } from "@/lib/auth/permissions";
import { AdminShell, type NavItem, type Profile } from "@/components/admin/AdminShell";
import { createClient } from "@/lib/supabase/server";
import { MODULES } from "@/lib/modules";
import { signOut } from "../actions";

type MyEntry = {
  full_name: string; usn: string; phone: string; society: string | null; designation: string; photo_path: string;
  teams: { name: string } | null;
};

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const admin = await requireAdmin(); // server-side gate for every page in the panel
  const { user } = await getSession();
  const isSuper = admin.role === "super_admin";

  // One entry per module. Add new modules here as they are built.
  const nav: NavItem[] = [{ href: "/admincircuitx/dashboard", label: "Overview", icon: "overview" }];
  if (can(admin, "team.manage")) nav.push({ href: "/admincircuitx/team", label: "Team management", icon: "team" });
  if (can(admin, "announcements.manage")) nav.push({ href: "/admincircuitx/announcements", label: "Announcements", icon: "announcements" });
  if (isSuper) nav.push({ href: "/admincircuitx/admins", label: "Admins", icon: "admins" });

  // The admin's own organiser-form entry (if they filled it) gives the name and the uploaded photo.
  const supabase = await createClient();
  let me: MyEntry | null = null;
  let uploaded: string | null = null;
  if (user) {
    const { data } = await supabase
      .from("team_members")
      .select("full_name, usn, phone, society, designation, photo_path, teams(name)")
      .eq("user_id", user.id)
      .maybeSingle();
    me = (data as unknown as MyEntry | null) ?? null;
    if (me?.photo_path) {
      const { data: s } = await supabase.storage.from("team-photos").createSignedUrl(me.photo_path, 3600);
      uploaded = s?.signedUrl ?? null;
    }
  }

  const meta = (user?.user_metadata ?? {}) as Record<string, unknown>;
  const google = (meta.avatar_url ?? meta.picture ?? null) as string | null;
  const name = (me?.full_name ?? meta.full_name ?? meta.name ?? admin.email) as string;
  const rows: Profile["rows"] = [{ label: "Email", value: admin.email }];
  if (me) {
    if (me.teams?.name) rows.push({ label: "Team", value: me.teams.name });
    if (me.society) rows.push({ label: "Society", value: me.society });
    if (me.designation) rows.push({ label: "Designation", value: me.designation });
    rows.push({ label: "USN", value: me.usn }, { label: "Phone", value: me.phone });
  } else {
    rows.push({ label: "Organiser form", value: "Not submitted" });
  }

  const profile: Profile = {
    name,
    email: admin.email,
    roleLabel: isSuper ? "Super admin" : "Admin",
    isSuper,
    // super admin: Google profile photo; other admins: the photo they uploaded in the organisers form
    photoUrl: isSuper ? (google ?? uploaded) : (uploaded ?? google),
    initial: name[0]?.toUpperCase() ?? "?",
    modules: isSuper ? ["All modules"] : MODULES.filter((m) => admin.permissions.includes(m.key)).map((m) => m.label),
    rows,
  };
  if (profile.modules.length === 0) profile.modules = ["None yet"];

  return (
    <AdminShell nav={nav} profile={profile} signOutAction={signOut}>
      {children}
    </AdminShell>
  );
}
