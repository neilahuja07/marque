import type { Metadata } from "next";
import Link from "next/link";
import { Navbar, Footer } from "@/components/marketplace";

export const metadata: Metadata = {
  title: "Page Not Found — Scholar Stack",
  description: "The page you're looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-1">
        <div className="mx-auto max-w-2xl px-6 py-20 text-center">
          <p className="font-mono text-[64px] font-light text-ink/10">404</p>
          <h1 className="mt-2 font-display text-[28px] text-ink">Page not found</h1>
          <p className="mt-3 text-[15px] leading-relaxed text-slate">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="btn-primary rounded-[8px] bg-teal-dark px-6 py-3 text-[14px] font-medium text-white"
            >
              Back to homepage
            </Link>
            <Link
              href="/browse"
              className="btn-outline rounded-[8px] border border-ink/15 px-6 py-3 text-[14px] font-medium text-ink"
            >
              Browse resources
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
