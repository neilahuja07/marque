"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  description?: string;
  maxWidth?: string;
}

export function Modal({
  isOpen,
  onClose,
  children,
  title,
  description,
  maxWidth = "max-w-[480px]",
}: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen || !contentRef.current) return;
    contentRef.current.focus();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center px-4">
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Content */}
      <div
        ref={contentRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`relative w-full rounded-[16px] border border-ink/10 bg-white p-6 shadow-xl focus:outline-none ${maxWidth}`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-[6px] text-ink/40 transition-colors hover:bg-parchment hover:text-ink"
          aria-label="Close dialog"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Header */}
        {title && (
          <div className="mb-4 pr-8">
            <h2 className="font-display text-[18px] text-ink">{title}</h2>
            {description && (
              <p className="mt-1 text-[13px] text-slate">{description}</p>
            )}
          </div>
        )}

        {/* Body */}
        {children}
      </div>
    </div>
  );
}
