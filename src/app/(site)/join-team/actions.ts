"use server";
import { createClient } from "@/lib/supabase/server";
import { validateTeamInput, type TeamInput } from "@/lib/validation/team";

export type SubmitResult = { ok: true } | { ok: false; error?: string; fieldErrors?: Record<string, string> };

export async function submitTeamForm(input: TeamInput): Promise<SubmitResult> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser(); // verified session; email is NEVER taken from the browser
  if (!user?.email) return { ok: false, error: "Please sign in with Google first." };

  if (input.website) return { ok: true }; // honeypot filled: pretend success

  const { data, errors } = validateTeamInput(input);
  if (!data) return { ok: false, fieldErrors: errors };
  if (data.photo_path !== `${user.id}/photo.jpg`) return { ok: false, fieldErrors: { photo: "Upload your photo again" } };

  const { data: open } = await supabase.rpc("form_is_open");
  if (!open) return { ok: false, error: "The form is not accepting responses right now." };

  const { data: existing } = await supabase.from("team_members").select("id, status").eq("user_id", user.id).maybeSingle();
  const row = { ...data, email: user.email.toLowerCase() };

  let error;
  if (existing) {
    if (existing.status !== "pending") return { ok: false, error: "Your submission has already been reviewed and can no longer be edited." };
    ({ error } = await supabase.from("team_members").update(row).eq("id", existing.id));
  } else {
    ({ error } = await supabase.from("team_members").insert({ ...row, user_id: user.id }));
  }

  if (error) {
    if (error.code === "23505") {
      if (error.message.includes("usn")) return { ok: false, fieldErrors: { usn: "This USN has already been submitted" } };
      return { ok: false, error: "A submission already exists for this account or email." };
    }
    return { ok: false, error: "Could not save your response. Please try again." };
  }
  return { ok: true };
}
