import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

/**
 * Next 16 "proxy" (formerly middleware). First gate only: no session → back to the admin login.
 * The real authorisation (admins table + permissions) is re-checked on the server in the panel layout and every action.
 * The matcher is narrow on purpose so public pages never pay for a session lookup.
 */
export async function proxy(request: NextRequest) {
  const { response, user } = await updateSession(request);
  const path = request.nextUrl.pathname;
  const isLogin = path === "/admincircuitx" || path === "/admincircuitx/";
  if (path.startsWith("/admincircuitx") && !isLogin && !user) {
    return NextResponse.redirect(new URL("/admincircuitx", request.url));
  }
  return response;
}

export const config = { matcher: ["/admincircuitx/:path*", "/join-team/:path*"] };
