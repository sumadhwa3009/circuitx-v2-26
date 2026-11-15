import type { Metadata } from "next";
import { PageBanner } from "@/components/PageBanner";
import { schedule } from "@/data/schedule";
import { BuildTimer } from "@/components/Countdown";
export const metadata: Metadata = { title: "Schedule", description: "The CircuitX'26 schedule." };
export default function Schedule() {
  return (<>
    <PageBanner art="sleigh" title="Schedule" intro="Confirmed items are marked. Everything else will be added once it is finalised." />
    <section className="sec"><div className="wrap sched-wrap">
      <ol className="sched">
        {schedule.map((s) => (
          <li key={s.title} className={s.confirmed ? "" : "tba"}><b>{s.day}</b><div><h3>{s.title}</h3><p>{s.note}</p></div></li>
        ))}
      </ol>
      <BuildTimer />
    </div></section>
  </>);
}
