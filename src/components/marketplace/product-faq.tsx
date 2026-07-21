"use client";

import { useState } from "react";
import type { FAQ } from "@/lib/types";

export function ProductFAQ({ faqs }: { faqs: FAQ[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section>
      <h2 className="font-display text-[22px] text-ink">Frequently asked questions</h2>
      <div className="mt-6 divide-y divide-ink/10 rounded-[var(--radius-card)] border border-ink/10 bg-white">
        {faqs.map((faq, i) => (
          <div key={i}>
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="flex w-full items-center justify-between px-5 py-4 text-left text-[14px] font-medium text-ink transition-colors hover:text-teal-dark"
            >
              {faq.question}
              <svg
                viewBox="0 0 24 24"
                className={`h-4 w-4 shrink-0 text-slate transition-transform duration-200 ${
                  openIndex === i ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            {openIndex === i && (
              <div className="px-5 pb-4 text-[13px] leading-relaxed text-slate">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
