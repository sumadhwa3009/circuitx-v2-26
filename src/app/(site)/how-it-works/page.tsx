import type { Metadata } from "next";
import { PageBanner } from "@/components/PageBanner";
import { Route } from "@/components/Route";
import { event } from "@/config/event";

export const metadata: Metadata = {
  title: "Journey & guidelines",
  description: "From registration to final prototype, plus participation guidelines for CircuitX'26.",
};

export default function How() {
  const rules = [
    "Students from all colleges and universities are eligible to participate.",
    "All academic branches and all academic years are eligible.",
    `Teams must have between ${event.team.min} and ${event.team.max} members.`,
    "Choose one of two domains: IEEE PES or IEEE CAS.",
    "Submit your idea using the official PPT template.",
  ];
  const tba = [
    "Judging criteria",
    "Hardware and equipment availability",
    "Prizes",
    "Code of conduct and safety rules",
  ];

  return (<>
    <PageBanner art="santa" title="Journey & guidelines" intro="From sign-up to demo, with the key participation details in one place." />
    <section className="sec"><div className="wrap">
      <Route />
      <p className="fine">Registration is on Unstop, and you submit your idea on the official PPT template. The number of shortlisted teams and the split across domains will be decided once registrations close.</p>
    </div></section>
    <section className="sec sec-deep">
      <div className="wrap" style={{ display: "grid", gap: 56 }}>
        <div>
          <h2 className="h2">Guidelines</h2>
          <ul className="facts" style={{ marginTop: 34 }}>
            {rules.map((rule) => <li key={rule}>{rule}</li>)}
          </ul>
        </div>
        <div className="prose">
          <div>
            <h2>To be announced</h2>
            <ul className="tba-list">
              {tba.map((item) => <li key={item}>{item}: TBA</li>)}
            </ul>
          </div>
        </div>
        {event.registration.pptTemplateUrl && (
          <a className="btn btn-go" style={{ width: "fit-content" }} href={event.registration.pptTemplateUrl} download>
            <span>Download the PPT template</span>
          </a>
        )}
      </div>
    </section>
  </>);
}
