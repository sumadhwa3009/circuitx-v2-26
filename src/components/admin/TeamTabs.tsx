"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/admincircuitx/team", label: "Submissions" },
  { href: "/admincircuitx/team/teams", label: "Teams" },
];

export function TeamTabs() {
  const path = usePathname().replace(/\/$/, "");
  return (
    <nav className="atabs" aria-label="Team management sections">
      {TABS.map((t) => (
        <Link key={t.href} href={t.href} className={path === t.href ? "on" : ""} aria-current={path === t.href ? "page" : undefined}>{t.label}</Link>
      ))}
    </nav>
  );
}
