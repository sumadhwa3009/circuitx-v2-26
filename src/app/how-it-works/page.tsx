import type { Metadata } from "next";
import { PageBanner } from "@/components/PageBanner";
import { Route } from "@/components/Route";
export const metadata: Metadata = { title: "How it works", description: "From registration to final prototype at CircuitX'26." };
export default function How() {
  return (<>
    <PageBanner art="santa" title="How it works" intro="Six stages, from sign-up to demo." />
    <section className="sec"><div className="wrap">
      <Route />
      <p className="fine">Registration is on Unstop, and you submit your idea on the official PPT template. The number of shortlisted teams and the split across domains will be decided once registrations close.</p>
    </div></section>
  </>);
}
