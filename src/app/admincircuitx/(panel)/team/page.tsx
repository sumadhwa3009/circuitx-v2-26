import { requireAdmin } from "@/lib/auth/permissions";
import { createClient } from "@/lib/supabase/server";
import { setFormOpen } from "./actions";

export default async function TeamManagement() {
  await requireAdmin("team.manage");
  const supabase = await createClient();
  const [{ data: settings }, total, pending] = await Promise.all([
    supabase.from("form_settings").select("is_open, closes_at").eq("key", "team_registration").single(),
    supabase.from("team_members").select("id", { count: "exact", head: true }),
    supabase.from("team_members").select("id", { count: "exact", head: true }).eq("status", "pending"),
  ]);
  const open = !!settings?.is_open;

  return (
    <>
      <h1>Team management</h1>
      <div className="adm-panel">
        <h2>Organisers form</h2>
        <p>Status: <b className={open ? "adm-on" : "adm-off"}>{open ? "Accepting responses" : "Closed"}</b></p>
        <form action={setFormOpen}>
          <input type="hidden" name="open" value={String(!open)} />
          <button className={`btn ${open ? "btn-line" : "btn-go"}`} type="submit"><span>{open ? "Stop accepting responses" : "Start accepting responses"}</span></button>
        </form>
      </div>
      <div className="adm-panel">
        <h2>Submissions</h2>
        <p>{total.count ?? 0} total · {pending.count ?? 0} pending review</p>
        <p className="adm-muted">The submissions table, approvals and CSV export come in the next step.</p>
      </div>
    </>
  );
}
