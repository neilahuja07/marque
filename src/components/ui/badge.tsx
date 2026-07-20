import { type ReactNode } from "react";

type BadgeVariant = "default" | "success" | "warning" | "error" | "info";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "border-ink/10 bg-parchment text-slate",
  success: "border-sage/30 bg-sage/10 text-teal-dark",
  warning: "border-brass/30 bg-brass/10 text-brass",
  error: "border-red-200 bg-red-50 text-red-600",
  info: "border-teal/30 bg-teal/10 text-teal-dark",
};

export function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
