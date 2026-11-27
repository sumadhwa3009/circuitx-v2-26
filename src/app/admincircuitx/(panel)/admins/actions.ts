"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireSuperAdmin } from "@/lib/auth/super";
import { createClient } from "@/lib/supabase/server";
import { MODULE_KEYS } from "@/lib/modules";

const PATH = "/admincircuitx/admins";

function done(error?: string): never {
  revalidatePath(PATH);
  redirect(error ? `${PATH}?error=${error}` : `${PATH}?saved=1`);
}

const perms = (fd: FormData) => Array.from(new Set(fd.getAll("perm").map(String))).filter((p) => MODULE_KEYS.includes(p));

export async function addAdmin(formData: FormData) {
  const me = await requireSuperAdmin();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (email.length > 200 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) done("email");
  const permissions = perms(formData);

  const supabase = await createClient();
  const { data, error } = await supabase.from("admins").insert({ email, role: "admin", permissions, created_by: me.email }).select("id").single();
  if (error) done(error.code === "23505" ? "exists" : "failed");
  await supabase.from("audit_log").insert({ actor_email: me.email, action: "admin.add", entity: "admins", entity_id: data.id, details: { email, permissions } });
  done();
}

export async function updatePermissions(formData: FormData) {
  const me = await requireSuperAdmin();
  const id = String(formData.get("id") ?? "");
  const permissions = perms(formData);
  const supabase = await createClient();
  const { error } = await supabase.from("admins").update({ permissions }).eq("id", id).eq("role", "admin"); // super admins are never edited here
  if (error) done("failed");
  await supabase.from("audit_log").insert({ actor_email: me.email, action: "admin.permissions", entity: "admins", entity_id: id, details: { permissions } });
  done();
}

export async function removeAdmin(formData: FormData) {
  const me = await requireSuperAdmin();
  const id = String(formData.get("id") ?? "");
  const supabase = await createClient();
  const { data: row } = await supabase.from("admins").select("email, role").eq("id", id).maybeSingle();
  if (!row || row.role !== "admin" || row.email === me.email) done("failed");
  const { error } = await supabase.from("admins").delete().eq("id", id);
  if (error) done("failed");
  await supabase.from("audit_log").insert({ actor_email: me.email, action: "admin.remove", entity: "admins", entity_id: id, details: { email: row.email } });
  done();
}
