import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/permissions";
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";
import { AdminLogo } from "@/components/admin/AdminLogo";
import { signOut } from "./actions";
import { ActionForm, SubmitButton } from "@/components/ui/ActionForm";

const MESSAGES: Record<string, string> = {
  unauthorized: "This Google account does not have admin access.",
  auth: "Sign-in failed. Please try again.",
};

export default async function AdminLogin({ searchParams }: { searchParams: Promise<{ error?: string; reason?: string }> }) {
  const { error, reason } = await searchParams;
  const { user, admin } = await getSession();
  if (admin) redirect("/admincircuitx/dashboard");

  return (
    <section className="adm-login">
      <div className="acard login-card">
        <span className="adm-brand"><AdminLogo size="md" priority /></span>
        <h1>Admin sign in</h1>
        <p className="amuted">Organisers only. Use the Google account that was given admin access.</p>
        {reason === "timeout" && <p className="aalert ok" role="status">You were signed out after a period of inactivity. Please sign in again.</p>}
        {error && MESSAGES[error] && <p className="aalert" role="alert">{MESSAGES[error]}</p>}
        {user ? (
          <>
            <p>Signed in as <b>{user.email}</b>, which is not on the admin list.</p>
            <ActionForm action={signOut}><SubmitButton className="btn btn-line"><span>Use a different account</span></SubmitButton></ActionForm>
          </>
        ) : (
          <GoogleSignInButton next="/admincircuitx/dashboard" />
        )}
      </div>
    </section>
  );
}
