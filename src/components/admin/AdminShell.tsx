"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ListOrdered, LogOut, Megaphone, Menu, Users, X } from "lucide-react";

const ICONS = { overview: LayoutDashboard, team: Users, teams: ListOrdered, announcements: Megaphone } as const;
export type NavItem = { href: string; label: string; icon: keyof typeof ICONS };

export function AdminShell({ nav, email, role, signOutAction, children }: {
  nav: NavItem[]; email: string; role: string; signOutAction: () => Promise<void>; children: React.ReactNode;
}) {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    document.body.classList.toggle("lock", open);
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => { window.removeEventListener("keydown", esc); document.body.classList.remove("lock"); };
  }, [open]);

  const brand = (
    <span className="adm-brand"><i aria-hidden="true">CX</i><span>CircuitX&apos;26<small>Admin</small></span></span>
  );

  return (
    <div className="adm-shell">
      <header className="adm-top">
        <button type="button" className="adm-icon-btn" aria-label="Open menu" aria-expanded={open} aria-controls="adm-side" onClick={() => setOpen(true)}><Menu size={22} aria-hidden="true" /></button>
        {brand}
      </header>

      <div className={`adm-scrim ${open ? "show" : ""}`} onClick={() => setOpen(false)} aria-hidden="true" />

      <aside id="adm-side" className={`adm-side ${open ? "open" : ""}`} aria-label="Admin navigation">
        <div className="adm-sidehead">
          {brand}
          <button type="button" className="adm-icon-btn adm-close" aria-label="Close menu" onClick={() => setOpen(false)}><X size={22} aria-hidden="true" /></button>
        </div>
        <nav>
          {nav.map((n) => {
            const Icon = ICONS[n.icon];
            const on = path === n.href || path.startsWith(n.href + "/");
            return <Link key={n.href} href={n.href} className={on ? "on" : ""} aria-current={on ? "page" : undefined}><Icon size={19} aria-hidden="true" />{n.label}</Link>;
          })}
        </nav>
        <div className="adm-user">
          <span className="adm-avatar" aria-hidden="true">{email[0]?.toUpperCase()}</span>
          <div><b title={email}>{email}</b><small>{role}</small></div>
          <form action={signOutAction}><button type="submit" className="adm-icon-btn" aria-label="Sign out" title="Sign out"><LogOut size={19} aria-hidden="true" /></button></form>
        </div>
      </aside>

      <main className="adm-main"><div className="adm-content">{children}</div></main>
    </div>
  );
}
