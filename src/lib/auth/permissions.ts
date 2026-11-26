import { cache } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type Permission = "team.manage" | "announcements.manage" | "admins.manage";
export type Admin = { email: string; role: "super_admin" | "admin"; permissions: string[] };

/** One lookup per request: the verified Google user and, if allow-listed, their admin row. */
export const getSession = cache(async () => {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser(); // verifies the JWT with Supabase
  if (!user?.email) return { user: null, admin: null as Admin | null };
  const { data } = await supabase
    .from("admins")
    .select("email, role, permissions")
    .eq("email", user.email.toLowerCase())
    .maybeSingle();
  return { user, admin: (data as Admin | null) ?? null };
});

export const can = (a: Admin, p: Permission) => a.role === "super_admin" || a.permissions.includes(p);

/** Call at the top of every admin page / server action. Redirects away if not allowed. */
export async function requireAdmin(permission?: Permission) {
  const { admin } = await getSession();
  if (!admin) redirect("/admincircuitx?error=unauthorized");
  if (permission && !can(admin, permission)) redirect("/admincircuitx/dashboard?error=forbidden");
  return admin;
}
