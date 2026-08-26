import Link from "next/link";

const trustPoints = [
  "Instant digital downloads",
  "Cambridge-aligned resources",
  "Trusted by thousands of students",
];

export function AuthBranding() {
  return (
    <div className="relative flex flex-col justify-between overflow-hidden bg-teal-dark px-10 py-12 text-white lg:px-16 lg:py-16">
      {/* Subtle grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Abstract decorative shapes */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/[0.04]" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-white/[0.03]" />
      <div className="pointer-events-none absolute right-1/4 bottom-1/3 h-3 w-3 rounded-full bg-white/20" />
      <div className="pointer-events-none absolute left-1/3 top-1/4 h-2 w-2 rounded-full bg-white/15" />
      <div className="pointer-events-none absolute right-1/3 top-1/2 h-4 w-4 rounded-full bg-white/10" />

      <div className="relative">
        {/* Logo */}
        <Link href="/" className="inline-block">
          <span className="font-display text-[26px] font-semibold tracking-tight">
            Scholar Stack
          </span>
        </Link>
      </div>

      <div className="relative mt-12">
        <h1 className="font-display text-[32px] leading-[1.15] font-light lg:text-[38px]">
          Learn with
          <br />
          <span className="font-medium">confidence.</span>
        </h1>
        <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-white/60">
          Access premium Grade 4–8 study resources — curated by examiners, designed for results.
        </p>

        {/* Trust points */}
        <div className="mt-8 space-y-3">
          {trustPoints.map((point) => (
            <div key={point} className="flex items-center gap-3 text-[14px] text-white/70">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-white/80" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              {point}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom abstract illustration */}
      <div className="relative mt-12 hidden lg:block">
        <div className="flex items-end gap-3">
          <div className="h-20 w-12 rounded-t-[6px] bg-white/[0.06]" />
          <div className="h-28 w-12 rounded-t-[6px] bg-white/[0.08]" />
          <div className="h-16 w-12 rounded-t-[6px] bg-white/[0.05]" />
          <div className="h-24 w-12 rounded-t-[6px] bg-white/[0.07]" />
          <div className="h-12 w-12 rounded-t-[6px] bg-white/[0.04]" />
        </div>
        <div className="mt-3 h-px w-full bg-white/10" />
      </div>
    </div>
  );
}
