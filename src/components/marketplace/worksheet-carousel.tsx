"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type CSSVars = React.CSSProperties & { [key: `--${string}`]: string | number };

const WORKSHEETS = [
  {
    src: "/assets/hero-worksheets/worksheet-1.png",
    alt: "Mathematics worksheet preview 1",
  },
  {
    src: "/assets/hero-worksheets/worksheet-2.png",
    alt: "Mathematics worksheet preview 2",
  },
  {
    src: "/assets/hero-worksheets/worksheet-3.png",
    alt: "Mathematics worksheet preview 3",
  },
  {
    src: "/assets/hero-worksheets/worksheet-4.png",
    alt: "Mathematics worksheet preview 4",
  },
  {
    src: "/assets/hero-worksheets/worksheet-5.jpg",
    alt: "Mathematics worksheet preview 5",
  },
];

const AUTOPLAY_MS = 4500;
const TOTAL = WORKSHEETS.length;

function ArrowButton({
  direction,
  onClick,
  label,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="group/arrow flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink/10 bg-white text-ink/55 shadow-[0_2px_10px_-2px_rgba(18,24,27,0.18)] transition-all duration-200 hover:border-teal-dark hover:text-teal-dark hover:shadow-[0_6px_16px_-6px_rgba(31,75,67,0.35)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-dark active:scale-95"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5 transition-transform duration-200 group-hover/arrow:-translate-x-px"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {direction === "prev" ? (
          <polyline points="15 18 9 12 15 6" />
        ) : (
          <polyline points="9 6 15 12 9 18" />
        )}
      </svg>
    </button>
  );
}

export function WorksheetCarousel() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    if (hovered || reducedMotion) return;
    const id = window.setInterval(() => {
      setActive((a) => (a + 1) % TOTAL);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [hovered, reducedMotion, resetKey]);

  const prevIndex = (active - 1 + TOTAL) % TOTAL;
  const nextIndex = (active + 1) % TOTAL;

  // `manual` resets the autoplay timer so a transition started by the user
  // gets a full 4s before the next automatic advance.
  const go = (index: number, manual = false) => {
    setActive(((index % TOTAL) + TOTAL) % TOTAL);
    if (manual) setResetKey((k) => k + 1);
  };
  const goPrev = () => go(active - 1, true);
  const goNext = () => go(active + 1, true);

  const num = String(active + 1).padStart(2, "0");
  const total = String(TOTAL).padStart(2, "0");

  return (
    <div
      className="mx-auto w-full max-w-[500px] select-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={() => setHovered(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Latest worksheets"
    >
      {/* Preview stage — fixed height so the worksheet never drives layout */}
      <div className="group relative h-[400px] sm:h-[430px] md:h-[520px]">
        {/* Previous worksheet peeking (desktop) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-1/2 z-10 hidden -translate-y-1/2 rotate-[-2.5deg] md:block"
        >
          <div className="relative overflow-hidden rounded-[8px] bg-white shadow-[0_10px_24px_-12px_rgba(18,24,27,0.25)] ring-1 ring-ink/5">
            <img
              src={WORKSHEETS[prevIndex].src}
              alt=""
              draggable={false}
              className="block max-h-[270px] w-auto opacity-85 transition-all duration-500"
            />
          </div>
        </div>

        {/* Next worksheet peeking (desktop) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 rotate-[2.5deg] md:block"
        >
          <div className="relative overflow-hidden rounded-[8px] bg-white shadow-[0_10px_24px_-12px_rgba(18,24,27,0.25)] ring-1 ring-ink/5">
            <img
              src={WORKSHEETS[nextIndex].src}
              alt=""
              draggable={false}
              className="block max-h-[270px] w-auto opacity-85 transition-all duration-500"
            />
          </div>
        </div>

        {/* Center page — pushes to the left/right so the peeks can be seen */}
        <div className="pointer-events-auto absolute inset-0 z-20 flex items-center justify-center">
          <div
            className={cn(
              "relative transition-transform duration-300 ease-out",
              !reducedMotion && "group-hover:scale-[1.025]",
            )}
          >
            <div className="relative w-[280px] overflow-hidden rounded-[10px] bg-white shadow-[0_18px_44px_-18px_rgba(18,24,27,0.32)] ring-1 ring-ink/5 transition-shadow duration-300 group-hover:shadow-[0_26px_60px_-20px_rgba(31,75,67,0.4)] sm:w-[300px] md:w-[340px]">
              {/* Sliding track of pages */}
              <div
                className="ws-track flex items-center"
                style={{ "--ws-active": active } as CSSVars}
              >
                {WORKSHEETS.map((img, i) => (
                  <div
                    key={img.src}
                    className="flex h-[360px] w-[280px] flex-shrink-0 items-center justify-center sm:h-[390px] sm:w-[300px] md:h-[470px] md:w-[340px]"
                  >
                    <img
                      src={img.src}
                      alt={i === active ? img.alt : ""}
                      draggable={false}
                      className="h-full w-full object-contain"
                    />
                  </div>
                ))}
              </div>

              {/* Hover indicator */}
              <div
                aria-hidden="true"
                className={cn(
                  "pointer-events-none absolute inset-x-0 bottom-3 flex justify-center transition-opacity duration-200",
                  !reducedMotion && "opacity-0 group-hover:opacity-100",
                  reducedMotion && "hidden",
                )}
              >
                <span className="rounded-full bg-ink/70 px-3 py-1 text-[11px] font-medium tracking-wide text-white backdrop-blur-sm">
                  Preview
                </span>
              </div>
            </div>
          </div>

          {/* Left navigation — vertically centered on the main page */}
          <div className="absolute left-0 top-1/2 z-30 -translate-y-1/2">
            <ArrowButton direction="prev" onClick={goPrev} label="Previous worksheet" />
          </div>

          {/* Right navigation */}
          <div className="absolute right-0 top-1/2 z-30 -translate-y-1/2">
            <ArrowButton direction="next" onClick={goNext} label="Next worksheet" />
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-center gap-3">
        <p className="font-mono text-[13px] tracking-[0.18em] text-ink/70">
          <span className="text-teal-dark">{num}</span>
          <span className="mx-1 text-ink/25">/</span>
          <span>{total}</span>
        </p>
        <span className="h-px w-6 bg-ink/10" aria-hidden="true" />
        <div className="flex items-center gap-1.5">
          {WORKSHEETS.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => go(i, true)}
              aria-label={`Go to worksheet ${i + 1}`}
              aria-current={i === active}
              className="flex h-8 min-w-8 items-center justify-center rounded-full px-1.5 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-dark"
            >
              <span
                aria-hidden="true"
                className={cn(
                  "block h-1.5 rounded-full transition-all duration-300",
                  i === active ? "w-5 bg-teal-dark" : "w-1.5 bg-ink/20 hover:bg-ink/40",
                )}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
