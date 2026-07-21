"use client";

import { useState, useRef, useEffect, createContext, useContext, type ReactNode } from "react";

const DropdownCloseContext = createContext<(() => void) | null>(null);

interface DropdownProps {
  trigger: ReactNode;
  children: ReactNode;
  align?: "left" | "right";
  className?: string;
}

export function Dropdown({ trigger, children, align = "right", className = "" }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <DropdownCloseContext.Provider value={() => setOpen(false)}>
      <div ref={ref} className={`relative inline-block ${className}`}>
        <div onClick={() => setOpen(!open)}>{trigger}</div>
        {open && (
          <div
            className={`absolute z-50 mt-1.5 min-w-[180px] rounded-[10px] border border-ink/10 bg-white py-1.5 shadow-lg animate-fade-in-up ${
              align === "right" ? "right-0" : "left-0"
            }`}
          >
            {children}
          </div>
        )}
      </div>
    </DropdownCloseContext.Provider>
  );
}

interface DropdownItemProps {
  children: ReactNode;
  onClick?: () => void;
  icon?: ReactNode;
  danger?: boolean;
  className?: string;
}

export function DropdownItem({ children, onClick, icon, danger = false, className = "" }: DropdownItemProps) {
  const close = useContext(DropdownCloseContext);
  return (
    <button
      type="button"
      onClick={() => {
        onClick?.();
        close?.();
      }}
      className={`flex w-full items-center gap-2.5 px-3.5 py-2 text-[13px] font-medium transition-colors ${
        danger
          ? "text-red-600 hover:bg-red-50"
          : "text-ink hover:bg-parchment"
      } ${className}`}
    >
      {icon && <span className="shrink-0 text-ink/40">{icon}</span>}
      {children}
    </button>
  );
}

export function DropdownSeparator() {
  return <div className="my-1.5 border-t border-ink/10" />;
}
