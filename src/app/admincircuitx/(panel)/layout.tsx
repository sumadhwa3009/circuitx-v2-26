import { can, requireAdmin } from "@/lib/auth/permissions";
import { AdminShell, type NavItem } from "@/components/admin/AdminShell";
import { signOut } from "../actions";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const admin = await requireAdmin(); // server-side gate for every page in the panel
  // One entry per module. Add new modules here as they are built.
  const nav: NavItem[] = [{ href: "/admincircuitx/dashboard", label: "Overview", icon: "overview" }];
  if (can(admin, "team.manage")) nav.push({ href: "/admincircuitx/team", label: "Team management", icon: "team" });
  if (can(admin, "announcements.manage")) nav.push({ href: "/admincircuitx/announcements", label: "Announcements", icon: "announcements" });
  return (
    <AdminShell nav={nav} email={admin.email} role={admin.role === "super_admin" ? "Super admin" : "Admin"} signOutAction={signOut}>
      {children}
    </AdminShell>
  );
}
