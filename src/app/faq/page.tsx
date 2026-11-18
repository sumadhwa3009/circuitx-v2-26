import type { Metadata } from "next";
import { PageBanner } from "@/components/PageBanner";
import { FaqList } from "@/components/FaqList";
import { faqs } from "@/data/faqs";
import { event } from "@/config/event";
import { SocialIcons, EmailIcons, PhoneLink } from "@/components/ContactIcons";

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
          <EmailIcons organisers={event.organisers} />
        </div>
        <p><b>Organising Societies</b>{event.contact.committee || "TBA"}</p>
        <div>
          <b>Contact persons</b>
          {event.contact.persons.length ? (
            <ul>
              {event.contact.persons.map((person) => (
                <li key={person.name}>
                  {person.phone ? <PhoneLink name={person.name} phone={person.phone} /> : person.name}
                  <span>, {person.role}</span>
                </li>
              ))}
            </ul>
          ) : "TBA"}
        </div>
        <div>
          <b>Social media</b>
          {social.length ? <SocialIcons items={social} /> : "Coming soon"}
        </div>
      </div>
    </section>
  </>);
}