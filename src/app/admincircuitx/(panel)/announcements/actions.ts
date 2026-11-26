"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/permissions";
import { createClient } from "@/lib/supabase/server";
import { ANNOUNCEMENT_CATEGORIES } from "@/lib/announcements";

const PATH = "/admincircuitx/announcements";

function finish(to: string): never {
  revalidatePath(PATH);
  revalidatePath("/", "layout"); // refresh the public site right away
  redirect(to);
}

/** undefined = invalid, null = empty, string = ok */
function cleanLink(v: string): string | null | undefined {
  if (!v) return null;
  if (v.startsWith("/") && !v.startsWith("//")) return v.slice(0, 500);
  try {
    const u = new URL(v);
    if (u.protocol === "https:" || u.protocol === "http:") return u.toString().slice(0, 500);
  } catch { /* fall through */ }
  return undefined;
}

export async function saveAnnouncement(formData: FormData) {
  const admin = await requireAdmin("announcements.manage");
  const id = String(formData.get("id") ?? "");
  const back = id ? `${PATH}/${id}` : `${PATH}/new`;

  const title = String(formData.get("title") ?? "").trim().replace(/\s+/g, " ");
  const description = String(formData.get("description") ?? "").trim();
  const category = String(formData.get("category") ?? "");
  const date = String(formData.get("date") ?? "");
  const link = cleanLink(String(formData.get("link") ?? "").trim());

  if (title.length < 3 || title.length > 140) redirect(`${back}?error=title`);
  if (description.length < 3 || description.length > 1000) redirect(`${back}?error=description`);
  if (!(ANNOUNCEMENT_CATEGORIES as readonly string[]).includes(category)) redirect(`${back}?error=category`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) redirect(`${back}?error=date`);
  if (link === undefined) redirect(`${back}?error=link`);

  const row = {
    title, description, category, link_url: link, announced_on: date,
    is_published: formData.get("published") === "on",
    show_in_popup: formData.get("popup") === "on",
  };

  const supabase = await createClient();
  let entityId = id;
  if (id) {
    const { error } = await supabase.from("announcements").update(row).eq("id", id);
    if (error) redirect(`${back}?error=failed`);
  } else {
    const { data, error } = await supabase.from("announcements").insert({ ...row, created_by: admin.email }).select("id").single();
    if (error) redirect(`${back}?error=failed`);
    entityId = data.id;
  }
  await supabase.from("audit_log").insert({
    actor_email: admin.email, action: id ? "announcement.update" : "announcement.create",
    entity: "announcements", entity_id: entityId, details: { title },
  });
  finish(`${PATH}?saved=1`);
}

export async function setPublished(formData: FormData) {
  const admin = await requireAdmin("announcements.manage");
  const id = String(formData.get("id") ?? "");
  const publish = formData.get("publish") === "true";
  const supabase = await createClient();
  const { error } = await supabase.from("announcements").update({ is_published: publish }).eq("id", id);
  if (error) redirect(`${PATH}?error=failed`);
  await supabase.from("audit_log").insert({ actor_email: admin.email, action: publish ? "announcement.publish" : "announcement.unpublish", entity: "announcements", entity_id: id });
  finish(PATH);
}

export async function deleteAnnouncement(formData: FormData) {
  const admin = await requireAdmin("announcements.manage");
  const id = String(formData.get("id") ?? "");
  const supabase = await createClient();
  const { error } = await supabase.from("announcements").delete().eq("id", id);
  if (error) redirect(`${PATH}?error=failed`);
  await supabase.from("audit_log").insert({ actor_email: admin.email, action: "announcement.delete", entity: "announcements", entity_id: id });
  finish(PATH);
}
