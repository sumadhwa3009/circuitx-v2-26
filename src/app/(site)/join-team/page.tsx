import type { Metadata } from "next";
import { PageBanner } from "@/components/PageBanner";
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";
import { createClient } from "@/lib/supabase/server";
import { TeamForm } from "./TeamForm";
import { SignOutButton } from "./SignOutButton";
import "./join.css";

export const metadata: Metadata = { title: "Organisers form", robots: { index: false, follow: false } };

export default async function JoinTeam() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const [{ data: open }, { data: settings }, { data: teams }] = await Promise.all([
    supabase.rpc("form_is_open"),
    supabase.from("form_settings").select("closed_message").eq("key", "team_registration").maybeSingle(),
    supabase.from("teams").select("id, name").eq("is_active", true).order("sort_order"),
  ]);

  let existing = null;
  let photoUrl: string | null = null;
  if (user) {
    const { data } = await supabase.from("team_members").select("*").eq("user_id", user.id).maybeSingle();
    existing = data;
    if (data?.photo_path) {
      const { data: s } = await supabase.storage.from("team-photos").createSignedUrl(data.photo_path, 3600);
      photoUrl = s?.signedUrl ?? null;
    }
  }

  const teamName = existing ? (teams ?? []).find((t) => t.id === existing.team_id)?.name : undefined;
  const canEdit = !!open && (!existing || existing.status === "pending");
  const name = (user?.user_metadata?.full_name ?? user?.user_metadata?.name ?? "") as string;

  return (
    <>
      <PageBanner art="santa" title="Organisers form" intro="For the CircuitX'26 organising team. Sign in with Google and fill in your details once." />
      <section className="sec">
        <div className="wrap join">
          <div className="join-card">
            {!user && !open && <><h2>Not accepting responses</h2><p>{settings?.closed_message ?? "The organisers form is not accepting responses right now."}</p></>}
            {!user && open && (
              <>
                <h2>Sign in to continue</h2>
                <p>We use your Google name and email to fill the form. We do not read anything else from your account.</p>
                <GoogleSignInButton next="/join-team" label="Sign in with Google" />
              </>
            )}
            {user && (
              <>
                <div className="join-user"><span>Signed in as <b>{user.email}</b></span><SignOutButton /></div>
                {canEdit ? (
                  <TeamForm user={{ id: user.id, email: user.email ?? "", name }} teams={teams ?? []} existing={existing} photoUrl={photoUrl} />
                ) : existing ? (
                  <div className="join-sum">
                    <h2>Your submission</h2>
                    <p><span className={`pill ${existing.status}`}>{existing.status}</span></p>
                    <p><b>{existing.full_name}</b> · {existing.usn}</p>
                    {teamName && <p>Team: {teamName}</p>}
                    <p>{open ? "It has been reviewed, so it can no longer be edited here." : "The form is closed, so it can no longer be edited."} Contact the organisers for changes.</p>
                  </div>
                ) : (
                  <><h2>Not accepting responses</h2><p>{settings?.closed_message ?? "The organisers form is not accepting responses right now."}</p></>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
