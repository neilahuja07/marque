import { type ReactNode } from "react";

interface AuthCardProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

export function AuthCard({ children, title, subtitle }: AuthCardProps) {
  return (
    <div className="flex items-center justify-center px-6 py-12 lg:px-16 lg:py-16">
      <div className="w-full max-w-[400px]">
        <h2 className="font-display text-[26px] text-ink">{title}</h2>
        <p className="mt-2 text-[14px] text-slate">{subtitle}</p>
        <div className="mt-8">{children}</div>
      </div>
    </div>
  );
}
