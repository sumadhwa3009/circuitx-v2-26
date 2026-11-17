import type { Metadata } from "next";
import { PageBanner } from "@/components/PageBanner";
import { FaqList } from "@/components/FaqList";
import { faqs } from "@/data/faqs";
import { event } from "@/config/event";

export const metadata: Metadata = { title: "FAQ & contact", description: "Frequently asked questions and contact information for CircuitX'26." };

export default function Faq() {
  const social = event.social.filter((item) => item.url);

  return (<>
    <PageBanner art="santa" title="FAQ & contact" intro="Answers to common questions and ways to reach the organising committee." />
    <section className="sec"><div className="wrap" style={{ maxWidth: 860 }}><FaqList items={faqs} /></div></section>
    <section className="sec sec-deep" id="contact">
      <div className="wrap contact-list">
        <h2 className="h2">Get in touch</h2>
        <div>
          <b>Email</b>
          <ul>
            {event.organisers.map((organiser) => (
              <li key={organiser.id}>{organiser.short}: {organiser.email ? <a className="link" href={`mailto:${organiser.email}`}>{organiser.email}</a> : "TBA"}</li>
            ))}
          </ul>
        </div>
        <p><b>Organising Societies</b>{event.contact.committee || "TBA"}</p>
        <div>
          <b>Contact persons</b>
          {event.contact.persons.length ? <ul>{event.contact.persons.map((person) => <li key={person.name}>{person.name}, {person.role}{person.phone && <> · <a className="link" href={`tel:${person.phone.replace(/\s/g, "")}`}>{person.phone}</a></>}</li>)}</ul> : "TBA"}
        </div>
        <b>Social media</b>{social.length ? <ul>{social.map((item) => <li key={item.id}><a className="link" href={item.url} target="_blank" rel="noopener noreferrer">{item.label}</a></li>)}</ul> : "Coming soon"}
      </div>
    </section>
  </>);
}
