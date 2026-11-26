"use server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/permissions";
import { createClient } from "@/lib/supabase/server";

const PATH = "/admincircuitx/team";

export async function setFormOpen(formData: FormData) {
  const admin = await requireAdmin("team.manage");
  const open = formData.get("open") === "true";
  const supabase = await createClient();
  const { error } = await supabase
    .from("form_settings")
    .update({ is_open: open, updated_by: admin.email, updated_at: new Date().toISOString() })
    .eq("key", "team_registration");
  if (error) throw new Error(error.message);
  await supabase.from("audit_log").insert({
    actor_email: admin.email, action: open ? "form.open" : "form.close",
    entity: "form_settings", entity_id: "team_registration",
  });
  revalidatePath(PATH);
}

export async function setStatus(formData: FormData) {
  const admin = await requireAdmin("team.manage");
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!["pending", "approved", "rejected"].includes(status)) return;
  const supabase = await createClient();
  const patch: Record<string, unknown> = { status };
  if (status !== "approved") patch.show_on_website = false;
  const { error } = await supabase.from("team_members").update(patch).eq("id", id);
  if (error) throw new Error(error.message);
  await supabase.from("audit_log").insert({ actor_email: admin.email, action: `member.${status}`, entity: "team_members", entity_id: id });
  revalidatePath(PATH);
}

export async function setVisible(formData: FormData) {
  const admin = await requireAdmin("team.manage");
  const id = String(formData.get("id") ?? "");
  const show = formData.get("show") === "true";
  const supabase = await createClient();
  const { error } = await supabase.from("team_members").update({ show_on_website: show }).eq("id", id).eq("status", "approved");
  if (error) throw new Error(error.message);
  await supabase.from("audit_log").insert({ actor_email: admin.email, action: show ? "member.show" : "member.hide", entity: "team_members", entity_id: id });
  revalidatePath(PATH);
}

export async function setDesignation(formData: FormData) {
  const admin = await requireAdmin("team.manage");
  const id = String(formData.get("id") ?? "");
  const designation = String(formData.get("designation") ?? "").trim().replace(/\s+/g, " ");
  if (designation.length < 2 || designation.length > 40) return;
  const supabase = await createClient();
  const { error } = await supabase.from("team_members").update({ designation }).eq("id", id);
  if (error) throw new Error(error.message);
  await supabase.from("audit_log").insert({ actor_email: admin.email, action: "member.role", entity: "team_members", entity_id: id, details: { designation } });
  revalidatePath(PATH);
}
