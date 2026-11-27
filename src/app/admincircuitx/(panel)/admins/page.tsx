import { requireSuperAdmin } from "@/lib/auth/super";
import { createClient } from "@/lib/supabase/server";
import { MODULES } from "@/lib/modules";
import { ActionForm, SubmitButton } from "@/components/ui/ActionForm";
import { addAdmin, removeAdmin, updatePermissions } from "./actions";
import "./admins.css";

const ERRORS: Record<string, string> = {
  email: "Enter a valid email address.",
  exists: "That email is already an admin.",
  failed: "Something went wrong. Please try again.",
};

type Member = { full_name: string; email: string; photo_path: string; status: string; teams: { name: string } | null };

function Modules({ selected }: { selected?: string[] }) {
  return (
    <div className="mods">
      {MODULES.map((m) => (
        <label className="acheck" key={m.key}>
          <input type="checkbox" name="perm" value={m.key} defaultChecked={selected?.includes(m.key)} />
          <span><b>{m.label}</b><small>{m.desc}</small></span>
        </label>
      ))}
    </div>
  );
}

export default async function Admins({ searchParams }: { searchParams: Promise<{ error?: string; saved?: string }> }) {
  const me = await requireSuperAdmin();
  const { error, saved } = await searchParams;
  const supabase = await createClient();
  const [{ data: admins }, { data: people }] = await Promise.all([
    supabase.from("admins").select("id, email, role, permissions, created_at").order("created_at"),
    supabase.from("team_members").select("full_name, email, photo_path, status, teams(name)").order("full_name"),
  ]);
  const list = admins ?? [];
  const members = (people ?? []) as unknown as Member[];
  const byEmail = new Map(members.map((m) => [m.email, m]));
  const adminEmails = new Set(list.map((a) => a.email));
  const suggestions = members.filter((m) => !adminEmails.has(m.email));

  const urls: Record<string, string> = {};
  const paths = list.map((a) => byEmail.get(a.email)?.photo_path).filter(Boolean) as string[];
  if (paths.length) {
    const { data: signed } = await supabase.storage.from("team-photos").createSignedUrls(paths, 3600);
    signed?.forEach((s) => { if (s.path && s.signedUrl) urls[s.path] = s.signedUrl; });
  }

  return (
    <>
      <div className="adm-ph"><div><h1>Admins</h1><p className="amuted">Choose who can sign in here and which modules each person can manage.</p></div></div>
      {saved && <p className="aalert ok" role="status">Saved.</p>}
      {error && ERRORS[error] && <p className="aalert" role="alert">{ERRORS[error]}</p>}

      <section className="acard admadd">
        <h2>Add an admin</h2>
        <ActionForm action={addAdmin} className="admedit" style={{ display: "grid", gap: 16 }}>
          <label className="afield">Google email
            <input className="ainput" type="email" name="email" list="org-emails" required maxLength={200} placeholder="Start typing a name or email" autoComplete="off" />
            <small>Organisers who filled the organisers form appear as you type. The person must sign in at /admincircuitx with this same Google account.</small>
          </label>
          <datalist id="org-emails">
            {suggestions.map((m) => <option key={m.email} value={m.email}>{m.full_name}{m.teams?.name ? ` · ${m.teams.name}` : ""} · {m.status}</option>)}
          </datalist>
          <div className="afield">Modules they can manage<Modules /></div>
          <div><SubmitButton className="ab ab-pri">Add admin</SubmitButton></div>
        </ActionForm>
      </section>

      <div className="adm-ph sub"><h2>Current admins <span className="amuted">({list.length})</span></h2></div>
      <div className="admgrid">
        {list.map((a) => {
          const m = byEmail.get(a.email);
          const isSuper = a.role === "super_admin";
          const isMe = a.email === me.email;
          return (
            <article className="admcard" key={a.id}>
              <header>
                <span className="mavatar">{m && urls[m.photo_path] ? /* eslint-disable-next-line @next/next/no-img-element */ <img src={urls[m.photo_path]} alt={m.full_name} /> : (m?.full_name ?? a.email)[0]?.toUpperCase()}</span>
                <div className="mname"><b>{m?.full_name ?? a.email}</b>{m && <small>{a.email}</small>}</div>
                <span className={`apill ${isSuper ? "approved" : ""}`}>{isSuper ? "Super admin" : "Admin"}</span>
                {isMe && <span className="apill">You</span>}
              </header>

              {isSuper ? (
                <p className="amuted">Full access to every module, including this page. Super admin rights are changed in the database only.</p>
              ) : (
                <>
                  <ActionForm action={updatePermissions} className="admedit">
                    <input type="hidden" name="id" value={a.id} />
                    <Modules selected={a.permissions} />
                    <div><SubmitButton className="ab ab-ghost ab-sm">Save access</SubmitButton></div>
                  </ActionForm>
                  <details className="adanger">
                    <summary>Remove this admin</summary>
                    <ActionForm action={removeAdmin}>
                      <input type="hidden" name="id" value={a.id} />
                      <span className="amuted">They lose all access immediately. Their organiser entry is not affected.</span>
                      <SubmitButton className="ab ab-danger ab-sm">Yes, remove</SubmitButton>
                    </ActionForm>
                  </details>
                </>
              )}
            </article>
          );
        })}
      </div>
    </>
  );
}
