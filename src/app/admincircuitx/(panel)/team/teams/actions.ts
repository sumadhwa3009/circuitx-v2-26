"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/permissions";
import { createClient } from "@/lib/supabase/server";

const PATH = "/admincircuitx/team/teams";

const slugify = (s: string) =>
  s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

function done(error?: string): never {
  revalidatePath(PATH);
  redirect(error ? `${PATH}?error=${error}` : PATH);
}

const cleanName = (v: FormDataEntryValue | null) => String(v ?? "").trim().replace(/\s+/g, " ");

export async function addTeam(formData: FormData) {
  const admin = await requireAdmin("team.manage");
  const name = cleanName(formData.get("name"));
  const slug = slugify(name);
  if (name.length < 2 || name.length > 60 || !slug) done("name");

  const supabase = await createClient();
  const { data: last } = await supabase.from("teams").select("sort_order").order("sort_order", { ascending: false }).limit(1).maybeSingle();
  const { data, error } = await supabase.from("teams").insert({ name, slug, sort_order: (last?.sort_order ?? 0) + 10 }).select("id").single();
  if (error) done(error.code === "23505" ? "duplicate" : "failed");
  await supabase.from("audit_log").insert({ actor_email: admin.email, action: "team.add", entity: "teams", entity_id: data.id, details: { name } });
  done();
}

export async function renameTeam(formData: FormData) {
  const admin = await requireAdmin("team.manage");
  const id = String(formData.get("id") ?? "");
  const name = cleanName(formData.get("name"));
  if (name.length < 2 || name.length > 60) done("name");
  const supabase = await createClient();
  const { error } = await supabase.from("teams").update({ name }).eq("id", id); // slug stays the same on purpose
  if (error) done(error.code === "23505" ? "duplicate" : "failed");
  await supabase.from("audit_log").insert({ actor_email: admin.email, action: "team.rename", entity: "teams", entity_id: id, details: { name } });
  done();
}

export async function toggleTeam(formData: FormData) {
  const admin = await requireAdmin("team.manage");
  const id = String(formData.get("id") ?? "");
  const active = formData.get("active") === "true";
  const supabase = await createClient();
  const { error } = await supabase.from("teams").update({ is_active: active }).eq("id", id);
  if (error) done("failed");
  await supabase.from("audit_log").insert({ actor_email: admin.email, action: active ? "team.show" : "team.hide", entity: "teams", entity_id: id });
  done();
}

export async function moveTeam(formData: FormData) {
  const admin = await requireAdmin("team.manage");
  const id = String(formData.get("id") ?? "");
  const dir = formData.get("dir") === "up" ? -1 : 1;
  const supabase = await createClient();
  const { data: list } = await supabase.from("teams").select("id, sort_order").order("sort_order").order("name");
  const before = list ?? [];
  const teams = [...before];
  const i = teams.findIndex((t) => t.id === id);
  const j = i + dir;
  if (i < 0 || j < 0 || j >= teams.length) done();
  [teams[i], teams[j]] = [teams[j], teams[i]];
  // renumber everything 10, 20, 30... so ties and gaps never cause surprises
  for (let k = 0; k < teams.length; k++) {
    const order = (k + 1) * 10;
    const original = before.find((t) => t.id === teams[k].id);
    if (original?.sort_order !== order) {
      const { error } = await supabase.from("teams").update({ sort_order: order }).eq("id", teams[k].id);
      if (error) done("failed");
    }
  }
  await supabase.from("audit_log").insert({ actor_email: admin.email, action: "team.reorder", entity: "teams", entity_id: id });
  done();
}
