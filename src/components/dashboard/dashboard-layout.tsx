"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface SidebarItem {
  label: string;
  href: string;
  icon: ReactNode;
}

interface DashboardLayoutProps {
  children: ReactNode;
  sidebarItems: SidebarItem[];
  header?: ReactNode;
}

export function DashboardLayout({ children, sidebarItems, header }: DashboardLayoutProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-parchment">
      {/* Desktop sidebar */}
      <aside
        className={`hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:left-0 lg:z-30 lg:border-r lg:border-ink/10 lg:bg-white lg:transition-all lg:duration-300 ${
          collapsed ? "lg:w-[72px]" : "lg:w-[260px]"
        }`}
      >
        {/* Logo */}
        <div className={`flex h-16 items-center border-b border-ink/10 ${collapsed ? "justify-center px-3" : "px-6"}`}>
          <Link href="/" className="font-display text-[20px] font-semibold tracking-tight text-ink">
            {collapsed ? "M" : "Marque"}
          </Link>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <div className="space-y-1">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-[8px] px-3 py-2.5 text-[13px] font-medium transition-colors ${
                    isActive
                      ? "bg-teal-dark/10 text-teal-dark"
                      : "text-slate hover:bg-parchment hover:text-ink"
                  } ${collapsed ? "justify-center" : ""}`}
                  title={collapsed ? item.label : undefined}
                >
                  <span className="shrink-0">{item.icon}</span>
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Collapse toggle */}
        <div className="border-t border-ink/10 px-3 py-3">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex w-full items-center justify-center rounded-[8px] py-2 text-ink/40 transition-colors hover:bg-parchment hover:text-ink"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <svg
              viewBox="0 0 24 24"
              className={`h-4 w-4 transition-transform ${collapsed ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="11 17 6 12 11 7" />
              <polyline points="18 17 13 12 18 7" />
            </svg>
          </button>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-ink/30 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col bg-white">
            <div className="flex h-16 items-center justify-between border-b border-ink/10 px-6">
              <Link href="/" className="font-display text-[20px] font-semibold tracking-tight text-ink">
                Marque
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-[6px] text-ink/40 hover:text-ink"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-3 py-4">
              <div className="space-y-1">
                {sidebarItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 rounded-[8px] px-3 py-2.5 text-[13px] font-medium transition-colors ${
                        isActive
                          ? "bg-teal-dark/10 text-teal-dark"
                          : "text-slate hover:bg-parchment hover:text-ink"
                      }`}
                    >
                      <span className="shrink-0">{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </nav>
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className={`flex flex-1 flex-col transition-all duration-300 ${collapsed ? "lg:pl-[72px]" : "lg:pl-[260px]"}`}>
        {/* Mobile header */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-ink/10 bg-white px-4 lg:hidden">
          <button
            onClick={() => setMobileOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-[8px] text-ink"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <Link href="/" className="font-display text-[18px] font-semibold tracking-tight text-ink">
            Marque
          </Link>
        </header>

        {/* Desktop header */}
        {header && (
          <header className="hidden border-b border-ink/10 bg-white lg:block">
            {header}
          </header>
        )}

        {/* Page content */}
        <main id="main-content" className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
