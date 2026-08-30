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
  const [mainImgError, setMainImgError] = useState(false);
  const [thumbErrors, setThumbErrors] = useState<Record<number, boolean>>({});

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
  const showMainImage = activeUrl && !mainImgError;

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div className="relative flex min-h-[300px] items-center justify-center overflow-hidden rounded-[var(--radius-card)] bg-parchment border border-ink/10 shadow-sm">
        {showMainImage ? (
          <img
            src={activeUrl}
            alt={title}
            className="relative max-h-[520px] w-auto max-w-full object-contain p-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
            loading={active === 0 ? "eager" : "lazy"}
            onError={() => setMainImgError(true)}
          />
        ) : (
          <div className="relative flex flex-col items-center gap-4 text-ink/20">
            <svg viewBox="0 0 24 24" className="h-20 w-20" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              {typeIcon[type] || typeIcon["Past Paper"]}
            </svg>
            <span className="rounded-full bg-ink/5 px-3 py-1 text-[11px] font-medium text-ink/40">
              Preview
            </span>
          </div>
        )}
        <span className="absolute left-4 top-4 rounded-[4px] bg-white/95 px-2.5 py-1 text-[11px] font-medium text-ink shadow-sm border border-ink/5">
          {type}
        </span>
      </div>

      {/* Thumbnails (only when more than one image exists) */}
      {hasGallery && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => { setActive(i); setMainImgError(false); }}
              aria-label={img.label}
              className={`relative h-16 w-20 shrink-0 overflow-hidden rounded-[8px] border-2 bg-parchment transition-all duration-200 ${
                i === active
                  ? "border-teal-dark"
                  : "border-ink/10 opacity-60 hover:opacity-100"
              }`}
            >
              {thumbErrors[i] ? (
                <div className="flex h-full w-full items-center justify-center text-ink/20">
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
                    {typeIcon[type] || typeIcon["Past Paper"]}
                  </svg>
                </div>
              ) : (
                <img
                  src={img.url}
                  alt={img.label}
                  className="absolute inset-0 h-full w-full object-contain"
                  loading="lazy"
                  onError={() => setThumbErrors((prev) => ({ ...prev, [i]: true }))}
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
