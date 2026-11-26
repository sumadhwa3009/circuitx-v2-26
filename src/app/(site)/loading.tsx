import { Spinner } from "@/components/ui/Spinner";

export default function Loading() {
  return (
    <div className="pg-loading pg-full" role="status" aria-live="polite">
      <Spinner />
      <span>Loading</span>
    </div>
  );
}
