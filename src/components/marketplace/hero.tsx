"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { WorksheetCarousel } from "./worksheet-carousel";

const HERO_BIO =
  "High-quality, specially curated Cambridge practice material designed to give students focused practice across their grade-level syllabus.";

function HeroBio() {
  return (
    <p className="mt-5 max-w-md text-[16px] leading-relaxed text-slate">
      {HERO_BIO}
    </p>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const paused = !inView ? "hero-paused" : "";

  return (
    <section ref={sectionRef} className="border-b border-ink/10">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-24 md:grid-cols-2 md:items-center md:py-32">
        <div className="relative overflow-hidden">
          {/* Decorative background exam codes — purely cosmetic */}
          <div
            className={`pointer-events-none absolute inset-0 select-none overflow-hidden ${paused}`}
            aria-hidden="true"
          >
            <span className="hero-code-drift absolute -left-8 -top-6 text-[120px] font-mono font-bold leading-none text-ink/[0.02] md:text-[160px]">
              0580/22
            </span>
            <span className="hero-code-drift-reverse hero-code-pulse absolute bottom-4 right-4 text-[120px] font-mono font-bold leading-none text-ink/[0.02] md:text-[160px]">
              9709/13
            </span>
            <span className="hero-code-drift absolute -bottom-8 left-8 text-[120px] font-mono font-bold leading-none text-ink/[0.02] md:text-[160px]">
              0625/41
            </span>
          </div>

          <div className="relative">
            <h1 className="font-display text-[40px] leading-[1.1] text-ink md:text-[56px]">
              Study material built around the syllabus, not the{" "}
              <span className="text-brass">guess.</span>
            </h1>
            <HeroBio />
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/browse"
                className="btn-primary rounded-[8px] bg-teal-dark px-6 py-3 text-[15px] font-medium text-white"
              >
                Browse resources
              </Link>
              <Link
                href="/login"
                className="btn-outline rounded-[8px] border border-ink/25 bg-transparent px-6 py-3 text-[15px] font-medium text-ink hover:bg-ink/5"
              >
                Sign in
              </Link>
            </div>
            <ul className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-2 border-l-2 border-brass/30 pl-5 text-[13px] text-slate">
              <li className="flex items-center gap-2">
                <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0 text-brass" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3.5 8.5l3 3 6-6" />
                </svg>
                Examiner-checked mark schemes
              </li>
              <li className="flex items-center gap-2">
                <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0 text-brass" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3.5 8.5l3 3 6-6" />
                </svg>
                Instant digital download
              </li>
              <li className="flex items-center gap-2">
                <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0 text-brass" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3.5 8.5l3 3 6-6" />
                </svg>
                Updated every session
              </li>
            </ul>
          </div>
        </div>

        <div className="animate-fade-in-up flex items-center justify-center">
          <WorksheetCarousel />
        </div>
      </div>
    </section>
  );
}
