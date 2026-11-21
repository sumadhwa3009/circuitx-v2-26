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
      <div className="adm-card">
        <p className="adm-eyebrow">CircuitX&apos;26</p>
        <h1>Admin</h1>
        {error && MESSAGES[error] && <p className="adm-error" role="alert">{MESSAGES[error]}</p>}
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
