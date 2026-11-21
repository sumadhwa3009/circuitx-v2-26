import Link from "next/link";
import { Logo } from "./Logo";
import { Village } from "./Art";
import { event, footerNav } from "@/config/event";
import { SocialIcons, EmailIcons, PhoneLink } from "./ContactIcons";

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
          {event.contact.persons.length ? (
            <ul>
              {event.contact.persons.map((person) => (
                <li key={person.name}>
                  {person.phone ? <PhoneLink name={person.name} phone={person.phone} /> : person.name}
                </li>
              ))}
            </ul>
          ) : "TBA"}

          <EmailIcons organisers={event.organisers} />
          {social.length === 0 ? <p>Social links: coming soon</p> : <SocialIcons items={social} />}
        </div>
        <div>
          <h2>Quick Links</h2>
          <ul>
            <li><Link href={event.venue.mapUrl} target="_blank" rel="noopener noreferrer">Campus Map</Link></li>
            <li><Link href={event.quicklinks.cocurl} target="_blank" rel="noopener noreferrer">Code of Conduct</Link></li>
            <li><Link href="/terms">Terms & Conditions</Link></li>
            <li><Link href="/privacy">Privacy Notice</Link></li>
          </ul>
        </div>
      </div>
      <p className="foot-copy">© 2026 {event.name}, {event.institutionShort}. All rights reserved.</p>
    </footer>
  );
}