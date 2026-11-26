import Link from "next/link";
import { Eye, EyeOff, Pencil, Plus } from "lucide-react";
import { requireAdmin } from "@/lib/auth/permissions";
import { createClient } from "@/lib/supabase/server";
import { setPublished } from "./actions";
import { ActionForm, SubmitButton } from "@/components/ui/ActionForm";
import type { AnnouncementRow } from "./AnnouncementForm";
import "./announcements.css";

const ERRORS: Record<string, string> = { failed: "Something went wrong. Please try again." };
const fmt = (d: string) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Kolkata" });

export default async function Announcements({ searchParams }: { searchParams: Promise<{ error?: string; saved?: string }> }) {
  await requireAdmin("announcements.manage");
  const { error, saved } = await searchParams;
  const supabase = await createClient();
  const { data } = await supabase.from("announcements").select("*").order("announced_on", { ascending: false }).order("created_at", { ascending: false });
  const list = (data ?? []) as AnnouncementRow[];

  return (
    <>
      <div className="adm-ph">
        <div><h1>Announcements</h1><p className="amuted">Shown in &ldquo;Latest announcements&rdquo; on the home page. The newest one marked as popup also opens for visitors.</p></div>
        <Link href="/admincircuitx/announcements/new" className="ab ab-pri"><Plus size={17} aria-hidden="true" />New announcement</Link>
      </div>
      {saved && <p className="aalert ok" role="status">Saved. The website has been updated.</p>}
      {error && ERRORS[error] && <p className="aalert" role="alert">{ERRORS[error]}</p>}

      {list.length === 0 ? (
        <div className="acard" style={{ textAlign: "center" }}><p className="amuted">No announcements yet. Create the first one.</p></div>
      ) : (
        <div className="nlist">
          {list.map((a) => (
            <article key={a.id} className={`nrow ${a.is_published ? "" : "draft"}`}>
              <div className="nrow-head">
                <span className="ncat">{a.category}</span>
                <span className="ndate">{fmt(a.announced_on)}</span>
                <span className={`apill ${a.is_published ? "approved" : "pending"}`}>{a.is_published ? "Published" : "Draft"}</span>
                {a.show_in_popup && <span className="apill">Popup</span>}
                <h3>{a.title}</h3>
              </div>
              <p className="ndesc">{a.description}</p>
              {a.link_url && <p className="nlink">{a.link_url}</p>}
              <div className="nacts">
                <Link href={`/admincircuitx/announcements/${a.id}`} className="ab ab-ghost ab-sm"><Pencil size={15} aria-hidden="true" />Edit</Link>
                <ActionForm action={setPublished}>
                  <input type="hidden" name="id" value={a.id} /><input type="hidden" name="publish" value={String(!a.is_published)} />
                  <SubmitButton className="ab ab-ghost ab-sm" type="submit">{a.is_published ? <><EyeOff size={15} aria-hidden="true" />Unpublish</> : <><Eye size={15} aria-hidden="true" />Publish</>}</SubmitButton>
                </ActionForm>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
