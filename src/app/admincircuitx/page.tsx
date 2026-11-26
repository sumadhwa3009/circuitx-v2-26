import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/permissions";
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";
import { signOut } from "./actions";

const MESSAGES: Record<string, string> = {
  unauthorized: "This Google account does not have admin access.",
  auth: "Sign-in failed. Please try again.",
};

export default async function AdminLogin({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  const { user, admin } = await getSession();
  if (admin) redirect("/admincircuitx/dashboard");

  return (
    <section className="adm-login">
      <div className="acard login-card">
        <span className="adm-brand"><i aria-hidden="true">CX</i><span>CircuitX&apos;26<small>Admin</small></span></span>
        <h1>Sign in</h1>
        <p className="amuted">Organisers only. Use the Google account that was given admin access.</p>
        {error && MESSAGES[error] && <p className="aalert" role="alert">{MESSAGES[error]}</p>}
        {user ? (
          <>
            <p>Signed in as <b>{user.email}</b>, which is not on the admin list.</p>
            <form action={signOut}><button className="btn btn-line" type="submit"><span>Use a different account</span></button></form>
          </>
        ) : (
          <GoogleSignInButton next="/admincircuitx/dashboard" />
        )}
      </div>
    </section>
  );
}
