"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ListOrdered, LogOut, Megaphone, Menu, ShieldCheck, Users, X } from "lucide-react";
import { ActionForm, SubmitButton } from "@/components/ui/ActionForm";
import { SessionGuard } from "@/components/auth/SessionGuard";
import { AdminLogo } from "@/components/admin/AdminLogo";
import { POLICY } from "@/lib/session-policy";

const ICONS = { overview: LayoutDashboard, team: Users, teams: ListOrdered, announcements: Megaphone, admins: ShieldCheck } as const;
export type NavItem = { href: string; label: string; icon: keyof typeof ICONS };

export type Profile = {
  name: string; email: string; roleLabel: string; isSuper: boolean;
  photoUrl: string | null; initial: string;
  modules: string[]; rows: { label: string; value: string }[];
};

function Avatar({ profile, className }: { profile: Profile; className: string }) {
  return (
    <span className={className} aria-hidden="true">
      {profile.photoUrl ? /* eslint-disable-next-line @next/next/no-img-element */ <img src={profile.photoUrl} alt="" referrerPolicy="no-referrer" /> : profile.initial}
    </span>
  );
}

function ProfileModal({ profile, onClose }: { profile: Profile; onClose: () => void }) {
  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onClose]);

  return (
    <div className="pf-overlay" onClick={onClose}>
      <div className="pf-card" role="dialog" aria-modal="true" aria-labelledby="pf-name" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="adm-icon-btn pf-x" aria-label="Close" onClick={onClose}><X size={20} aria-hidden="true" /></button>
        <Avatar profile={profile} className="pf-photo" />
        <div className="pf-head">
          <h2 id="pf-name">{profile.name}</h2>
          <span className={`apill ${profile.isSuper ? "approved" : ""}`}>{profile.roleLabel}</span>
        </div>
        <div className="pf-block">
          <p className="pf-label">Can manage</p>
          <div className="pf-chips">{profile.modules.map((m) => <span key={m}>{m}</span>)}</div>
        </div>
        <dl className="pf-rows">
          {profile.rows.map((r) => <div key={r.label}><dt>{r.label}</dt><dd>{r.value}</dd></div>)}
        </dl>
      </div>
    </div>
  );
}

export function AdminShell({ nav, profile, signOutAction, children }: {
  nav: NavItem[]; profile: Profile; signOutAction: () => Promise<void>; children: React.ReactNode;
}) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    document.body.classList.toggle("lock", open);
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => { window.removeEventListener("keydown", esc); document.body.classList.remove("lock"); };
  }, [open]);

  const brand = (
    <span className="adm-brand"><AdminLogo size="sm" priority /><small>Admin</small></span>
  );

  return (
    <div className="adm-shell">
      <SessionGuard idleMs={POLICY.admin.idleMs} loginPath="/admincircuitx" area="admin" />
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
          <button type="button" className="adm-userbtn" aria-haspopup="dialog" onClick={() => setShowProfile(true)} title="View my details">
            <Avatar profile={profile} className="adm-avatar" />
            <span className="adm-uname"><b>{profile.name}</b><small>{profile.roleLabel}</small></span>
          </button>
          <ActionForm action={signOutAction}><SubmitButton iconOnly className="adm-icon-btn" aria-label="Sign out" title="Sign out"><LogOut size={19} aria-hidden="true" /></SubmitButton></ActionForm>
        </div>
      </aside>

      {showProfile && <ProfileModal profile={profile} onClose={() => setShowProfile(false)} />}

      <main className="adm-main"><div className="adm-content">{children}</div></main>
    </div>
  );
}
