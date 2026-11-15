import Link from "next/link";
import { XMark } from "@/components/Art";
export default function NotFound() {
  return (
    <section className="not-found">
      <XMark className="x404" />
      <h1>Signal lost.</h1>
      <p>That page doesn&apos;t exist. Head back to the start.</p>
      <Link href="/" className="btn btn-go" style={{ margin: "0 auto" }}><span>Back to home</span></Link>
    </section>
  );
}
