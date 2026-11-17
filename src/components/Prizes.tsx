import { prizes } from "@/config/event";
import { Trophy, Medal } from "lucide-react";

const fmt = (n: number) => `${prizes.currency}${n.toLocaleString("en-IN")}`;

export function Prizes() {
  return (
    <div className="prizes">
      <div className="pool">
        <p className="pool-label">Total prize pool</p>
        <p className="pool-amount">{fmt(prizes.total)}</p>
        <p className="pool-note">Split across the IEEE PES and IEEE CASS domains.</p>
      </div>
      <div className="prize-grid">
        {prizes.domains.map((d) => (
          <article key={d.id} className={`prize-col prize-${d.id}`}>
            <p className="prize-soc">{d.name}</p>
            <h3>{d.full}</h3>
            <ul>
              {prizes.tiers.map((t) => (
                <li key={t.id} className={`tier tier-${t.id}`}>
                  {t.id === "winner" ? <Trophy size={30} aria-hidden="true" /> : <Medal size={30} aria-hidden="true" />}
                  <div><b>{t.label}</b><span>{t.note}</span></div>
                  <strong>{fmt(t.amount)}</strong>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}