import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth/permissions";
import { createClient } from "@/lib/supabase/server";
import { deleteAnnouncement } from "../actions";
import { ActionForm, SubmitButton } from "@/components/ui/ActionForm";
import { AnnouncementForm, type AnnouncementRow } from "../AnnouncementForm";
import "../announcements.css";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function EditAnnouncement({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ error?: string }> }) {
  await requireAdmin("announcements.manage");
  const { id } = await params;
  const { error } = await searchParams;
  if (!UUID.test(id)) notFound();
  const supabase = await createClient();
  const { data } = await supabase.from("announcements").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  const row = data as AnnouncementRow;

  return (
    <>
      <div className="adm-ph"><div><p className="amuted"><Link href="/admincircuitx/announcements" className="link">Announcements</Link> / Edit</p><h1>Edit announcement</h1></div></div>
      <AnnouncementForm initial={row} today={row.announced_on} error={error} />
      <details className="adanger">
        <summary>Delete this announcement</summary>
        <ActionForm action={deleteAnnouncement}>
          <input type="hidden" name="id" value={row.id} />
          <span className="amuted">This removes it permanently. To just hide it, untick Published instead.</span>
          <SubmitButton type="submit" className="ab ab-danger ab-sm">Yes, delete it</SubmitButton>
        </ActionForm>
      </details>
    </>
  );
}
