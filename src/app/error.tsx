"use client";
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="not-found">
      <h1>Something broke.</h1>
      <p>The page failed to load. Try again, and if it keeps happening, come back in a few minutes.</p>
      <button onClick={reset} className="btn btn-go" style={{ margin: "0 auto" }}><span>Try again</span></button>
    </section>
  );
}
