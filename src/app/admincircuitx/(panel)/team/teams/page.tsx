import { ArrowDown, ArrowUp, Eye, EyeOff, Plus } from "lucide-react";
import { requireAdmin } from "@/lib/auth/permissions";
import { createClient } from "@/lib/supabase/server";
import { addTeam, moveTeam, renameTeam, toggleTeam } from "./actions";
import "./teams.css";

const ERRORS: Record<string, string> = {
  name: "Enter a team name between 2 and 60 characters.",
  duplicate: "A team with that name already exists.",
  failed: "Something went wrong. Please try again.",
};

export default async function TeamsList({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  await requireAdmin("team.manage");
  const { error } = await searchParams;
  const supabase = await createClient();
  const [{ data: teams }, { data: members }] = await Promise.all([
    supabase.from("teams").select("id, name, slug, sort_order, is_active").order("sort_order").order("name"),
    supabase.from("team_members").select("team_id"),
  ]);
  const counts: Record<string, number> = {};
  (members ?? []).forEach((m) => { counts[m.team_id] = (counts[m.team_id] ?? 0) + 1; });
  const list = teams ?? [];

  return (
    <>
      <p className="amuted" style={{ marginBottom: 20 }}>These are the options in the Team dropdown of the organisers form.</p>
      {error && ERRORS[error] && <p className="aalert" role="alert">{ERRORS[error]}</p>}

      <section className="acard addcard">
        <h2>Add a team</h2>
        <form action={addTeam} className="addform">
          <label className="sr" htmlFor="new-team">Team name</label>
          <input id="new-team" className="ainput" name="name" placeholder="For example: Media" required minLength={2} maxLength={60} />
          <button className="ab ab-pri" type="submit"><Plus size={17} aria-hidden="true" />Add team</button>
        </form>
        <p className="amuted">New teams appear at the bottom of the dropdown. Use the arrows to move them.</p>
      </section>

      <div className="adm-ph sub"><h2>Dropdown order <span className="amuted">({list.length})</span></h2></div>
      <ol className="tlist">
        {list.map((t, i) => (
          <li key={t.id} className={`trow ${t.is_active ? "" : "off"}`}>
            <span className="tnum">{i + 1}</span>
            <form action={renameTeam} className="tname">
              <input type="hidden" name="id" value={t.id} />
              <label className="sr" htmlFor={`n-${t.id}`}>Name of team {t.name}</label>
              <input id={`n-${t.id}`} className="ainput" name="name" defaultValue={t.name} required minLength={2} maxLength={60} />
              <button type="submit" className="ab ab-ghost ab-sm">Save</button>
            </form>
            <div className="tmeta">
              <span className="amuted">{counts[t.id] ?? 0} {(counts[t.id] ?? 0) === 1 ? "member" : "members"}</span>
              <span className={`apill ${t.is_active ? "approved" : "pending"}`}>{t.is_active ? "Shown" : "Hidden"}</span>
            </div>
            <div className="tacts">
              <form action={moveTeam}><input type="hidden" name="id" value={t.id} /><input type="hidden" name="dir" value="up" /><button type="submit" className="ab ab-ghost ab-icon" disabled={i === 0} aria-label={`Move ${t.name} up`}><ArrowUp size={17} aria-hidden="true" /></button></form>
              <form action={moveTeam}><input type="hidden" name="id" value={t.id} /><input type="hidden" name="dir" value="down" /><button type="submit" className="ab ab-ghost ab-icon" disabled={i === list.length - 1} aria-label={`Move ${t.name} down`}><ArrowDown size={17} aria-hidden="true" /></button></form>
              <form action={toggleTeam}><input type="hidden" name="id" value={t.id} /><input type="hidden" name="active" value={String(!t.is_active)} />
                <button type="submit" className="ab ab-ghost ab-sm">{t.is_active ? <><EyeOff size={16} aria-hidden="true" />Hide</> : <><Eye size={16} aria-hidden="true" />Show</>}</button>
              </form>
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}
