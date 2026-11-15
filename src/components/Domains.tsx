import Link from "next/link";
import { domains } from "@/data/domains";
import { DomainArt } from "./Art";

export function DomainGrid({ detailed = false }: { detailed?: boolean }) {
  return (
    <div className="chips">
      {domains.map((d) => (
        <article key={d.id} className={`chip chip-${d.id}`}>
          <DomainArt id={d.id} />
          <p className="chip-soc">{d.society}</p>
          <h3>{d.title}</h3>
          <p>{d.summary}</p>
          <ul>{(detailed ? d.areas : d.areas.slice(0, 4)).map((a) => <li key={a}>{a}</li>)}</ul>
        </article>
      ))}
    </div>
  );
}
export const DomainsNote = () => <p className="fine">These are starting points, not assigned problems. You choose the problem. <Link href="/domains" className="link">See the domains in detail</Link></p>;
