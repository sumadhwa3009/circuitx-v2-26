import "@/styles/loading.css";

export default function Loading() {
  return (
    <div className="sk-wrap" role="status" aria-live="polite" aria-label="Loading">
      <div className="sk sk-card" />
      <div className="sk sk-card" />
      <div className="sk sk-card" />
      <span className="sr">Loading…</span>
    </div>
  );
}
