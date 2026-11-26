import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { PageBanner } from "@/components/PageBanner";
import { SocialIcons } from "@/components/ContactIcons";
import { createClient } from "@/lib/supabase/server";
import "./team.css";

export const metadata: Metadata = {
  title: "Team",
  description: "Meet the organising team behind CircuitX'26.",
};

type Person = {
  id: string; full_name: string; society: string | null; team_name: string; team_slug: string; team_sort: number;
  designation: string; photo_path: string; linkedin_url: string | null; instagram_url: string | null; github_url: string | null;
};

// Chairperson first, then heads, co-heads, coordinators, everyone else.
const rank = (d: string) => {
  const s = d.toLowerCase();
  if (s.includes("chair")) return 0;
  if (/^co[- ]/.test(s)) return 2;
  if (s.includes("head")) return 1;
  if (s.includes("coordinator")) return 3;
  return 4;
};

const initials = (n: string) => n.split(" ").filter(Boolean).slice(0, 2).map((w) => w[0]?.toUpperCase()).join("");

export default async function Team() {
  const supabase = await createClient();
  const { data } = await supabase.rpc("get_public_team"); // public-safe columns only
  const people = ((data ?? []) as Person[]).sort(
    (a, b) => a.team_sort - b.team_sort || rank(a.designation) - rank(b.designation) || a.full_name.localeCompare(b.full_name),
  );

  const urls: Record<string, string> = {};
  if (people.length) {
    const { data: signed } = await supabase.storage.from("team-photos").createSignedUrls(people.map((p) => p.photo_path), 3600);
    signed?.forEach((s) => { if (s.path && s.signedUrl) urls[s.path] = s.signedUrl; });
  }

  const groups = new Map<string, { name: string; members: Person[] }>();
  people.forEach((p) => {
    if (!groups.has(p.team_slug)) groups.set(p.team_slug, { name: p.team_name, members: [] });
    groups.get(p.team_slug)!.members.push(p);
  });
  const list = [...groups.entries()];

  return (
    <>
      <PageBanner art="village" title="The people behind CircuitX" intro="Meet the organising team from IEEE PES and IEEE CASS who make it happen." />
      <section className="sec sec-deep">
        <div className="wrap">
          {list.length === 0 ? (
            <p className="tp-empty">The organising team will be introduced here soon.</p>
          ) : (
            <>
              {list.length > 1 && (
                <nav className="tp-jump" aria-label="Jump to a team">
                  {list.map(([slug, g]) => <a key={slug} href={`#${slug}`}>{g.name}</a>)}
                </nav>
              )}
              {list.map(([slug, g]) => (
                <div className="tp-group" key={slug} id={slug}>
                  <div className="tp-head"><h2>{g.name}</h2><span>{g.members.length} {g.members.length === 1 ? "member" : "members"}</span></div>
                  <div className="tp-grid">
                    {g.members.map((p, i) => {
                      const url = urls[p.photo_path];
                      return (
                        <article className={`tcard${rank(p.designation) <= 1 ? " lead" : ""}`} key={p.id} style={{ "--i": i } as CSSProperties}>
                          <div className="tcard-photo">
                            {url ? /* eslint-disable-next-line @next/next/no-img-element */ <img src={url} alt={p.full_name} loading="lazy" /> : <span aria-hidden="true">{initials(p.full_name)}</span>}
                          </div>
                          <h3>{p.full_name}</h3>
                          {p.designation && p.designation !== "Member" && <p className="tcard-role">{p.designation}</p>}
                          {p.society && <span className={`tcard-soc ${p.society === "IEEE PES" ? "pes" : "cas"}`}>{p.society}</span>}
                          <SocialIcons items={[
                            { id: "linkedin", label: "LinkedIn", url: p.linkedin_url ?? "" },
                            { id: "instagram", label: "Instagram", url: p.instagram_url ?? "" },
                            { id: "github", label: "GitHub", url: p.github_url ?? "" },
                          ]} />
                        </article>
                      );
                    })}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </section>
    </>
  );
}
