"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { SOCIETIES, TSHIRT_SIZES } from "@/lib/validation/team";
import { Spinner } from "@/components/ui/Spinner";
import { submitTeamForm } from "./actions";

export type Team = { id: string; name: string };
export type Existing = {
  full_name: string; usn: string; phone: string; photo_path: string; team_id: string; society: string | null;
  linkedin_url: string | null; instagram_url: string | null; github_url: string | null;
  branch: string | null; year: number | null; tshirt_size: string | null;
} | null;

async function resizeToJpeg(file: File, max = 800): Promise<Blob> {
  const bmp = await createImageBitmap(file);
  const scale = Math.min(1, max / Math.max(bmp.width, bmp.height));
  const w = Math.round(bmp.width * scale), h = Math.round(bmp.height * scale);
  const c = document.createElement("canvas");
  c.width = w; c.height = h;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, w, h);
  ctx.drawImage(bmp, 0, 0, w, h);
  return new Promise((res, rej) => c.toBlob((b) => (b ? res(b) : rej(new Error("encode"))), "image/jpeg", 0.85));
}

export function TeamForm({ user, teams, existing, photoUrl }: {
  user: { id: string; email: string; name: string }; teams: Team[]; existing: Existing; photoUrl: string | null;
}) {
  const router = useRouter();
  const [v, setV] = useState({
    fullName: existing?.full_name ?? user.name, usn: existing?.usn ?? "", phone: existing?.phone ?? "",
    teamId: existing?.team_id ?? "", society: existing?.society ?? "", linkedin: existing?.linkedin_url ?? "", instagram: existing?.instagram_url ?? "",
    github: existing?.github_url ?? "", branch: existing?.branch ?? "", year: existing?.year ? String(existing.year) : "",
    tshirt: existing?.tshirt_size ?? "", website: "", consent: false,
  });
  const [photo, setPhoto] = useState<Blob | null>(null);
  const [preview, setPreview] = useState<string | null>(photoUrl);
  const [busy, setBusy] = useState(false);
  const [errs, setErrs] = useState<Record<string, string>>({});
  const [fail, setFail] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [proc, setProc] = useState(false);
  const set = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setV((p) => ({ ...p, [k]: e.target.value }));

  async function onPhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setErrs((p) => ({ ...p, photo: "" }));
    if (f.size > 15 * 1024 * 1024) { setErrs((p) => ({ ...p, photo: "That file is too large (max 15 MB)" })); return; }
    setProc(true);
    try {
      const blob = await resizeToJpeg(f);
      setPhoto(blob);
      setPreview(URL.createObjectURL(blob));
    } catch {
      setErrs((p) => ({ ...p, photo: "Could not read that image. Use a JPG or PNG photo." }));
    } finally {
      setProc(false);
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setFail(null); setSaved(false); setErrs({});
    try {
      let photoPath = existing?.photo_path ?? "";
      if (photo) {
        const path = `${user.id}/photo.jpg`;
        const { error } = await createClient().storage.from("team-photos").upload(path, photo, { upsert: true, contentType: "image/jpeg" });
        if (error) throw new Error("Photo upload failed. Please try again.");
        photoPath = path;
      }
      if (!photoPath) { setErrs({ photo: "Upload your photo" }); return; }
      const res = await submitTeamForm({ ...v, photoPath });
      if (res.ok) { setSaved(true); router.refresh(); }
      else { setErrs(res.fieldErrors ?? {}); if (res.error) setFail(res.error); }
    } catch (err) {
      setFail(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally { setBusy(false); }
  }

  const E = ({ k }: { k: string }) => (errs[k] ? <span className="err" role="alert">{errs[k]}</span> : null);

  return (
    <form className="jf" onSubmit={onSubmit} noValidate>
      {existing && <p className="join-note">You have already submitted. You can edit your details until the organisers review them.</p>}
      <div className="jf-row">
        <label>Full name<input value={v.fullName} onChange={set("fullName")} required autoComplete="name" /><E k="fullName" /></label>
        <label>Email <small>from your Google account</small><input value={user.email} readOnly /></label>
      </div>
      <div className="jf-row">
        <label>USN<input value={v.usn} onChange={(e) => setV((p) => ({ ...p, usn: e.target.value.toUpperCase() }))} required placeholder="1BY22EC001" /><E k="usn" /></label>
        <label>Phone number<input value={v.phone} onChange={set("phone")} required inputMode="tel" autoComplete="tel" placeholder="10-digit mobile" /><E k="phone" /></label>
      </div>
      <label>Society
        <select value={v.society} onChange={set("society")} required>
          <option value="">Choose your society</option>
          {SOCIETIES.map((s) => <option key={s}>{s}</option>)}
        </select><E k="society" />
      </label>
      <label>Team
        <select value={v.teamId} onChange={set("teamId")} required>
          <option value="">Choose your team</option>
          {teams.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select><E k="teamId" />
      </label>
      <label>Hoodie size <small>We are ordering hoodies for the team</small>
        <select value={v.tshirt} onChange={set("tshirt")} required>
          <option value="">Select your size</option>
          {TSHIRT_SIZES.map((s) => <option key={s}>{s}</option>)}
        </select><E k="tshirt" />
      </label>
      <label>Your photo <small>A clear, front-facing photo. JPG or PNG; we resize it for you.</small>
        <div className="jf-photo">
          {preview && /* eslint-disable-next-line @next/next/no-img-element */ <img src={preview} alt="Your photo preview" />}
          <input type="file" accept="image/jpeg,image/png,image/webp" onChange={onPhoto} />
          {proc && <span className="jf-proc"><Spinner />Processing photo…</span>}
        </div><E k="photo" />
      </label>

      <p className="opt-h">Optional</p>
      <div className="jf-row">
        <label>LinkedIn<input value={v.linkedin} onChange={set("linkedin")} placeholder="linkedin.com/in/yourname" /><E k="linkedin" /></label>
        <label>Instagram<input value={v.instagram} onChange={set("instagram")} placeholder="instagram.com/yourname" /><E k="instagram" /></label>
      </div>
      <div className="jf-row">
        <label>GitHub<input value={v.github} onChange={set("github")} placeholder="github.com/yourname" /><E k="github" /></label>
        <label>Branch<input value={v.branch} onChange={set("branch")} placeholder="ECE" /><E k="branch" /></label>
      </div>
      <div className="jf-row">
        <label>Year of study
          <select value={v.year} onChange={set("year")}><option value="">Select</option>{[1, 2, 3, 4].map((y) => <option key={y} value={y}>{y}</option>)}</select><E k="year" />
        </label>
      </div>

      <input className="hp" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" value={v.website} onChange={set("website")} />
      <label className="consent">
        <input type="checkbox" checked={v.consent} onChange={(e) => setV((p) => ({ ...p, consent: e.target.checked }))} required />
        <span>I agree that my details may be used to organise CircuitX&apos;26 as described in the <a className="link" href="/privacy" target="_blank">Privacy Policy</a>.</span>
      </label>

      {fail && <p className="jf-fail" role="alert">{fail}</p>}
      {saved && <p className="jf-ok" role="status">Saved. Thank you!</p>}
      <button className="btn btn-go" type="submit" disabled={busy || !v.consent}><span>{busy && <Spinner />}{busy ? "Saving…" : existing ? "Update my details" : "Submit"}</span></button>
    </form>
  );
}
