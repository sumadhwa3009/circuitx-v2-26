import Link from "next/link";
import { Hero, Tape } from "@/components/Hero";
import { Rail } from "@/components/Rail";
import { Burst, Mask } from "@/components/Art";
import { Route } from "@/components/Route";
import { FaqList } from "@/components/FaqList";
import { AnnouncementCard } from "@/components/AnnouncementCard";
import { Terminal } from "@/components/Terminal";
import { RegisterButton } from "@/components/RegisterButton";
import { faqs } from "@/data/faqs";
import { announcements } from "@/data/announcements";
import { Prizes } from "@/components/Prizes";
import { PartnerLogos } from "@/components/PartnerLogos";
import { PrizeBackdrop, Gift } from "@/components/PrizeArt";
import { event } from "@/config/event";
import {
  Clock,
  Users,
  Layers,
  GraduationCap,
  Compass,
  ArrowRight,
} from "lucide-react";

const info = [
  { Icon: Clock, k: "16 hours", v: "An overnight build" },
  {
    Icon: Users,
    k: `${event.team.min} to ${event.team.max}`,
    v: "Members per team",
  },
  { Icon: Layers, k: "2 domains", v: "PES and CASS " },
  {
    Icon: GraduationCap,
    k: "Open to All",
    v: "All colleges, branches and academic years",
  },
];

const goCards = [
  {
    href: "/about",
    Icon: Compass,
    tag: "About",
    t: "Not another hackathon.",
    d: "No problem statements. Find the problem worth solving and build your own solution.",
    cta: "Read our story",
    cls: "go-about",
  },
  {
    href: "/domains",
    Icon: Layers,
    tag: "Domains",
    t: "Two domains. Your problem.",
    d: "IEEE PES or IEEE CASS. Explore the areas and pick the field you want to build in.",
    cta: "Explore the domains",
    cls: "go-domains",
  },
];

export default function Home() {
  return (
    <>
      <Rail />
      <Hero />
      <Tape />
      <PartnerLogos />

      <section className="sec go-sec" id="explore" data-rail="Explore">
        <div className="wrap go-grid">
          {goCards.map(({ href, Icon, tag, t, d, cta, cls }) => (
            <Link key={href} href={href} className={`go-card ${cls}`}>
              <span className="go-icon"><Icon size={30} aria-hidden="true" /></span>
              <p className="go-tag">{tag}</p>
              <h3>{t}</h3>
              <p>{d}</p>
              <span className="go-cta">{cta} <ArrowRight size={18} aria-hidden="true" /></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="sec sec-deep" id="journey" data-rail="Journey">
        <div className="wrap">
          <h2 className="h2">How it works</h2>
          <Route />
          <Link href="/schedule" className="btn btn-line" style={{ marginTop: 24, display: "inline-flex", alignItems: "center", gap: 8 }}>
            <span>Click here to view the detailed schedule</span>
          </Link>
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

      <section className="sec" id="updates" data-rail="Updates">
        <div className="wrap updates">
          <div>
            <div className="updates-head">
              <h2>Latest announcements</h2>
            </div>
            <div className="notes">
              {announcements.map((a) => (
                <AnnouncementCard key={a.id} a={a} />
              ))}
            </div>
          </div>
          <div>
            <div className="updates-head">
              <h2>Common questions</h2>
              <Link href="/faq" className="link">
                FAQs & contact
              </Link>
            </div>
            <FaqList items={faqs.filter((f) => f.featured)} />
          </div>
        </div>
      </section>

      <section className="sec sec-term" id="transmission" data-rail="Transmission">
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
          <h2>Your idea is waiting.</h2>
          <p>
            You&apos;ve got the idea. You&apos;ve got the freedom. Are you ready to
            build it?
          </p>
          <RegisterButton />
        </div>
      </section>
    </>
  );
}
