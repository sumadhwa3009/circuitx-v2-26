/**
 * Session rules. Change the numbers here and nothing else.
 *  idleMs : signed out after this long with no activity
 *  maxMs  : hard limit since sign-in, even if the person stays active
 * No imports on purpose: used by the proxy (server) and the browser guard.
 */
export const POLICY = {
  admin: { idleMs: 30 * 60 * 1000, maxMs: 1 * 60 * 60 * 1000 },  // admin dashboard: 30 min idle, 1 h max
  member: { idleMs: 10 * 60 * 1000, maxMs: 30 * 60 * 1000 }, // organisers form: 10 min idle, 30 min max
} as const;

export const policyFor = (isAdmin: boolean) => (isAdmin ? POLICY.admin : POLICY.member);

export const COOKIE_LAST = "cx_last";   // last activity (ms since epoch)
export const COOKIE_START = "cx_start"; // sign-in time (ms since epoch)

export const cookieOpts = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 60 * 60 * 24 * 30,
};
