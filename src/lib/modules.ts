/**
 * Every module an admin can be given. To add a module: add a line here (the permission key),
 * then guard its pages with requireAdmin("<key>") and add it to the sidebar in (panel)/layout.tsx.
 * Super admins always have every module and are the only ones who manage admins.
 */
export const MODULES = [
  { key: "team.manage", label: "Team management", desc: "Organiser submissions, the organisers form and the teams list" },
  { key: "announcements.manage", label: "Announcements", desc: "Publish updates on the home page and as a popup" },
] as const;

export const MODULE_KEYS: string[] = MODULES.map((m) => m.key);
