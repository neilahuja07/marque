"use client";

import { useState, useCallback, createContext, useContext, type ReactNode } from "react";

type ToastVariant = "default" | "success" | "error";

interface Toast {
  id: string;
  message: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  toast: (message: string, variant?: ToastVariant) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

function useToastContext() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((message: string, variant: ToastVariant = "default") => {
    const id = Math.random().toString(36).slice(2, 9);
    setToasts((prev) => [...prev, { id, message, variant }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[100] flex flex-col items-center gap-2 px-4 pb-6 sm:items-end">
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastItem({ toast }: { toast: Toast }) {
  const variantStyles: Record<ToastVariant, string> = {
    default: "border-ink/10 bg-white text-ink",
    success: "border-sage/30 bg-sage/10 text-teal-dark",
    error: "border-red-200 bg-red-50 text-red-600",
  };

  const iconMap: Record<ToastVariant, ReactNode> = {
    default: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 text-slate" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    ),
    success: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 text-teal-dark" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    error: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
        <line x1="9" y1="9" x2="15" y2="15" />
      </svg>
    ),
  };

  return (
    <div
      className={`pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-[10px] border px-4 py-3 shadow-lg animate-fade-in-up ${variantStyles[toast.variant]}`}
    >
      <span className="shrink-0">{iconMap[toast.variant]}</span>
      <p className="flex-1 text-[13px] font-medium">{toast.message}</p>
    </div>
  );
}

export function useToast() {
  return useToastContext();
}
