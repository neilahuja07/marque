"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { FadeIn } from "@/components/ui/fade-in";
import { DashboardSectionHeader } from "@/components/dashboard/dashboard-sub-page";
import { studentSidebarItems } from "@/lib/dashboard-sidebar";

const languages = ["English", "Fran\u00e7ais", "\u0627\u0644\u0639\u0631\u0628\u064a\u0629", "\u0939\u093f\u0928\u094d\u0926\u0940", "\u4e2d\u0658\u6587"];
const currencies = ["USD (\u2014)", "INR (\u20b9)", "GBP (\u00a3)", "EUR (\u20ac)", "SGD (S\u0024)"];
const timezones = [
  "UTC",
  "IST (UTC+5:30)",
  "GMT (UTC+0)",
  "EST (UTC-5)",
  "PST (UTC-8)",
  "SGT (UTC+8)",
  "AEST (UTC+10)",
];
const itemsPerPageOptions = ["12", "24", "48", "96"];

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [language, setLanguage] = useState("English");
  const [currency, setCurrency] = useState("USD (\u2014)");
  const [timezone, setTimezone] = useState("IST (UTC+5:30)");
  const [itemsPerPage, setItemsPerPage] = useState("24");
  const [defaultView, setDefaultView] = useState<"grid" | "list">("grid");
  const [emailPrefs, setEmailPrefs] = useState({
    productUpdates: true,
    securityAlerts: true,
    marketing: false,
    weeklyDigest: false,
  });
  const [dataSharing, setDataSharing] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <DashboardLayout sidebarItems={studentSidebarItems}>
      <div className="mx-auto max-w-3xl space-y-8">
        <FadeIn>
          <DashboardSectionHeader title="Settings" />
        </FadeIn>

        <form onSubmit={handleSave} className="space-y-8">
          {/* Language & Region */}
          <FadeIn delay={40}>
            <div className="rounded-[12px] border border-ink/10 bg-white p-6">
              <h2 className="font-display text-[18px] text-ink">Language &amp; Region</h2>
              <p className="mt-1 text-[13px] text-slate">
                Choose your preferred language, currency and timezone.
              </p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="settings-language" className="block text-[13px] font-medium text-ink/70">
                    Language
                  </label>
                  <select
                    id="settings-language"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="input-field mt-1.5 w-full appearance-none rounded-[8px] border border-ink/15 bg-parchment px-3.5 py-3 text-[14px] text-ink"
                  >
                    {languages.map((l) => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="settings-currency" className="block text-[13px] font-medium text-ink/70">
                    Currency
                  </label>
                  <select
                    id="settings-currency"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="input-field mt-1.5 w-full appearance-none rounded-[8px] border border-ink/15 bg-parchment px-3.5 py-3 text-[14px] text-ink"
                  >
                    {currencies.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="settings-timezone" className="block text-[13px] font-medium text-ink/70">
                    Timezone
                  </label>
                  <select
                    id="settings-timezone"
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="input-field mt-1.5 w-full appearance-none rounded-[8px] border border-ink/15 bg-parchment px-3.5 py-3 text-[14px] text-ink"
                  >
                    {timezones.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Display Preferences */}
          <FadeIn delay={80}>
            <div className="rounded-[12px] border border-ink/10 bg-white p-6">
              <h2 className="font-display text-[18px] text-ink">Display preferences</h2>
              <p className="mt-1 text-[13px] text-slate">
                Customise how resources are displayed across the marketplace.
              </p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="settings-items-per-page" className="block text-[13px] font-medium text-ink/70">
                    Items per page
                  </label>
                  <select
                    id="settings-items-per-page"
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(e.target.value)}
                    className="input-field mt-1.5 w-full appearance-none rounded-[8px] border border-ink/15 bg-parchment px-3.5 py-3 text-[14px] text-ink"
                  >
                    {itemsPerPageOptions.map((n) => (
                      <option key={n} value={n}>{n} items</option>
                    ))}
                  </select>
                </div>
                <div>
                  <span className="block text-[13px] font-medium text-ink/70">Default view</span>
                  <div className="mt-1.5 flex gap-2">
                    {(["grid", "list"] as const).map((v) => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => setDefaultView(v)}
                        className={`flex-1 rounded-[8px] border px-4 py-2.5 text-[13px] font-medium capitalize transition-colors ${
                          defaultView === v
                            ? "border-teal-dark bg-teal-dark/5 text-teal-dark"
                            : "border-ink/10 text-slate hover:border-ink/20 hover:text-ink"
                        }`}
                      >
                        {v === "grid" ? (
                          <span className="flex items-center justify-center gap-2">
                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="3" y="3" width="7" height="7" />
                              <rect x="14" y="3" width="7" height="7" />
                              <rect x="3" y="14" width="7" height="7" />
                              <rect x="14" y="14" width="7" height="7" />
                            </svg>
                            Grid
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-2">
                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="8" y1="6" x2="21" y2="6" />
                              <line x1="8" y1="12" x2="21" y2="12" />
                              <line x1="8" y1="18" x2="21" y2="18" />
                              <line x1="3" y1="6" x2="3.01" y2="6" />
                              <line x1="3" y1="12" x2="3.01" y2="12" />
                              <line x1="3" y1="18" x2="3.01" y2="18" />
                            </svg>
                            List
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Email Preferences */}
          <FadeIn delay={120}>
            <div className="rounded-[12px] border border-ink/10 bg-white p-6">
              <h2 className="font-display text-[18px] text-ink">Email preferences</h2>
              <p className="mt-1 text-[13px] text-slate">
                Control which emails you receive from Marque.
              </p>
              <div className="mt-5 space-y-4">
                {([
                  { key: "securityAlerts" as const, label: "Security alerts", desc: "Important account activity" },
                  { key: "productUpdates" as const, label: "Product updates", desc: "New features and improvements" },
                  { key: "marketing" as const, label: "Marketing emails", desc: "Promotions and special offers" },
                  { key: "weeklyDigest" as const, label: "Weekly digest", desc: "Curated resources every week" },
                ]).map((item) => (
                  <label key={item.key} className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-[13px] font-medium text-ink">{item.label}</span>
                      <p className="text-[12px] text-slate">{item.desc}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setEmailPrefs((prev) => ({ ...prev, [item.key]: !prev[item.key] }))
                      }
                      className={`relative mt-0.5 inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
                        emailPrefs[item.key] ? "bg-teal-dark" : "bg-ink/15"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${
                          emailPrefs[item.key] ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </label>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Data & Privacy */}
          <FadeIn delay={160}>
            <div className="rounded-[12px] border border-ink/10 bg-white p-6">
              <h2 className="font-display text-[18px] text-ink">Data &amp; privacy</h2>
              <p className="mt-1 text-[13px] text-slate">
                Manage your data sharing preferences and download your data.
              </p>
              <div className="mt-5 space-y-5">
                <label className="flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[13px] font-medium text-ink">Anonymous usage data</span>
                    <p className="text-[12px] text-slate">Help improve Marque with anonymised analytics.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setDataSharing(!dataSharing)}
                    className={`relative mt-0.5 inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
                      dataSharing ? "bg-teal-dark" : "bg-ink/15"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${
                        dataSharing ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </label>

                <div className="border-t border-ink/10 pt-5">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      className="rounded-[8px] border border-ink/15 px-4 py-2.5 text-[13px] font-medium text-ink transition-colors hover:bg-parchment"
                    >
                      Export my data
                    </button>
                    <button
                      type="button"
                      className="rounded-[8px] border border-red-200 px-4 py-2.5 text-[13px] font-medium text-red-600 transition-colors hover:bg-red-50"
                    >
                      Clear activity history
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Active Sessions */}
          <FadeIn delay={200}>
            <div className="rounded-[12px] border border-ink/10 bg-white p-6">
              <h2 className="font-display text-[18px] text-ink">Active sessions</h2>
              <p className="mt-1 text-[13px] text-slate">
                Sign out of sessions on other devices.
              </p>
              <div className="mt-5 space-y-3">
                <div className="flex items-center justify-between rounded-[8px] border border-ink/10 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sage/20">
                      <svg viewBox="0 0 24 24" className="h-4 w-4 text-teal-dark" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                        <line x1="8" y1="21" x2="16" y2="21" />
                        <line x1="12" y1="17" x2="12" y2="21" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[13px] font-medium text-ink">Chrome on Windows</p>
                      <p className="text-[11px] text-slate">Current session &middot; Mumbai, India</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-sage/20 px-2.5 py-0.5 text-[11px] font-medium text-teal-dark">
                    Active
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-[8px] border border-ink/10 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-parchment">
                      <svg viewBox="0 0 24 24" className="h-4 w-4 text-ink/40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                        <line x1="12" y1="18" x2="12.01" y2="18" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[13px] font-medium text-ink">Safari on iPhone</p>
                      <p className="text-[11px] text-slate">2 days ago &middot; Mumbai, India</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="rounded-[8px] border border-ink/10 px-3 py-1.5 text-[12px] font-medium text-slate transition-colors hover:border-ink/20 hover:text-ink"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Save */}
          <FadeIn delay={240}>
            <div className="flex items-center gap-4 pb-8">
              <button
                type="submit"
                className="btn-primary rounded-[8px] bg-teal-dark px-6 py-3 text-[14px] font-medium text-white"
              >
                {saved ? "Saved!" : "Save changes"}
              </button>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="rounded-[8px] border border-ink/10 px-5 py-3 text-[13px] font-medium text-slate transition-colors hover:border-ink/20 hover:text-ink"
              >
                Reset
              </button>
            </div>
          </FadeIn>
        </form>
      </div>
    </DashboardLayout>
  );
}
