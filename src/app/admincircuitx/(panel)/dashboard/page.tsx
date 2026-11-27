import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin, Megaphone, ShieldCheck, Users } from "lucide-react";
import { AdminLogo } from "@/components/admin/AdminLogo";
import { can, requireAdmin } from "@/lib/auth/permissions";
import { event } from "@/config/event";

function eventStatus() {
  const now = Date.now();
  const start = Date.parse(event.build.start);
  const end = Date.parse(event.build.end);
  if (now < start) {
    const days = Math.ceil((start - now) / 86400000);
    return { big: String(days), small: days === 1 ? "day to the final round" : "days to the final round" };
  }
  if (now < end) return { big: "Live", small: "final round in progress" };
  return { big: "Done", small: "the event has concluded" };
}

export default async function Dashboard({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const admin = await requireAdmin();
  const { error } = await searchParams;
  const status = eventStatus();

  const modules = [
    { href: "/admincircuitx/team", title: "Team management", desc: "Organiser submissions, the organisers form and team categories", Icon: Users, show: can(admin, "team.manage") },
    { href: "/admincircuitx/announcements", title: "Announcements", desc: "Publish updates shown on the home page and as a popup", Icon: Megaphone, show: can(admin, "announcements.manage") },
    { href: "/admincircuitx/admins", title: "Admins", desc: "Choose who can sign in and which modules they manage", Icon: ShieldCheck, show: admin.role === "super_admin" },
  ].filter((m) => m.show);

  return (
    <>
      <div className="adm-ph"><div><h1>Overview</h1><p className="amuted">Hackathon management portal</p></div></div>
      {error === "forbidden" && <p className="aalert" role="alert">You don&apos;t have permission for that section.</p>}

      <section className="acard evcard">
        <div className="evinfo">
          <AdminLogo size="md" />
          <p><CalendarDays size={16} aria-hidden="true" />{event.dates.label}</p>
          <p><MapPin size={16} aria-hidden="true" />{event.venue.name}, {event.institutionShort}</p>
        </div>
        <div className="evcount"><b>{status.big}</b><span>{status.small}</span></div>
      </section>

      <h2 className="adm-sec">Modules</h2>
      <div className="alinks">
        {modules.map(({ href, title, desc, Icon }) => (
          <Link key={href} href={href} className="alink">
            <Icon size={22} aria-hidden="true" />
            <div><b>{title}</b><span>{desc}</span></div>
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        ))}
      </div>
      <p className="amuted adm-note">More modules will appear here as they are added.</p>
    </>
  );
}
