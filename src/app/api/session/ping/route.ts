// Keeps a signed-in, active person's session alive. The proxy does the work (it refreshes the activity cookie
// or answers 401 if the session is gone); this handler only has to exist.
export async function POST() {
  return new Response(null, { status: 204, headers: { "Cache-Control": "no-store" } });
}
