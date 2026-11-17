import Link from "next/link";
import { Logo } from "./Logo";
import { Village } from "./Art";
import { event, footerNav } from "@/config/event";

export function Footer() {
  const social = event.social.filter((s) => s.url);
  return (
    <footer className="foot">
      <Village className="foot-village" />
      <div className="foot-body wrap">
        <div>
          <Logo height={90} />
          <p className="foot-desc">{event.description}</p>
          <p>Organised by {event.organisers.map((o) => o.short).join(" and ")} at {event.institution}.</p>
        </div>
        <nav aria-label="Footer"><h2>Explore</h2><ul>{footerNav.map((n) => <li key={n.href}><Link href={n.href}>{n.label}</Link></li>)}</ul></nav>
        <div>
          <h2>Get in touch</h2>
          <ul>
            {event.organisers.map((o) => (
              <li key={o.id}>{o.email ? <a href={`mailto:${o.email}`}>{o.short}: {o.email}</a> : `${o.short}: TBA`}</li>
            ))}
            {social.length === 0 ? <li>Social links: coming soon</li> : social.map((s) => <li key={s.id}><a href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a></li>)}
          </ul>
        </div>
      </div>
      <p className="foot-copy">© 2026 {event.name}, {event.institutionShort}. All rights reserved.</p>
    </footer>
  );
}
