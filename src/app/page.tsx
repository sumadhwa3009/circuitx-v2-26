import Link from "next/link";
import { Hero, Tape } from "@/components/Hero";
import { Rail } from "@/components/Rail";
import { CircuitTree, Burst, Mask } from "@/components/Art";
import { DomainGrid, DomainsNote } from "@/components/Domains";
import { XFile } from "@/components/XFile";
import { Route } from "@/components/Route";
import { Countdown } from "@/components/Countdown";
import { FaqList } from "@/components/FaqList";
import { AnnouncementCard } from "@/components/AnnouncementCard";
import { Terminal } from "@/components/Terminal";
import { RegisterButton } from "@/components/RegisterButton";
import { event } from "@/config/event";
import { faqs } from "@/data/faqs";
import { announcements } from "@/data/announcements";
import { Prizes } from "@/components/Prizes";
import Image from "next/image";
import { PartnerLogos } from "@/components/PartnerLogos";
import { PrizeBackdrop, Gift } from "@/components/PrizeArt";
import {
  Clock,
  Users,
  Layers,
  GraduationCap,
  FilePenLine,
  Compass,
  ShieldQuestion,
  MapPin,
} from "lucide-react";

const pillars = [
  {
    Icon: FilePenLine,
    t: "No predefined problem statements",
    d: "You find the problem worth solving.",
  },
  {
    Icon: Compass,
    t: "Freedom to innovate",
    d: "Two broad domains. Your idea, your approach, your prototype.",
  },
  {
    Icon: ShieldQuestion,
    t: "The unexpected X challenge",
    d: "Revealed halfway through. Every team has to adapt.",
  },
];
const info = [
  { Icon: Clock, k: "16 hours", v: "An overnight build" },
  {
    Icon: Users,
    k: `${event.team.min} to ${event.team.max}`,
    v: "Members per team",
  },
  { Icon: Layers, k: "2 domains", v: "PES and CAS " },
  {
    Icon: GraduationCap,
    k: "BMSIT&M only",
    v: "All branches, all academic years",
  },
];

export default function Home() {
  return (
    <>
      <Rail />
      <Hero />
      <Tape />
      <PartnerLogos />

      <section className="sec" id="about" data-rail="About">
        <div className="wrap about">
          <div className="about-art">
            <CircuitTree />
          </div>
          <div>
            <h2 className="h2">
              Not another hackathon. A different way to innovate.
            </h2>
            <p className="lead">
              There are no problem statements to pick from. You get broad
              domains and the freedom to find a problem and build an original
              solution. Halfway through the build, the committee reveals X, and
              your project has to absorb it.
            </p>
            <ul className="pillars">
              {pillars.map(({ Icon, t, d }) => (
                <li key={t}>
                  <span className="hex">
                    <Icon size={26} aria-hidden="true" />
                  </span>
                  <div>
                    <h3>{t}</h3>
                    <p>{d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="sec sec-deep" id="domains" data-rail="Domains">
        <div className="wrap">
          <h2 className="h2">Explore the domains</h2>
          <p className="lead">Pick the field you want to build in.</p>
          <DomainGrid />
          <DomainsNote />
        </div>
      </section>

      <section className="sec sec-x" id="x" data-rail="The X">
        <div className="wrap">
          <div className="x-head">
            <h2 className="h2">What is X?</h2>
            <p className="lead">
              You start with your idea. You build your prototype. But halfway
              through the journey, something changes.
            </p>
            <p className="reveal-line">
              REVEALED HALFWAY THROUGH THE HACKATHON.
            </p>
          </div>
          <XFile />
        </div>
      </section>

      <section className="sec" id="journey" data-rail="Journey">
        <div className="wrap">
          <h2 className="h2">How it works</h2>
          <Route />
        </div>
      </section>

      <section className="sec sec-clock" id="countdown" data-rail="Countdown">
        <div className="wrap clock-wrap">
          <Countdown />
        </div>
      </section>

      <section className="sec sec-prizes" id="prizes" data-rail="Prizes">
        <PrizeBackdrop />
        <Gift className="gift gift-l" />
        <Gift className="gift gift-r" />
        <div className="wrap">
          <h2 className="h2">Prize pool</h2>
          <p className="lead">Build for your domain. Win in your domain.</p>
          <Prizes />
        </div>
      </section>

      <section className="sec sec-frost" id="info" data-rail="Info">
        <div className="wrap">
          <h2 className="h2">Event information</h2>
          <dl className="tickets">
            {info.map(({ Icon, k, v }) => (
              <div className="ticket" key={k}>
                <Icon size={32} aria-hidden="true" />
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="sec sec-venue" id="venue" data-rail="Venue">
        <div className="wrap venue-grid">
          <div>
            <h2 className="h2">Venue</h2>
            <address className="addr">
              <MapPin size={28} aria-hidden="true" />
              <span>
                {event.venue.name},<br />
                {event.venue.block},<br />
                {event.venue.institution}.
              </span>
            </address>
            {event.venue.mapUrl ? (
              <a
                href={event.venue.mapUrl}
                className="btn btn-line"
                style={{ marginTop: 26 }}
              >
                <span>Open in maps</span>
              </a>
            ) : (
              <p className="fine" style={{ marginTop: 22 }}>
                Map and directions will be added once the location is verified.
              </p>
            )}
          </div>
          <div>
            <h2 className="h2">Organisers</h2>

            <ul className="orgs">
              {event.organisers.map((o) => {
                const isPES = o.name.toLowerCase().includes("power");

                return (
                  <li key={o.id}>
                    <Image
                      className="org-logo"
                      src={
                        isPES ? "/logos/ieee-pes.png" : "/logos/ieee-cas.png"
                      }
                      alt={o.name}
                      width={110}
                      height={75}
                    />
                    <span>{o.name}</span>
                  </li>
                );
              })}
            </ul>

            <p className="fine" style={{ marginTop: 18 }}>
              Hosted at {event.institution}.
            </p>
          </div>
        </div>
      </section>

      <section className="sec" id="updates" data-rail="Updates">
        <div className="wrap updates">
          <div>
            <div className="updates-head">
              <h2>Latest announcements</h2>
              <Link href="/announcements" className="link">
                All announcements
              </Link>
            </div>
            <div className="notes">
              {announcements.slice(0, 3).map((a) => (
                <AnnouncementCard key={a.id} a={a} />
              ))}
            </div>
          </div>
          <div>
            <div className="updates-head">
              <h2>Common questions</h2>
              <Link href="/faq" className="link">
                All FAQs
              </Link>
            </div>
            <FaqList items={faqs.filter((f) => f.featured)} />
          </div>
        </div>
      </section>

      <section
        className="sec sec-term"
        id="transmission"
        data-rail="Transmission"
      >
        <div className="wrap">
          <h2 className="h2">Incoming transmission</h2>
          <p className="lead" style={{ marginBottom: 40 }}>
            A fictional channel. Try typing{" "}
            <b style={{ color: "var(--emerald)" }}>help</b>.
          </p>
          <div className="term-grid">
            <Mask className="term-mask" />
            <Terminal />
          </div>
        </div>
      </section>

      <section className="cta" id="join" data-rail="Join">
        <Burst className="cta-burst" />
        <div className="wrap">
          <h2>The unknown is waiting.</h2>
          <p>
            You&apos;ve got the idea. You&apos;ve got the freedom. But are you
            ready for X?
          </p>
          <RegisterButton />
        </div>
      </section>
    </>
  );
}
