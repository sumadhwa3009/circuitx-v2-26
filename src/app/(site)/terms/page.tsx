import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { event, prizes } from "@/config/event";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions for participating in CircuitX'26.",
};

const rs = (n: number) => `${prizes.currency}${n.toLocaleString("en-IN")}`;

export default function Terms() {
  const email = event.contact.email;
  const [winner, runner] = prizes.tiers;
  return (
    <LegalPage
      title="Terms & Conditions"
      intro="The rules for taking part in CircuitX'26. By registering, you agree to them."
      updated="21 November 2026"
    >
      <h2>1. About the event</h2>
      <p>
        CircuitX&apos;26 is a 16-hour overnight hackathon organised by {event.organisers.map((o) => o.name).join(" and ")} at {event.institution}. The final round is held offline on {event.dates.label} at {event.venue.name}, {event.venue.block}.
      </p>

      <h2>2. Eligibility and teams</h2>
      <ul>
        <li>Students from all colleges and universities, across all branches and academic years, may take part.</li>
        <li>A team has between {event.team.min} and {event.team.max} members. Teams may include members from different colleges and branches.</li>
        <li>Each team chooses one of the two themes. There are no problem statements: teams choose their own problem within their theme.</li>
      </ul>

      <h2>3. Registration and rounds</h2>
      <ul>
        <li>Registration is on Unstop. Ideas must be submitted on the official PPT template before the Round 1 deadline.</li>
        <li>Round 1 registration is free.</li>
        <li>The organising committee evaluates submissions and shortlists the top 20 teams, 10 from each theme.</li>
        <li>Shortlisted teams pay a Round 2 fee of ₹1,000 per team, or ₹750 if at least one member holds an IEEE CAS or PES membership, by the Round 2 deadline. Teams that do not pay in time may lose their place.</li>
        <li>Dates and times on the website are not final and may change. Updates are posted on the website.</li>
      </ul>

      <h2>4. Originality and ownership</h2>
      <ul>
        <li>The idea and the prototype must be the team&apos;s own work. Using open-source libraries and public documentation is fine if it is credited where required.</li>
        <li>Copying another team&apos;s work, or submitting work that was largely built before the event, is not allowed.</li>
        <li>Teams keep ownership of their ideas and prototypes. By taking part, you allow the organisers to describe and show your project for event reporting and promotion, with credit to your team.</li>
      </ul>

      <h2>5. Conduct and safety</h2>
      <p>
        All participants must follow the{" "}
        <a href={event.quicklinks.cocurl} target="_blank" rel="noopener noreferrer">Code of Conduct</a>
        {" "}and the instructions of the organisers and the institution&apos;s staff. Participants must use the venue and its equipment responsibly and follow all safety rules, including those for electrical and hardware work. Details of equipment and safety rules will be announced.
      </p>

      <h2>6. Judging and prizes</h2>
      <ul>
        <li>The total prize pool is {rs(prizes.total)}, split equally between the two themes.</li>
        <li>In each theme, the {winner.label.toLowerCase()} receive {rs(winner.amount)} and the {runner.label.toLowerCase()} receive {rs(runner.amount)}.</li>
        <li>Judging criteria will be announced. The decisions of the judges and the organising committee are final.</li>
        <li>Prize money is shared by the team as it decides. Winners may be asked for identity and bank details to receive their prize.</li>
      </ul>

      <h2>7. Disqualification</h2>
      <p>
        The organisers may disqualify a team or remove a participant for breaking these terms or the Code of Conduct, plagiarism, giving false information, or behaviour that puts people or property at risk. Fees are not refunded after disqualification.
      </p>

      <h2>8. Photos and recordings</h2>
      <p>
        Photos and videos may be taken during the event. By attending, you agree that they may be used by the organisers and {event.institutionShort} for reporting and promotion. If you would like not to appear, tell an organiser at the event.
      </p>

      <h2>9. Privacy</h2>
      <p>We handle your personal data as described in our <a href="/privacy">Privacy Policy</a>.</p>

      <h2>10. Liability</h2>
      <p>
        Participants are responsible for their own belongings, devices and health. To the extent the law allows, the organisers and {event.institutionShort} are not liable for loss, damage or injury arising from taking part, except where the law says otherwise.
      </p>

      <h2>11. Changes to the event or these terms</h2>
      <p>
        The organisers may change the schedule, format, rules or these terms, or cancel the event, if needed. We will post changes on the website and the date at the top will be updated.
      </p>

      <h2>12. Governing law</h2>
      <p>These terms are governed by the laws of India. Disputes are subject to the courts at Bengaluru, Karnataka.</p>

      <h2>13. Contact</h2>
      <p>Questions about these terms: <a href={`mailto:${email}`}>{email}</a>.</p>
    </LegalPage>
  );
}
