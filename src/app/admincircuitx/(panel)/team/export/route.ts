import { NextResponse } from "next/server";
import { can, getSession } from "@/lib/auth/permissions";
import { createClient } from "@/lib/supabase/server";

// Stops spreadsheet formula injection from user-typed text.
const cell = (v: unknown) => {
  let s = v == null ? "" : String(v);
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
};

export async function GET() {
  const { admin } = await getSession();
  if (!admin || !can(admin, "team.manage")) return new NextResponse("Forbidden", { status: 403 });

  const supabase = await createClient();
  const { data, error } = await supabase.from("team_members").select("*, teams(name)").order("submitted_at", { ascending: false });
  if (error) return new NextResponse("Export failed", { status: 500 });

  const head = ["Full name", "USN", "Email", "Phone", "Team", "Society", "Designation", "Branch", "Year", "Hoodie size", "LinkedIn", "Instagram", "GitHub", "Status", "Show on website", "Submitted at"];
  const lines = [head.map(cell).join(",")];
  for (const m of (data ?? []) as Array<Record<string, unknown> & { teams: { name: string } | null }>) {
    lines.push([m.full_name, m.usn, m.email, m.phone, m.teams?.name, m.society, m.designation, m.branch, m.year, m.tshirt_size, m.linkedin_url, m.instagram_url, m.github_url, m.status, m.show_on_website ? "yes" : "no", m.submitted_at].map(cell).join(","));
  }
  return new NextResponse("\uFEFF" + lines.join("\r\n"), {
    headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": 'attachment; filename="circuitx-team.csv"', "Cache-Control": "no-store" },
  });
}
