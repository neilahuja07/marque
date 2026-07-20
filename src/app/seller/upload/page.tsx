"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { FadeIn } from "@/components/ui/fade-in";
import { DashboardSectionHeader } from "@/components/dashboard/dashboard-sub-page";
import { sellerSidebarItems } from "@/lib/seller-sidebar";

const steps = [
  { num: 1, label: "Basic Information" },
  { num: 2, label: "Upload PDF" },
  { num: 3, label: "Pricing" },
  { num: 4, label: "Preview" },
  { num: 5, label: "Publish" },
];

const subjects = ["Mathematics", "Science", "English"];
const levels = ["IGCSE", "O Level", "A Level"];
const types = ["Past Paper", "Mock Test", "Worksheet", "Revision Notes"];

interface FormData {
  title: string;
  subject: string;
  level: string;
  type: string;
  description: string;
  tags: string;
  price: string;
  originalPrice: string;
}

const initial: FormData = {
  title: "",
  subject: "",
  level: "",
  type: "",
  description: "",
  tags: "",
  price: "",
  originalPrice: "",
};

export default function SellerUploadPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(initial);

  const update = (field: keyof FormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const canNext = () => {
    if (step === 1) return form.title && form.subject && form.level && form.type;
    if (step === 3) return form.price !== "";
    return true;
  };

  return (
    <DashboardLayout
      sidebarItems={sellerSidebarItems}
      header={
        <div className="mx-auto max-w-7xl px-6 py-4">
          <DashboardSectionHeader title="Upload resource" />
        </div>
      }
    >
      <div className="mx-auto max-w-3xl space-y-8">
        {/* Step Indicator */}
        <FadeIn>
          <div className="flex items-center justify-between">
            {steps.map((s, i) => (
              <div key={s.num} className="flex items-center flex-1 last:flex-none">
                <button
                  onClick={() => s.num < step && setStep(s.num)}
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[13px] font-medium transition-colors ${
                    step > s.num
                      ? "bg-teal-dark text-white"
                      : step === s.num
                        ? "bg-teal-dark/15 text-teal-dark border-2 border-teal-dark"
                        : "border border-ink/15 text-ink/40"
                  } ${s.num < step ? "cursor-pointer" : ""}`}
                >
                  {step > s.num ? (
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    s.num
                  )}
                </button>
                <span className={`ml-2 hidden text-[12px] font-medium sm:inline ${step === s.num ? "text-ink" : "text-ink/40"}`}>
                  {s.label}
                </span>
                {i < steps.length - 1 && (
                  <div className={`mx-3 h-px flex-1 ${step > s.num ? "bg-teal-dark" : "bg-ink/10"}`} />
                )}
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Step Content */}
        <FadeIn delay={40}>
          <div className="rounded-[12px] border border-ink/10 bg-white p-6 sm:p-8">
            {/* Step 1: Basic Information */}
            {step === 1 && (
              <div className="space-y-5">
                <div>
                  <label className="block text-[13px] font-medium text-ink/70">Title</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => update("title", e.target.value)}
                    placeholder="e.g. IGCSE Mathematics Paper 4 — Worked Solutions"
                    className="input-field mt-1.5 w-full rounded-[8px] border border-ink/10 bg-white py-2.5 px-3.5 text-[13px] text-ink placeholder:text-ink/40"
                  />
                </div>
                <div className="grid gap-5 sm:grid-cols-3">
                  <div>
                    <label className="block text-[13px] font-medium text-ink/70">Subject</label>
                    <select
                      value={form.subject}
                      onChange={(e) => update("subject", e.target.value)}
                      className="input-field mt-1.5 w-full appearance-none rounded-[8px] border border-ink/10 bg-white py-2.5 px-3.5 text-[13px] text-ink"
                    >
                      <option value="">Select…</option>
                      {subjects.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[13px] font-medium text-ink/70">Level</label>
                    <select
                      value={form.level}
                      onChange={(e) => update("level", e.target.value)}
                      className="input-field mt-1.5 w-full appearance-none rounded-[8px] border border-ink/10 bg-white py-2.5 px-3.5 text-[13px] text-ink"
                    >
                      <option value="">Select…</option>
                      {levels.map((l) => (
                        <option key={l} value={l}>{l}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[13px] font-medium text-ink/70">Type</label>
                    <select
                      value={form.type}
                      onChange={(e) => update("type", e.target.value)}
                      className="input-field mt-1.5 w-full appearance-none rounded-[8px] border border-ink/10 bg-white py-2.5 px-3.5 text-[13px] text-ink"
                    >
                      <option value="">Select…</option>
                      {types.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-ink/70">Description</label>
                  <textarea
                    rows={4}
                    value={form.description}
                    onChange={(e) => update("description", e.target.value)}
                    placeholder="Describe what students will learn…"
                    className="input-field mt-1.5 w-full resize-none rounded-[8px] border border-ink/10 bg-white py-2.5 px-3.5 text-[13px] text-ink placeholder:text-ink/40"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-ink/70">Tags</label>
                  <input
                    type="text"
                    value={form.tags}
                    onChange={(e) => update("tags", e.target.value)}
                    placeholder="algebra, paper 4, extended (comma separated)"
                    className="input-field mt-1.5 w-full rounded-[8px] border border-ink/10 bg-white py-2.5 px-3.5 text-[13px] text-ink placeholder:text-ink/40"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Upload PDF */}
            {step === 2 && (
              <div className="space-y-5">
                <div className="flex flex-col items-center justify-center rounded-[10px] border-2 border-dashed border-ink/15 bg-parchment/30 py-16 px-6 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-parchment text-ink/25">
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                  </div>
                  <p className="mt-4 text-[14px] font-medium text-ink">Click to upload or drag and drop</p>
                  <p className="mt-1 text-[12px] text-slate">PDF files only, up to 50MB</p>
                  <button className="btn-primary mt-5 rounded-[8px] bg-teal-dark px-5 py-2.5 text-[13px] font-medium text-white">
                    Choose file
                  </button>
                </div>
                <p className="text-[12px] text-slate text-center">
                  Your PDF will be watermarked with buyer information for piracy protection.
                </p>
              </div>
            )}

            {/* Step 3: Pricing */}
            {step === 3 && (
              <div className="space-y-5 max-w-sm">
                <div>
                  <label className="block text-[13px] font-medium text-ink/70">Price</label>
                  <div className="relative mt-1.5">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[13px] text-ink/40">$</span>
                    <input
                      type="number"
                      step="0.5"
                      min="0"
                      value={form.price}
                      onChange={(e) => update("price", e.target.value)}
                      placeholder="0.00"
                      className="input-field w-full rounded-[8px] border border-ink/10 bg-white py-2.5 pl-8 pr-3.5 text-[13px] text-ink placeholder:text-ink/40"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-ink/70">Original price <span className="text-ink/40">(optional)</span></label>
                  <div className="relative mt-1.5">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[13px] text-ink/40">$</span>
                    <input
                      type="number"
                      step="0.5"
                      min="0"
                      value={form.originalPrice}
                      onChange={(e) => update("originalPrice", e.target.value)}
                      placeholder="0.00"
                      className="input-field w-full rounded-[8px] border border-ink/10 bg-white py-2.5 pl-8 pr-3.5 text-[13px] text-ink placeholder:text-ink/40"
                    />
                  </div>
                  <p className="mt-1.5 text-[12px] text-slate">Show a crossed-out price to indicate a discount.</p>
                </div>
                <div className="rounded-[8px] bg-parchment/50 px-4 py-3">
                  <p className="text-[12px] text-slate">Currency: <span className="font-medium text-ink">USD ($)</span></p>
                </div>
              </div>
            )}

            {/* Step 4: Preview */}
            {step === 4 && (
              <div className="space-y-4">
                <p className="text-[13px] text-slate">This is how your listing will appear to buyers.</p>
                <div className="rounded-[10px] border border-ink/10 bg-parchment/30 p-5">
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <div className="flex h-32 w-full shrink-0 items-center justify-center rounded-[8px] bg-gradient-to-br from-teal-dark to-ink sm:w-40">
                      <span className="text-[11px] font-medium text-white/60">Cover preview</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-[16px] font-display font-semibold text-ink">{form.title || "Untitled resource"}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {form.subject && (
                          <span className="rounded-full border border-ink/10 bg-white px-2.5 py-0.5 text-[11px] font-medium text-slate">{form.subject}</span>
                        )}
                        {form.level && (
                          <span className="rounded-full border border-ink/10 bg-white px-2.5 py-0.5 text-[11px] font-medium text-slate">{form.level}</span>
                        )}
                        {form.type && (
                          <span className="rounded-full border border-ink/10 bg-white px-2.5 py-0.5 text-[11px] font-medium text-slate">{form.type}</span>
                        )}
                      </div>
                      {form.description && (
                        <p className="mt-3 text-[12px] text-slate line-clamp-2">{form.description}</p>
                      )}
                      <div className="mt-4 flex items-center gap-3">
                        <span className="font-display text-[18px] font-semibold text-ink">
                          {form.price ? `$${Number(form.price).toFixed(2)}` : "$0.00"}
                        </span>
                        {form.originalPrice && Number(form.originalPrice) > 0 && (
                          <span className="text-[13px] text-ink/40 line-through">${Number(form.originalPrice).toFixed(2)}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Publish */}
            {step === 5 && (
              <div className="space-y-5">
                <p className="text-[13px] text-slate">Review your listing before publishing.</p>
                <div className="space-y-3 rounded-[8px] border border-ink/10 bg-parchment/30 p-5 text-[13px]">
                  <div className="flex justify-between">
                    <span className="text-slate">Title</span>
                    <span className="font-medium text-ink">{form.title || "—"}</span>
                  </div>
                  <div className="border-t border-ink/10" />
                  <div className="flex justify-between">
                    <span className="text-slate">Subject</span>
                    <span className="font-medium text-ink">{form.subject || "—"}</span>
                  </div>
                  <div className="border-t border-ink/10" />
                  <div className="flex justify-between">
                    <span className="text-slate">Level</span>
                    <span className="font-medium text-ink">{form.level || "—"}</span>
                  </div>
                  <div className="border-t border-ink/10" />
                  <div className="flex justify-between">
                    <span className="text-slate">Type</span>
                    <span className="font-medium text-ink">{form.type || "—"}</span>
                  </div>
                  <div className="border-t border-ink/10" />
                  <div className="flex justify-between">
                    <span className="text-slate">Price</span>
                    <span className="font-medium text-ink">{form.price ? `$${Number(form.price).toFixed(2)}` : "—"}</span>
                  </div>
                  {form.originalPrice && Number(form.originalPrice) > 0 && (
                    <>
                      <div className="border-t border-ink/10" />
                      <div className="flex justify-between">
                        <span className="text-slate">Original price</span>
                        <span className="font-medium text-ink">${Number(form.originalPrice).toFixed(2)}</span>
                      </div>
                    </>
                  )}
                  {form.description && (
                    <>
                      <div className="border-t border-ink/10" />
                      <div>
                        <span className="text-slate">Description</span>
                        <p className="mt-1 font-medium text-ink line-clamp-3">{form.description}</p>
                      </div>
                    </>
                  )}
                  {form.tags && (
                    <>
                      <div className="border-t border-ink/10" />
                      <div className="flex justify-between">
                        <span className="text-slate">Tags</span>
                        <span className="font-medium text-ink">{form.tags}</span>
                      </div>
                    </>
                  )}
                </div>
                <button className="btn-primary w-full rounded-[8px] bg-teal-dark px-6 py-3 text-[14px] font-medium text-white">
                  Publish listing
                </button>
              </div>
            )}
          </div>
        </FadeIn>

        {/* Navigation */}
        <FadeIn delay={80}>
          <div className="flex items-center justify-between pb-8">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="btn-outline inline-flex items-center gap-2 rounded-[8px] border border-ink/15 px-5 py-2.5 text-[13px] font-medium text-ink"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                Back
              </button>
            ) : (
              <div />
            )}
            {step < 5 && (
              <button
                onClick={() => setStep(step + 1)}
                disabled={!canNext()}
                className="btn-primary inline-flex items-center gap-2 rounded-[8px] bg-teal-dark px-5 py-2.5 text-[13px] font-medium text-white disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            )}
          </div>
        </FadeIn>
      </div>
    </DashboardLayout>
  );
}
