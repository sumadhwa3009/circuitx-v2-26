import type { Metadata } from "next";
import { PageBanner } from "@/components/PageBanner";
import { DomainGrid } from "@/components/Domains";
export const metadata: Metadata = {
  title: "Domains",
  description: "IEEE PES and IEEE CAS: the two domains of CircuitX'26.",
};
export default function Domains() {
  return (
    <>
      <PageBanner
        art="sleigh"
        title="Two domains. Your problem."
        intro="The areas below are ideas to explore, not assigned problems. You have complete freedom to choose what to solve."
      />
      <section className="sec sec-deep">
        <div className="wrap">
          <DomainGrid detailed />
        </div>
      </section>
    </>
  );
}
