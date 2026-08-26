"use client";

import { useState } from "react";
import { resolveThumbnailUrl, resolvePreviewUrl } from "@/lib/supabase/products";

interface ProductGalleryProps {
  cover: string;
  title: string;
  type: string;
  thumbnail?: string;
  previewImages?: string[];
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

export function ProductGallery({ cover, title, type, thumbnail, previewImages }: ProductGalleryProps) {
  const [active, setActive] = useState(0);

  // Build the image list: up to 4 preview images, falling back to the single thumbnail.
  const resolvedThumbnail = thumbnail ? resolveThumbnailUrl(thumbnail) : null;

  let images: { url: string; label: string }[] = [];
  const previews = (previewImages || []).filter((p) => typeof p === "string" && p.length > 0).slice(0, 4);
  if (previews.length > 0) {
    images = previews.map((p, i) => ({ url: resolvePreviewUrl(p) || p, label: `Image ${i + 1}` }));
  } else if (resolvedThumbnail) {
    images = [{ url: resolvedThumbnail, label: "Preview" }];
  }

  const hasGallery = images.length > 1;
  const activeUrl = images[active]?.url;

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div className={`relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[var(--radius-card)] bg-gradient-to-br ${cover} border border-ink/10`}>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(255,255,255,0.18),transparent_55%)]" />
        {activeUrl ? (
          <img
            src={activeUrl}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover"
            loading={active === 0 ? "eager" : "lazy"}
          />
        ) : (
          <div className="relative flex flex-col items-center gap-4 text-white">
            <svg viewBox="0 0 24 24" className="h-20 w-20 text-white/30" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              {typeIcon[type] || typeIcon["Past Paper"]}
            </svg>
            <span className="rounded-full bg-white/15 px-3 py-1 text-[11px] font-medium backdrop-blur-sm">
              Preview
            </span>
          </div>
        )}
        <span className="absolute left-4 top-4 rounded-[4px] bg-white/95 px-2.5 py-1 text-[11px] font-medium text-ink">
          {type}
        </span>
      </div>

      {/* Thumbnails (only when more than one image exists) */}
      {hasGallery && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={img.label}
              className={`relative h-16 w-20 shrink-0 overflow-hidden rounded-[8px] border-2 transition-all duration-200 ${
                i === active
                  ? "border-teal-dark"
                  : "border-ink/10 opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={img.url}
                alt={img.label}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
