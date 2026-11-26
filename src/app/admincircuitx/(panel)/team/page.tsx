import Link from "next/link";
import { Download, ExternalLink, Linkedin, Mail, Phone } from "lucide-react";
import { requireAdmin } from "@/lib/auth/permissions";
import { createClient } from "@/lib/supabase/server";
import { setDesignation, setFormOpen, setStatus, setVisible } from "./actions";
import { ActionForm, SubmitButton } from "@/components/ui/ActionForm";
import "./team.css";

type Row = {
  id: string; full_name: string; usn: string; email: string; phone: string; photo_path: string;
  designation: string; society: string | null; branch: string | null; year: number | null; tshirt_size: string | null;
  linkedin_url: string | null; status: "pending" | "approved" | "rejected"; show_on_website: boolean; submitted_at: string;
  teams: { name: string } | null;
};

const FILTERS = ["all", "pending", "approved", "rejected"] as const;
const initials = (n: string) => n.split(" ").filter(Boolean).slice(0, 2).map((w) => w[0]?.toUpperCase()).join("");

export default async function TeamManagement({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  await requireAdmin("team.manage");
  const { status } = await searchParams;
  const filter = (FILTERS as readonly string[]).includes(status ?? "") ? (status as string) : "all";
  const supabase = await createClient();

  let q = supabase.from("team_members").select("*, teams(name)").order("submitted_at", { ascending: false });
  if (filter !== "all") q = q.eq("status", filter);
  const [{ data: settings }, { data: rows }, { data: statuses }, { count: teamCount }] = await Promise.all([
    supabase.from("form_settings").select("is_open").eq("key", "team_registration").single(),
    q,
    supabase.from("team_members").select("status, show_on_website"),
    supabase.from("teams").select("id", { count: "exact", head: true }).eq("is_active", true),
  ]);
  const members = (rows ?? []) as unknown as Row[];
  const open = !!settings?.is_open;
  const counts: Record<string, number> = { all: statuses?.length ?? 0, pending: 0, approved: 0, rejected: 0 };
  (statuses ?? []).forEach((s) => { counts[s.status] = (counts[s.status] ?? 0) + 1; });
  const visible = (statuses ?? []).filter((s) => s.show_on_website).length;

  const urls: Record<string, string> = {};
  if (members.length) {
    const { data: signed } = await supabase.storage.from("team-photos").createSignedUrls(members.map((m) => m.photo_path), 3600);
    signed?.forEach((s) => { if (s.path && s.signedUrl) urls[s.path] = s.signedUrl; });
  }
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://circuitx26.vercel.app";

  return (
    <>
      <div className="astats mb">
        <Link href="/admincircuitx/team" className="astat"><span>Submissions</span><b>{counts.all}</b></Link>
        <Link href="/admincircuitx/team?status=pending" className={`astat ${counts.pending ? "warn" : ""}`}><span>Pending review</span><b>{counts.pending}</b></Link>
        <Link href="/admincircuitx/team?status=approved" className="astat"><span>Approved</span><b>{counts.approved}</b></Link>
        <div className="astat"><span>Visible on website</span><b>{visible}</b></div>
        <Link href="/admincircuitx/team/teams" className="astat"><span>Active teams</span><b>{teamCount ?? 0}</b></Link>
        <div className={`astat ${open ? "good" : ""}`}><span>Organisers form</span><b>{open ? "Open" : "Closed"}</b></div>
      </div>

      <section className="acard formcard">
        <div className="formcard-main">
          <span className={`apill ${open ? "approved" : "rejected"}`}>{open ? "Accepting responses" : "Closed"}</span>
          <h2>Organisers form</h2>
          <p className="amuted">Share this link with your team. Anyone with a Google account can submit while it is open.</p>
          <div className="linkbox"><code>{site}/join-team</code><Link href="/join-team" target="_blank" className="ab ab-ghost ab-sm"><ExternalLink size={15} aria-hidden="true" />Open</Link></div>
        </div>
        <ActionForm action={setFormOpen}>
          <input type="hidden" name="open" value={String(!open)} />
          <SubmitButton className={`ab ${open ? "ab-ghost" : "ab-pri"}`} type="submit">{open ? "Stop accepting responses" : "Start accepting responses"}</SubmitButton>
        </ActionForm>
      </section>

      <div className="adm-ph sub">
        <h2>Submissions <span className="amuted">({counts.all})</span></h2>
        <a href="/admincircuitx/team/export" download className="ab ab-ghost ab-sm"><Download size={15} aria-hidden="true" />Export CSV</a>
      </div>
      <div className="achips" role="tablist" aria-label="Filter submissions">
        {FILTERS.map((f) => (
          <Link key={f} href={f === "all" ? "/admincircuitx/team" : `/admincircuitx/team?status=${f}`} className={filter === f ? "on" : ""}>
            {f}<em>{counts[f] ?? 0}</em>
          </Link>
        ))}
      </div>

      <datalist id="roles">{["Chairperson", "Event Head", "Co-head", "Coordinator", "Member"].map((r) => <option key={r} value={r} />)}</datalist>

      {members.length === 0 ? (
        <div className="acard empty"><p>No submissions here yet.</p></div>
      ) : (
        <div className="mgrid">
          {members.map((m) => (
            <article className="mcard" key={m.id}>
              <header>
                <span className="mavatar">{urls[m.photo_path] ? /* eslint-disable-next-line @next/next/no-img-element */ <img src={urls[m.photo_path]} alt={m.full_name} /> : initials(m.full_name)}</span>
                <div className="mname"><b>{m.full_name}</b><small>{m.usn}</small></div>
                <span className={`apill ${m.status}`}>{m.status}</span>
              </header>

              <div className="mchips">
                {m.teams?.name && <span className="chip-t">{m.teams.name}</span>}
                {m.society && <span className={`chip-s ${m.society === "IEEE PES" ? "pes" : "cas"}`}>{m.society}</span>}
                {m.tshirt_size && <span className="chip-n">Hoodie {m.tshirt_size}</span>}
                {m.year && <span className="chip-n">Year {m.year}</span>}
                {m.branch && <span className="chip-n">{m.branch}</span>}
              </div>

              <ul className="mcontact">
                <li><Mail size={15} aria-hidden="true" /><a href={`mailto:${m.email}`}>{m.email}</a></li>
                <li><Phone size={15} aria-hidden="true" /><a href={`tel:${m.phone}`}>{m.phone}</a></li>
                {m.linkedin_url && <li><Linkedin size={15} aria-hidden="true" /><a href={m.linkedin_url} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>}
              </ul>

              <ActionForm action={setDesignation} className="mrole">
                <label className="sr" htmlFor={`role-${m.id}`}>Role of {m.full_name}</label>
                <input id={`role-${m.id}`} className="ainput" name="designation" list="roles" defaultValue={m.designation} maxLength={40} />
                <input type="hidden" name="id" value={m.id} />
                <SubmitButton type="submit" className="ab ab-ghost ab-sm">Save role</SubmitButton>
              </ActionForm>

              <div className="mactions">
                {m.status !== "approved" && <ActionForm action={setStatus}><input type="hidden" name="id" value={m.id} /><input type="hidden" name="status" value="approved" /><SubmitButton className="ab ab-ok ab-sm" type="submit">Approve</SubmitButton></ActionForm>}
                {m.status !== "rejected" && <ActionForm action={setStatus}><input type="hidden" name="id" value={m.id} /><input type="hidden" name="status" value="rejected" /><SubmitButton className="ab ab-danger ab-sm" type="submit">Reject</SubmitButton></ActionForm>}
                {m.status !== "pending" && <ActionForm action={setStatus}><input type="hidden" name="id" value={m.id} /><input type="hidden" name="status" value="pending" /><SubmitButton className="ab ab-ghost ab-sm" type="submit">Reset</SubmitButton></ActionForm>}
                {m.status === "approved" && <ActionForm action={setVisible}><input type="hidden" name="id" value={m.id} /><input type="hidden" name="show" value={String(!m.show_on_website)} /><SubmitButton className="ab ab-ghost ab-sm" type="submit">{m.show_on_website ? "Hide from site" : "Show on site"}</SubmitButton></ActionForm>}
              </div>
              {m.status === "approved" && <p className="mvis">{m.show_on_website ? "Visible on the Team page" : "Not shown on the Team page"}</p>}
            </article>
          ))}
        </div>
      )}
    </>
  );
}
