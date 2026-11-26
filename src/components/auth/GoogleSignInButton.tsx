"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Spinner } from "@/components/ui/Spinner";

/** Reused by the admin login and (later) the organisers form / team-member login. */
export function GoogleSignInButton({ next = "/", label = "Continue with Google" }: { next?: string; label?: string }) {
  const [busy, setBusy] = useState(false);
  async function go() {
    setBusy(true);
    const { error } = await createClient().auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
        queryParams: { prompt: "select_account" },
      },
    });
    if (error) setBusy(false);
  }
  return (
    <button type="button" className="btn btn-go" onClick={go} disabled={busy} aria-busy={busy}>
      <span>{busy && <Spinner />}{busy ? "Redirecting…" : label}</span>
    </button>
  );
}
