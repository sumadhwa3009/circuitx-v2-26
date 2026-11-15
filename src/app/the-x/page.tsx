import type { Metadata } from "next";
import { PageBanner } from "@/components/PageBanner";
import { XFile } from "@/components/XFile";
import { Terminal } from "@/components/Terminal";
export const metadata: Metadata = { title: "The X", description: "The X factor of CircuitX'26: what to expect, without spoilers." };
export default function TheX() {
  return (<>
    <PageBanner art="burst" title="Expect the unexpected." intro="X is the one thing we won't tell you about." />
    <section className="sec sec-x"><div className="wrap">
      <XFile />
      <div className="prose" style={{ marginTop: 70 }}>
        <div><h2>What to expect</h2><p>A new requirement, announced to every team at once. How you respond is part of the challenge.</p></div>
        <div><h2>When it&apos;s revealed</h2><p>About halfway through the 16-hour build phase.</p></div>
        <div><h2>Why integration is mandatory</h2><p>Real projects change mid-build. Every participating team must integrate X into its existing project, and the final prototype is demonstrated with X included.</p></div>
        <div><h2>Try asking</h2><div style={{ marginTop: 16 }}><Terminal /></div></div>
      </div>
    </div></section>
  </>);
}
