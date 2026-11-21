import Link from "next/link";
import { can, requireAdmin } from "@/lib/auth/permissions";

export default async function Dashboard({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const admin = await requireAdmin();
  const { error } = await searchParams;
  return (
    <>
      <h1>Overview</h1>
      {error === "forbidden" && <p className="adm-error" role="alert">You don&apos;t have permission for that section.</p>}
      <div className="adm-grid">
        {can(admin, "team.manage") && (
          <Link href="/admincircuitx/team" className="adm-tile">
            <b>Team management</b>
            <span>Organisers form, submissions and approvals</span>
          </Link>
        )}
      </div>
    </>
  );
}
