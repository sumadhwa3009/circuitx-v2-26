export const TSHIRT_SIZES = ["XS", "S", "M", "L", "XL", "XXL"] as const;
export const SOCIETIES = ["IEEE PES", "IEEE CASS"] as const;

export type TeamInput = {
  fullName: string; usn: string; phone: string; teamId: string; society: string; photoPath: string;
  linkedin?: string; instagram?: string; github?: string;
  branch?: string; year?: string; tshirt?: string;
  website?: string; // honeypot: real users leave this empty
};

export type CleanTeam = {
  full_name: string; usn: string; phone: string; team_id: string; society: string; photo_path: string;
  linkedin_url: string | null; instagram_url: string | null; github_url: string | null;
  branch: string | null; year: number | null; tshirt_size: string | null;
};

const HOSTS = {
  linkedin: { re: /(^|\.)linkedin\.com$/, label: "linkedin.com" },
  instagram: { re: /(^|\.)instagram\.com$/, label: "instagram.com" },
  github: { re: /(^|\.)github\.com$/, label: "github.com" },
} as const;

function cleanUrl(raw: string | undefined, kind: keyof typeof HOSTS): { value: string | null; error?: string } {
  const s = (raw ?? "").trim();
  if (!s) return { value: null };
  let u: URL;
  try { u = new URL(/^https?:\/\//i.test(s) ? s : `https://${s}`); } catch { return { value: null, error: "Enter a valid link" }; }
  if (!HOSTS[kind].re.test(u.hostname.toLowerCase())) return { value: null, error: `Link must be on ${HOSTS[kind].label}` };
  u.protocol = "https:";
  return { value: u.toString().slice(0, 300) };
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Runs on the server (the source of truth); the browser form reuses the same messages. */
export function validateTeamInput(i: TeamInput): { data?: CleanTeam; errors: Record<string, string> } {
  const errors: Record<string, string> = {};
  const fullName = (i.fullName ?? "").trim().replace(/\s+/g, " ");
  if (fullName.length < 2 || fullName.length > 100) errors.fullName = "Enter your full name (2 to 100 characters)";

  const usn = (i.usn ?? "").replace(/\s+/g, "").toUpperCase();
  if (!/^[A-Z0-9]{8,15}$/.test(usn)) errors.usn = "Enter a valid USN, letters and digits only (for example 1BY22EC001)";

  const phone = (i.phone ?? "").replace(/[\s-]/g, "").replace(/^(\+91|91|0)(?=\d{10}$)/, "");
  if (!/^[6-9]\d{9}$/.test(phone)) errors.phone = "Enter a 10-digit mobile number";

  if (!UUID.test(i.teamId ?? "")) errors.teamId = "Choose your team";
  if (!(SOCIETIES as readonly string[]).includes(i.society)) errors.society = "Choose your society";
  if (!i.photoPath) errors.photo = "Upload your photo";

  const li = cleanUrl(i.linkedin, "linkedin"); if (li.error) errors.linkedin = li.error;
  const ig = cleanUrl(i.instagram, "instagram"); if (ig.error) errors.instagram = ig.error;
  const gh = cleanUrl(i.github, "github"); if (gh.error) errors.github = gh.error;

  const branch = (i.branch ?? "").trim();
  if (branch.length > 60) errors.branch = "Keep this under 60 characters";

  let year: number | null = null;
  if (i.year) { year = Number(i.year); if (![1, 2, 3, 4].includes(year)) errors.year = "Choose 1 to 4"; }

  const tshirt = i.tshirt ?? "";
  if (!(TSHIRT_SIZES as readonly string[]).includes(tshirt)) errors.tshirt = "Choose your hoodie size";

  if (Object.keys(errors).length) return { errors };
  return {
    errors,
    data: {
      full_name: fullName, usn, phone, team_id: i.teamId, society: i.society, photo_path: i.photoPath,
      linkedin_url: li.value, instagram_url: ig.value, github_url: gh.value,
      branch: branch || null, year, tshirt_size: tshirt || null,
    },
  };
}
