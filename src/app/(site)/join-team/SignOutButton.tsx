"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Spinner } from "@/components/ui/Spinner";

export function SignOutButton() {
  const [busy, setBusy] = useState(false);
  return (
    <button type="button" className="btn btn-line btn-sm" disabled={busy} aria-busy={busy}
      onClick={async () => { setBusy(true); await createClient().auth.signOut(); location.href = "/join-team"; }}>
      <span>{busy && <Spinner />}Sign out</span>
    </button>
  );
}
