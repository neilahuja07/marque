"use client";

import Link from "next/link";
import { useAuth } from "@/components/auth-provider";
import { useToast } from "@/components/ui/toast";

export function CTA() {
  const { user } = useAuth();
  const { toast } = useToast();

  const handleClick = (e: React.MouseEvent) => {
    if (user) {
      e.preventDefault();
      toast("Sent! Check your inbox for your free past papers.", "success");
    }
  };

  return (
    <section className="border-t border-ink/10 bg-ink">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 py-16 md:flex-row md:items-center">
        <div>
          <h2 className="font-display text-[28px] text-parchment">
            Ready for your next exam session?
          </h2>
          <p className="mt-2 max-w-md text-[14px] text-parchment/70">
            Create a free account and get two past papers on us.
          </p>
        </div>
        <Link
          href="/register"
          onClick={handleClick}
          className="btn-primary rounded-[8px] bg-sage px-6 py-3 text-[15px] font-medium text-ink"
        >
          Get Free Access
        </Link>
      </div>
    </section>
  );
}
