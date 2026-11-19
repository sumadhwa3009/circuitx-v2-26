import { prizes } from "@/config/event";
import { themes } from "@/data/themes";
import { Trophy, Medal } from "lucide-react";

const fmt = (n: number) => `${prizes.currency}${n.toLocaleString("en-IN")}`;

export function Prizes() {
  return (
    <div className="prizes">
      <div className="pool">
        <p className="pool-label">Total prize pool</p>
        <p className="pool-amount">{fmt(prizes.total)}</p>
        <p className="pool-note">Split equally between the two themes.</p>
      </div>
      <div className="prize-grid">
        {themes.map((t) => (
          <article key={t.id} className={`prize-col prize-${t.id}`}>
            <p className="prize-soc">{t.label} · {t.code}</p>
            <h3>{t.title}</h3>
            <ul>
              {prizes.tiers.map((tier) => (
                <li key={tier.id} className={`tier tier-${tier.id}`}>
                  {tier.id === "winner" ? <Trophy size={30} aria-hidden="true" /> : <Medal size={30} aria-hidden="true" />}
                  <div><b>{tier.label}</b><span>{tier.note}</span></div>
                  <strong>{fmt(tier.amount)}</strong>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}