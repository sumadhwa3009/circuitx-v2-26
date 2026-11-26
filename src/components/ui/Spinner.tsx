import "@/styles/loading.css";

export function Spinner({ size }: { size?: number }) {
  return <span className="spin" aria-hidden="true" style={size ? { width: size, height: size } : undefined} />;
}
