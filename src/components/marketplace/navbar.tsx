"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Browse", href: "/browse" },
  { label: "Categories", href: "/categories" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b border-ink/10 bg-parchment/90 backdrop-blur transition-shadow duration-300 ${
        scrolled ? "nav-scrolled" : ""
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-baseline gap-1.5">
          <span className="font-display text-[22px] font-medium text-ink">Marque</span>
          <span className="exam-code hidden text-[11px] text-slate sm:inline">
            CIE · IGCSE · A Level
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex text-[14px] text-ink/80">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/cart"
            className="relative rounded-[8px] border border-ink/15 p-2.5 transition-all duration-200 hover:border-ink/30 hover:shadow-sm"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4.5 w-4.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <path
                d="M3 4h2l2.4 12.4a2 2 0 0 0 2 1.6h7.2a2 2 0 0 0 2-1.6L21 8H6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="9.5" cy="20.5" r="1.2" />
              <circle cx="17.5" cy="20.5" r="1.2" />
            </svg>
            <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-teal-dark text-[10px] text-white">
              2
            </span>
          </Link>

          <button
            className="flex items-center justify-center rounded-[8px] border border-ink/15 p-2.5 transition-all duration-200 hover:border-ink/30 md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4.5 w-4.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              {mobileOpen ? (
                <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-ink/10 bg-parchment px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-1 text-[14px] text-ink/80">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link py-2.5"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
