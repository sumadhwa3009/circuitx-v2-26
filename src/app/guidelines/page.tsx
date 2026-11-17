import type { Metadata } from "next";
import { PageBanner } from "@/components/PageBanner";
import { event } from "@/config/event";
export const metadata: Metadata = {
  title: "Guidelines",
  description: "Participation guidelines for CircuitX'26.",
};
export default function Guidelines() {
  const rules = [
    "Students from all colleges and universities are eligible to participate.",
    "All academic branches and all academic years are eligible.",
    `Teams must have between ${event.team.min} and ${event.team.max} members.`,
    "Choose one of two domains: IEEE PES or IEEE CAS.",
    "Submit your idea using the official PPT template.",
    "Every team must integrate X into its project once it is revealed.",
  ];
  const tba = [
    "Judging criteria",
    "Hardware and equipment availability",
    "Prizes",
    "Code of conduct and safety rules",
  ];
  return (
    <>
      <PageBanner
        art="mask"
        title="Guidelines"
        intro="What we've confirmed so far."
      />
      <section className="sec">
        <div className="wrap" style={{ display: "grid", gap: 56 }}>
          <ul className="facts">
            {rules.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
          <div className="prose">
            <div>
              <h2>To be announced</h2>
              <ul className="tba-list">
                {tba.map((t) => (
                  <li key={t}>{t}: TBA</li>
                ))}
              </ul>
            </div>
          </div>
          {event.registration.pptTemplateUrl && (
            <a
              className="btn btn-go"
              style={{ width: "fit-content" }}
              href={event.registration.pptTemplateUrl}
              download
            >
              <span>Download the PPT template</span>
            </a>
          )}
        </div>
      </section>
    </>
  );
}
