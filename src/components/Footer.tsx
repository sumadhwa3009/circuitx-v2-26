import Link from "next/link";
import { Logo } from "./Logo";
import { Village } from "./Art";
import { event, footerNav } from "@/config/event";

export function Footer() {
  const social = Object.entries(event.social).filter(([, v]) => v);
  return (
    <footer className="foot">
      <Village className="foot-village" />
      <div className="foot-body wrap">
        <div>
          <Logo height={34} />
          <p className="foot-desc">{event.description}</p>
          <p>Organised by {event.organisers.map((o) => o.short).join(" and ")} at {event.institution}.</p>
        </div>
        <nav aria-label="Footer"><h2>Explore</h2><ul>{footerNav.map((n) => <li key={n.href}><Link href={n.href}>{n.label}</Link></li>)}</ul></nav>
        <div>
          <h2>Get in touch</h2>
          <ul>
            <li>{event.contact.email ? <a href={`mailto:${event.contact.email}`}>{event.contact.email}</a> : "Contact details: TBA"}</li>
            {social.length === 0 ? <li>Social links: coming soon</li> : social.map(([k, v]) => <li key={k}><a href={v} target="_blank" rel="noopener noreferrer" style={{ textTransform: "capitalize" }}>{k}</a></li>)}
          </ul>
        </div>
      </div>
      <p className="foot-copy">© 2026 {event.name}, {event.institutionShort}. All rights reserved.</p>
    </footer>
  );
}
