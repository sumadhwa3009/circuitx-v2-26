import type { Metadata } from "next";
import { PageBanner } from "@/components/PageBanner";
import { CircuitTree } from "@/components/Art";
import { event } from "@/config/event";
export const metadata: Metadata = { title: "About", description: "The philosophy behind CircuitX'26 and the Santa Doom theme." };
export default function About() {
  return (<>
    <PageBanner art="village" title="Not another hackathon." intro="CircuitX'26 gives you freedom first, then tests how well you adapt." />
    <section className="sec"><div className="wrap about">
      <div className="about-art"><CircuitTree /></div>
      <div className="prose">
        <div><h2>The philosophy</h2><p>Most hackathons hand teams a problem. Here you get three broad domains and decide for yourselves what is worth solving, how to solve it and what to build.</p></div>
        <div><h2>Why no problem statements</h2><p>Finding the right problem is half of engineering. We want teams to practise that, not skip it.</p></div>
        <div><h2>The X factor</h2><p>About halfway through the 16-hour build, the committee reveals X. Every team must integrate it into the project it has already started. What X is stays secret until then.</p></div>
        <div><h2>The Santa Doom theme</h2><p>A snowbound village at night, a sleigh on the square, and a masked Santa wrapped in emerald energy. Dark, cinematic and a little unsettling, like the hackathon itself.</p></div>
        <div><h2>Organised by</h2><p>{event.organisers.map((o) => o.name).join(" and ")}, at {event.institution}.</p></div>
      </div>
    </div></section>
  </>);
}
