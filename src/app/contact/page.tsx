import type { Metadata } from "next";
import { PageBanner } from "@/components/PageBanner";
import { event } from "@/config/event";
export const metadata: Metadata = { title: "Contact", description: "How to reach the CircuitX'26 organising committee." };
export default function Contact() {
  const c = event.contact;
  const social = event.social.filter((s) => s.url);
  return (<>
    <PageBanner art="mask" title="Contact" intro="Reach the organising committee." />
    <section className="sec"><div className="wrap contact-list">
      <div>
        <b>Email</b>
        <ul>
          {event.organisers.map((o) => (
            <li key={o.id}>
              {o.short}: {o.email ? <a className="link" href={`mailto:${o.email}`}>{o.email}</a> : "TBA"}
            </li>
          ))}
        </ul>
      </div>
      <p><b>Organising committee</b>{c.committee || "TBA"}</p>
      <div>
        <b>Contact persons</b>
        {c.persons.length ? (
          <ul>
            {c.persons.map((p) => (
              <li key={p.name}>
                {p.name}, {p.role}
                {p.phone && <> · <a className="link" href={`tel:${p.phone.replace(/\s/g, "")}`}>{p.phone}</a></>}
              </li>
            ))}
          </ul>
        ) : "TBA"}
      </div>
      <p><b>Social media</b>
        {social.length ? (
          <ul>
            {social.map((s) => (
              <li key={s.id}><a className="link" href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a></li>
            ))}
          </ul>
        ) : "Coming soon"}</p>
    </div></section>
  </>);
}
