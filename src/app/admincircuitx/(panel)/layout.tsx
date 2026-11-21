import Link from "next/link";
import { can, requireAdmin } from "@/lib/auth/permissions";
import { signOut } from "../actions";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const admin = await requireAdmin(); // server-side gate for every page in the panel
  const nav = [
    { href: "/admincircuitx/dashboard", label: "Overview", show: true },
    { href: "/admincircuitx/team", label: "Team management", show: can(admin, "team.manage") },
  ].filter((n) => n.show);

  return (
    <div className="adm-shell">
      <aside className="adm-side">
        <p className="adm-eyebrow">CircuitX&apos;26 · Admin</p>
        <nav aria-label="Admin">{nav.map((n) => <Link key={n.href} href={n.href}>{n.label}</Link>)}</nav>
        <div className="adm-user">
          <span>{admin.email}</span>
          <small>{admin.role === "super_admin" ? "Super admin" : "Admin"}</small>
          <form action={signOut}><button className="btn btn-line btn-sm" type="submit"><span>Sign out</span></button></form>
        </div>
      </aside>
      <main className="adm-main">{children}</main>
    </div>
  );
}
