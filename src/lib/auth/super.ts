import { redirect } from "next/navigation";
import { getSession } from "./permissions";

/** Only super admins may pass (used by the Admins module). */
export async function requireSuperAdmin() {
  const { admin } = await getSession();
  if (!admin) redirect("/admincircuitx?error=unauthorized");
  if (admin.role !== "super_admin") redirect("/admincircuitx/dashboard?error=forbidden");
  return admin;
}
