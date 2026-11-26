import Link from "next/link";
import { ANNOUNCEMENT_CATEGORIES } from "@/lib/announcements";
import { saveAnnouncement } from "./actions";

export type AnnouncementRow = {
  id: string; title: string; description: string; category: string; link_url: string | null;
  announced_on: string; is_published: boolean; show_in_popup: boolean;
};

const ERRORS: Record<string, string> = {
  title: "The title must be between 3 and 140 characters.",
  description: "The message must be between 3 and 1000 characters.",
  category: "Choose a category.",
  date: "Choose a valid date.",
  link: "The link must start with https:// (or / for a page on this site).",
  failed: "Could not save. Please try again.",
};

export function AnnouncementForm({ initial, today, error }: { initial?: AnnouncementRow; today: string; error?: string }) {
  return (
    <form action={saveAnnouncement} className="aform">
      {error && ERRORS[error] && <p className="aalert" role="alert">{ERRORS[error]}</p>}
      {initial && <input type="hidden" name="id" value={initial.id} />}

      <label className="afield">Title
        <input className="ainput" name="title" defaultValue={initial?.title} required minLength={3} maxLength={140} placeholder="Round 1 registrations are now open" />
      </label>

      <div className="arow">
        <label className="afield">Category
          <select className="ainput" name="category" defaultValue={initial?.category ?? "Update"}>
            {ANNOUNCEMENT_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </label>
        <label className="afield">Date shown
          <input className="ainput" type="date" name="date" defaultValue={initial?.announced_on ?? today} required />
        </label>
      </div>

      <label className="afield">Message
        <textarea className="ainput" name="description" defaultValue={initial?.description} required minLength={3} maxLength={1000} rows={5} placeholder="What do participants need to know?" />
      </label>

      <label className="afield">Link <small>Optional. A full https:// address, or a page on this site such as /themes.</small>
        <input className="ainput" name="link" defaultValue={initial?.link_url ?? ""} maxLength={500} placeholder="https://..." />
      </label>

      <label className="acheck"><input type="checkbox" name="published" defaultChecked={initial?.is_published ?? true} /><span><b>Published</b><small>Visible on the website. Untick to keep it as a draft.</small></span></label>
      <label className="acheck"><input type="checkbox" name="popup" defaultChecked={initial?.show_in_popup ?? false} /><span><b>Show as popup</b><small>The newest published announcement with this ticked opens as a popup for visitors, once per session.</small></span></label>

      <div className="aform-actions">
        <button className="ab ab-pri" type="submit">{initial ? "Save changes" : "Publish announcement"}</button>
        <Link href="/admincircuitx/announcements" className="ab ab-ghost">Cancel</Link>
      </div>
    </form>
  );
}
