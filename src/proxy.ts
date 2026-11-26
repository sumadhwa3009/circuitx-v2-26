import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";
import { COOKIE_LAST, COOKIE_START, cookieOpts, policyFor } from "@/lib/session-policy";

/**
 * Next 16 "proxy" (formerly middleware).
 * 1) No session on an admin page → back to the admin login.
 * 2) Session too idle or too old → signed out and sent to the login with ?reason=timeout.
 * The real authorisation (admins table + permissions) is still re-checked on the server in every page and action.
 * The matcher is narrow on purpose so public pages never pay for a session lookup.
 */
export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isApi = path.startsWith("/api/");
  const isAdmin = path.startsWith("/admincircuitx") || request.nextUrl.searchParams.get("area") === "admin";
  const isLogin = path === "/admincircuitx" || path === "/admincircuitx/";

  const { response, user, supabase } = await updateSession(request);

  if (!user) {
    if (isApi) return NextResponse.json({ error: "signed-out" }, { status: 401 });
    if (path.startsWith("/admincircuitx") && !isLogin) return NextResponse.redirect(new URL("/admincircuitx", request.url));
    return response;
  }

  const { idleMs, maxMs } = policyFor(isAdmin);
  const now = Date.now();
  const last = Number(request.cookies.get(COOKIE_LAST)?.value) || 0;
  const start = Number(request.cookies.get(COOKIE_START)?.value) || 0;
  const expired = (last > 0 && now - last > idleMs) || (start > 0 && now - start > maxMs);

  if (expired) {
    try { await supabase.auth.signOut({ scope: "local" }); } catch { /* token may already be dead */ }
    const target = isApi
      ? NextResponse.json({ error: "expired" }, { status: 401 })
      : NextResponse.redirect(new URL(`${isAdmin ? "/admincircuitx" : "/join-team"}?reason=timeout`, request.url));
    request.cookies.getAll()
      .filter((c) => c.name.startsWith("sb-") || c.name === COOKIE_LAST || c.name === COOKIE_START)
      .forEach((c) => target.cookies.set(c.name, "", { path: "/", maxAge: 0 }));
    return target;
  }

  response.cookies.set(COOKIE_LAST, String(now), cookieOpts);
  if (!start) response.cookies.set(COOKIE_START, String(now), cookieOpts); // sessions that began before this feature
  return response;
}

export const config = { matcher: ["/admincircuitx/:path*", "/join-team/:path*", "/api/session/:path*"] };
