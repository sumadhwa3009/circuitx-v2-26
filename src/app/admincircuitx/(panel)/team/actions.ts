"use server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/permissions";
import { createClient } from "@/lib/supabase/server";

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
  revalidatePath("/admincircuitx/team");
}
