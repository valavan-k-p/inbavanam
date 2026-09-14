import Link from "next/link";
import { LineArt } from "@/components/illustrations/line-art";

export default function NotFound() {
  return (
    <main id="main" className="surface-maroon grain flex min-h-dvh items-center">
      <div className="container-page flex flex-col items-start gap-8 py-24">
        <LineArt name="path" className="size-24 text-cream" />
        <p className="label text-muted-foreground">Page not found</p>
        <h1 className="max-w-[16ch] text-h1">This path does not lead anywhere yet.</h1>
        <Link
          href="/"
          className="inline-flex min-h-12 items-center bg-ivory px-6 label text-maroon"
        >
          Return to Inbavanam
        </Link>
      </div>
    </main>
  );
}
