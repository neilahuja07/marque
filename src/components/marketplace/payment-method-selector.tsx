"use client";

export type PaymentMethod = "upi" | "credit_card" | "debit_card" | "international_card";

interface PaymentMethodSelectorProps {
  value: PaymentMethod;
  onChange: (method: PaymentMethod) => void;
}

const methods: { id: PaymentMethod; label: string; description: string; icon: React.ReactNode }[] = [
  {
    id: "upi",
    label: "UPI",
    description: "Google Pay, PhonePe, Paytm & more",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M12 12h.01" />
        <path d="M17 12h.01" />
        <path d="M7 12h.01" />
      </svg>
    ),
  },
  {
    id: "credit_card",
    label: "Credit Card",
    description: "Visa, Mastercard, RuPay",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
  },
  {
    id: "debit_card",
    label: "Debit Card",
    description: "All major Indian debit cards",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
  },
  {
    id: "international_card",
    label: "International Cards",
    description: "Mastercard, Visa, Amex",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
];

export function PaymentMethodSelector({ value, onChange }: PaymentMethodSelectorProps) {
  return (
    <div className="space-y-2.5">
      {methods.map((method) => {
        const isSelected = value === method.id;
        return (
          <button
            key={method.id}
            type="button"
            onClick={() => onChange(method.id)}
            className={`flex w-full items-center gap-4 rounded-[10px] border px-5 py-4 text-left transition-all ${
              isSelected
                ? "border-teal-dark/40 bg-teal-dark/[0.03] shadow-[0_0_0_1px_rgba(31,75,67,0.15)]"
                : "border-ink/10 bg-white hover:border-ink/20"
            }`}
          >
            {/* Radio indicator */}
            <span
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-[1.5px] transition-colors ${
                isSelected ? "border-teal-dark" : "border-ink/25"
              }`}
            >
              {isSelected && (
                <span className="h-2.5 w-2.5 rounded-full bg-teal-dark" />
              )}
            </span>

            {/* Icon */}
            <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] transition-colors ${
              isSelected ? "bg-teal-dark/10 text-teal-dark" : "bg-parchment text-ink/40"
            }`}>
              {method.icon}
            </span>

            {/* Text */}
            <div className="min-w-0 flex-1">
              <p className={`text-[14px] font-medium ${isSelected ? "text-ink" : "text-ink/80"}`}>
                {method.label}
              </p>
              <p className="mt-0.5 text-[12px] text-slate">{method.description}</p>
            </div>

            {/* Checkmark */}
            {isSelected && (
              <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-teal-dark" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </button>
        );
      })}
    </div>
  );
}
