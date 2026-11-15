import type { Metadata } from "next";
import { PageBanner } from "@/components/PageBanner";
import { event } from "@/config/event";
export const metadata: Metadata = { title: "Contact", description: "How to reach the CircuitX'26 organising committee." };
export default function Contact() {
  const c = event.contact;
  const social = Object.entries(event.social).filter(([, v]) => v);
  return (<>
    <PageBanner art="mask" title="Contact" intro="Reach the organising committee." />
    <section className="sec"><div className="wrap contact-list">
      <p><b>Email</b>{c.email ? <a className="link" href={`mailto:${c.email}`}>{c.email}</a> : "TBA"}</p>
      <p><b>Organising committee</b>{c.committee || "TBA"}</p>
      <div><b>Contact persons</b>{c.persons.length ? <ul>{c.persons.map((p) => <li key={p.name}>{p.name}, {p.role}</li>)}</ul> : "TBA"}</div>
      <p><b>Social media</b>{social.length ? social.map(([k, v]) => <a key={k} className="link" style={{ marginRight: 18, textTransform: "capitalize" }} href={v} target="_blank" rel="noopener noreferrer">{k}</a>) : "Coming soon"}</p>
    </div></section>
  </>);
}
