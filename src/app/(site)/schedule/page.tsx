import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import { PageBanner } from "@/components/PageBanner";
import { schedule, type ScheduleItem } from "@/data/schedule";
import { event } from "@/config/event";

export const metadata: Metadata = { title: "Schedule", description: "The CircuitX'26 schedule and final round venue." };

function Items({ items }: { items: ScheduleItem[] }) {
  return (
    <ol className="sched">
      {items.map((s) => (
        <li key={s.title}>
          <b><time dateTime={s.iso}>{s.day}</time><small>{s.time}</small></b>
          <div><h3>{s.title}</h3><p>{s.note}</p></div>
        </li>
      ))}
    </ol>
  );
}

export default function Schedule() {
  const round1 = schedule.filter((s) => s.round === 1);
  const final = schedule.filter((s) => s.round === 2);
  return (<>
    <PageBanner art="sleigh" title="Schedule" intro="Key dates for CircuitX'26, from the theme launch to the prize ceremony." />
    <section className="sec"><div className="wrap">
      <p className="sched-note">Dates and times are not final and may change. Please check back for updates.</p>

      <h2 className="sched-h">Round 1: Idea submission</h2>
      <Items items={round1} />

      <div className="sched-final">
        <div className="sched-final-head">
          <h2 className="sched-h">Round 2: The final round</h2>
          <span className="sched-badge">Offline · 16 hours</span>
        </div>
        <p className="sched-sub">Held offline at {event.institution}.</p>
        <Items items={final} />
      </div>
    </div></section>

    <section className="sec sec-venue" id="venue">
      <div className="wrap">
        <h2 className="h2">Final round venue</h2>
        <address className="addr">
          <MapPin size={28} aria-hidden="true" />
          <span>
            {event.venue.name},<br />
            {event.venue.block},<br />
            {event.venue.institution}.
          </span>
        </address>
        {event.venue.mapUrl && (
          <a href={event.venue.mapUrl} target="_blank" rel="noopener noreferrer" className="btn btn-line" style={{ marginTop: 26 }}>
            <span>Open in maps</span>
          </a>
        )}
      </div>
    </section>
  </>);
}