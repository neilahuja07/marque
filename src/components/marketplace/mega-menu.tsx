"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { allLevels } from "@/lib/dummy-data";

const subjects = ["Science", "Mathematics", "English"] as const;

type Subject = (typeof subjects)[number];

const comingSoonSubjects: ReadonlySet<Subject> = new Set(["Mathematics", "English"]);

interface MegaMenuDesktopProps {
  subject: Subject;
}

function MegaMenuDesktop({ subject }: MegaMenuDesktopProps) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isComingSoon = comingSoonSubjects.has(subject);

  const clearCloseTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    clearCloseTimeout();
    timeoutRef.current = setTimeout(() => setOpen(false), 120);
  }, [clearCloseTimeout]);

  const handleEnter = useCallback(() => {
    clearCloseTimeout();
    setOpen(true);
  }, [clearCloseTimeout]);

  const handleLeave = useCallback(() => {
    scheduleClose();
  }, [scheduleClose]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <button
        className="nav-link flex items-center gap-1"
        aria-expanded={open}
        aria-haspopup="true"
      >
        {subject}
        <svg
          viewBox="0 0 12 12"
          className={`h-2.5 w-2.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2.5 4.5L6 8l3.5-3.5" />
        </svg>
      </button>

      {open && (
        <div
          className="mega-menu-dropdown absolute left-1/2 top-full z-50 mt-0 w-[340px] -translate-x-1/2 rounded-[12px] border border-ink/10 bg-white p-5 shadow-lg"
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          role="menu"
        >
          <p className="text-[12px] font-medium uppercase tracking-wider text-slate">
            {subject} by Grade
          </p>
          {isComingSoon ? (
            <div className="mt-3 rounded-[8px] bg-parchment px-3 py-4 text-center">
              <p className="text-[14px] font-medium text-ink/50">Coming soon!</p>
            </div>
          ) : (
            <div className="mt-3 space-y-0.5">
              {allLevels.map((grade) => (
                <Link
                  key={grade}
                  href={`/browse?subject=${encodeURIComponent(subject)}&grade=${encodeURIComponent(grade)}`}
                  className="block rounded-[8px] px-3 py-2.5 text-[14px] text-ink/80 transition-colors hover:bg-parchment hover:text-ink"
                  role="menuitem"
                  onClick={() => setOpen(false)}
                >
                  {grade}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

interface SubjectAccordionProps {
  subject: Subject;
  onClose: () => void;
}

function SubjectAccordion({ subject, onClose }: SubjectAccordionProps) {
  const [expanded, setExpanded] = useState(false);
  const isComingSoon = comingSoonSubjects.has(subject);

  return (
    <div className="border-b border-ink/5 last:border-0">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between py-3 text-[14px] font-medium text-ink"
        aria-expanded={expanded}
      >
        {subject}
        <svg
          viewBox="0 0 12 12"
          className={`h-3 w-3 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2.5 4.5L6 8l3.5-3.5" />
        </svg>
      </button>
      {expanded && (
        <div className="pb-3 pl-2 space-y-0.5">
          {isComingSoon ? (
            <div className="rounded-[8px] bg-parchment px-3 py-3 text-center">
              <p className="text-[13px] font-medium text-ink/50">Coming soon!</p>
            </div>
          ) : (
            allLevels.map((grade) => (
              <Link
                key={grade}
                href={`/browse?subject=${encodeURIComponent(subject)}&grade=${encodeURIComponent(grade)}`}
                className="block rounded-[8px] px-3 py-2.5 text-[14px] text-ink/70 transition-colors hover:bg-parchment hover:text-ink"
                onClick={onClose}
              >
                {grade}
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}

interface SubjectNavItemProps {
  subject: Subject;
  onClose: () => void;
}

function SubjectNavItem({ subject, onClose }: SubjectNavItemProps) {
  const [expanded, setExpanded] = useState(false);
  const isComingSoon = comingSoonSubjects.has(subject);

  return (
    <div className="border-b border-ink/5 last:border-0">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between py-3 text-[14px] text-ink/80"
        aria-expanded={expanded}
      >
        {subject}
        <svg
          viewBox="0 0 12 12"
          className={`h-3 w-3 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2.5 4.5L6 8l3.5-3.5" />
        </svg>
      </button>
      {expanded && (
        <div className="pb-3 pl-2 space-y-0.5">
          {isComingSoon ? (
            <div className="rounded-[8px] bg-parchment px-3 py-3 text-center">
              <p className="text-[13px] font-medium text-ink/50">Coming soon!</p>
            </div>
          ) : (
            allLevels.map((grade) => (
              <Link
                key={grade}
                href={`/browse?subject=${encodeURIComponent(subject)}&grade=${encodeURIComponent(grade)}`}
                className="block rounded-[8px] px-3 py-2.5 text-[13px] text-ink/60 transition-colors hover:bg-parchment hover:text-ink"
                onClick={onClose}
              >
                {grade}
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export { MegaMenuDesktop, SubjectNavItem, subjects };
export type { Subject };
