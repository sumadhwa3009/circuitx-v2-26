"use client";
import { createClient } from "@/lib/supabase/client";

export function SignOutButton() {
  return (
    <button type="button" className="btn btn-line btn-sm" onClick={async () => { await createClient().auth.signOut(); location.href = "/join-team"; }}>
      <span>Sign out</span>
    </button>
  );
}
