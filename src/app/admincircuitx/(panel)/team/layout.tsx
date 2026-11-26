import { requireAdmin } from "@/lib/auth/permissions";
import { TeamTabs } from "@/components/admin/TeamTabs";

export default async function TeamLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin("team.manage");
  return (
    <>
      <div className="adm-ph"><div><h1>Team management</h1><p className="amuted">Organiser submissions, the organisers form and the teams people can join.</p></div></div>
      <TeamTabs />
      {children}
    </>
  );
}
