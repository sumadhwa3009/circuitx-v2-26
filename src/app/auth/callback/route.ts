import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { COOKIE_LAST, COOKIE_START, cookieOpts } from "@/lib/session-policy";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const raw = searchParams.get("next") ?? "/";
  const next = raw.startsWith("/") && !raw.startsWith("//") ? raw : "/"; // no open redirects
  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const res = NextResponse.redirect(`${origin}${next}`);
      const now = String(Date.now());
      res.cookies.set(COOKIE_START, now, cookieOpts); // start of this sign-in
      res.cookies.set(COOKIE_LAST, now, cookieOpts);
      return res;
    }
  }
  return NextResponse.redirect(`${origin}/admincircuitx?error=auth`);
}
