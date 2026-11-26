import { createClient } from "@supabase/supabase-js";

export const ANNOUNCEMENT_CATEGORIES = ["Registration", "Deadline", "Shortlisting", "Instructions", "Update"] as const;
export type AnnouncementCategory = (typeof ANNOUNCEMENT_CATEGORIES)[number];

export type Announcement = {
  id: string; title: string; date: string; category: AnnouncementCategory; description: string; href?: string; popup: boolean;
};

/** Published announcements, newest first. Uses the public key only (no cookies), so pages stay cacheable. */
export async function getAnnouncements(): Promise<Announcement[]> {
  try {
    const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { data, error } = await sb
      .from("announcements")
      .select("id, title, description, category, link_url, announced_on, show_in_popup")
      .eq("is_published", true)
      .order("announced_on", { ascending: false })
      .order("created_at", { ascending: false });
    if (error || !data) return [];
    return data.map((r) => ({
      id: r.id, title: r.title, description: r.description, category: r.category as AnnouncementCategory,
      date: r.announced_on, href: r.link_url ?? undefined, popup: r.show_in_popup,
    }));
  } catch {
    return [];
  }
}
