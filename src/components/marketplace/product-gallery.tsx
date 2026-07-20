"use client";

import { useState } from "react";

interface ProductGalleryProps {
  cover: string;
  title: string;
  type: string;
}

const typeIcon: Record<string, React.ReactNode> = {
  "Past Paper": (
    <path d="M6 2h9l3 3v17H6V2z M15 2v3h3M9 12h6M9 15h6M9 9h3" />
  ),
  "Mock Test": (
    <path d="M4 4h16v16H4V4z M8 9l2 2 4-4 M8 16h8" />
  ),
  Worksheet: (
    <path d="M4 4h16v16H4V4z M8 8h8 M8 12h8 M8 16h5" />
  ),
  "Revision Notes": (
    <path d="M5 3h11l3 3v15H5V3z M9 9h7 M9 13h7 M9 17h4" />
  ),
};

export function ProductGallery({ cover, title, type }: ProductGalleryProps) {
  const [active, setActive] = useState(0);

  const thumbnails = [
    { label: "Cover", gradient: cover },
    { label: "Page 1", gradient: "from-ink/80 to-teal-dark/80" },
    { label: "Page 2", gradient: "from-teal-dark/80 to-sage/80" },
    { label: "Page 3", gradient: "from-sage/80 to-brass/80" },
  ];

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div className={`relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[var(--radius-card)] bg-gradient-to-br ${thumbnails[active].gradient} border border-ink/10`}>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(255,255,255,0.18),transparent_55%)]" />
        <div className="relative flex flex-col items-center gap-4 text-white">
          <svg viewBox="0 0 24 24" className="h-20 w-20 text-white/30" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            {typeIcon[type] || typeIcon["Past Paper"]}
          </svg>
          <span className="rounded-full bg-white/15 px-3 py-1 text-[11px] font-medium backdrop-blur-sm">
            Preview
          </span>
        </div>
        <span className="absolute left-4 top-4 rounded-[4px] bg-white/95 px-2.5 py-1 text-[11px] font-medium text-ink">
          {type}
        </span>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {thumbnails.map((thumb, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`relative h-16 w-20 overflow-hidden rounded-[8px] border-2 transition-all duration-200 ${
              i === active
                ? "border-teal-dark"
                : "border-ink/10 opacity-60 hover:opacity-100"
            }`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${thumb.gradient}`} />
            <span className="absolute bottom-1 left-1.5 text-[9px] font-medium text-white/80">
              {thumb.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
