"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { FadeIn } from "@/components/ui/fade-in";
import { DashboardSectionHeader } from "@/components/dashboard/dashboard-sub-page";
import { studentSidebarItems } from "@/lib/dashboard-sidebar";

const countries = [
  "India", "United Kingdom", "United States", "Canada", "Australia",
  "Singapore", "Malaysia", "Nigeria", "Kenya", "South Africa", "UAE", "Other",
];

export default function ProfilePage() {
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    firstName: "Neil",
    lastName: "Sharma",
    email: "neil@example.com",
    institution: "Cambridge International School",
    country: "India",
    timezone: "IST (Mumbai)",
  });
  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    orderConfirmations: true,
    marketing: false,
    weeklyDigest: true,
  });
  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <DashboardLayout sidebarItems={studentSidebarItems}>
      <div className="mx-auto max-w-3xl space-y-8">
        <FadeIn>
          <DashboardSectionHeader title="Profile" />
        </FadeIn>

        <form onSubmit={handleSave} className="space-y-8">
          {/* Avatar */}
          <FadeIn delay={40}>
            <div className="rounded-[12px] border border-ink/10 bg-white p-6">
              <h2 className="font-display text-[18px] text-ink">Public profile</h2>
              <p className="mt-1 text-[13px] text-slate">This information will be displayed on your profile.</p>
              <div className="mt-5 flex items-center gap-5">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sage/20 font-display text-[20px] font-medium text-teal-dark">
                  NS
                </div>
                <div>
                  <button type="button" className="rounded-[8px] border border-ink/15 px-4 py-2.5 text-[13px] font-medium text-ink transition-colors hover:bg-parchment">
                    Change avatar
                  </button>
                  <p className="mt-1.5 text-[11px] text-ink/40">JPG, PNG or GIF. Max 2 MB.</p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Personal info */}
          <FadeIn delay={80}>
            <div className="rounded-[12px] border border-ink/10 bg-white p-6">
              <h2 className="font-display text-[18px] text-ink">Personal information</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-[13px] font-medium text-ink/70">First name</label>
                  <input type="text" value={form.firstName} onChange={(e) => update("firstName", e.target.value)} className="input-field mt-1.5 w-full rounded-[8px] border border-ink/15 bg-parchment px-3.5 py-3 text-[14px] text-ink" />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-ink/70">Last name</label>
                  <input type="text" value={form.lastName} onChange={(e) => update("lastName", e.target.value)} className="input-field mt-1.5 w-full rounded-[8px] border border-ink/15 bg-parchment px-3.5 py-3 text-[14px] text-ink" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[13px] font-medium text-ink/70">Email</label>
                  <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="input-field mt-1.5 w-full rounded-[8px] border border-ink/15 bg-parchment px-3.5 py-3 text-[14px] text-ink" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[13px] font-medium text-ink/70">Institution / School</label>
                  <input type="text" value={form.institution} onChange={(e) => update("institution", e.target.value)} className="input-field mt-1.5 w-full rounded-[8px] border border-ink/15 bg-parchment px-3.5 py-3 text-[14px] text-ink" />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-ink/70">Country</label>
                  <select value={form.country} onChange={(e) => update("country", e.target.value)} className="input-field mt-1.5 w-full appearance-none rounded-[8px] border border-ink/15 bg-parchment px-3.5 py-3 text-[14px] text-ink">
                    {countries.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-ink/70">Timezone</label>
                  <select value={form.timezone} onChange={(e) => update("timezone", e.target.value)} className="input-field mt-1.5 w-full appearance-none rounded-[8px] border border-ink/15 bg-parchment px-3.5 py-3 text-[14px] text-ink">
                    <option>IST (Mumbai)</option>
                    <option>GMT (London)</option>
                    <option>EST (New York)</option>
                    <option>PST (Los Angeles)</option>
                    <option>SGT (Singapore)</option>
                  </select>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Password */}
          <FadeIn delay={120}>
            <div className="rounded-[12px] border border-ink/10 bg-white p-6">
              <h2 className="font-display text-[18px] text-ink">Password</h2>
              <p className="mt-1 text-[13px] text-slate">Update your password to keep your account secure.</p>
              <div className="mt-5 max-w-md space-y-4">
                <div>
                  <label className="block text-[13px] font-medium text-ink/70">Current password</label>
                  <input type="password" placeholder="••••••••" className="input-field mt-1.5 w-full rounded-[8px] border border-ink/15 bg-parchment px-3.5 py-3 text-[14px] text-ink placeholder:text-ink/40" />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-ink/70">New password</label>
                  <input type="password" placeholder="••••••••" className="input-field mt-1.5 w-full rounded-[8px] border border-ink/15 bg-parchment px-3.5 py-3 text-[14px] text-ink placeholder:text-ink/40" />
                </div>
                <button type="button" className="rounded-[8px] border border-ink/15 px-4 py-2.5 text-[13px] font-medium text-ink transition-colors hover:bg-parchment">
                  Update password
                </button>
              </div>
            </div>
          </FadeIn>

          {/* Notifications */}
          <FadeIn delay={160}>
            <div className="rounded-[12px] border border-ink/10 bg-white p-6">
              <h2 className="font-display text-[18px] text-ink">Notifications</h2>
              <p className="mt-1 text-[13px] text-slate">Choose what you'd like to be notified about.</p>
              <div className="mt-5 space-y-4">
                {([
                  { key: "emailUpdates", label: "New resources in my subjects" },
                  { key: "orderConfirmations", label: "Order confirmations and download links" },
                  { key: "marketing", label: "Marketing emails and promotions" },
                  { key: "weeklyDigest", label: "Weekly learning digest" },
                ] as const).map((item) => (
                  <label key={item.key} className="flex items-center justify-between gap-4">
                    <span className="text-[13px] text-slate">{item.label}</span>
                    <button
                      type="button"
                      onClick={() => setNotifications((prev) => ({ ...prev, [item.key]: !prev[item.key] }))}
                      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${notifications[item.key] ? "bg-teal-dark" : "bg-ink/15"}`}
                    >
                      <span className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${notifications[item.key] ? "translate-x-6" : "translate-x-1"}`} />
                    </button>
                  </label>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Connected accounts */}
          <FadeIn delay={220}>
            <div className="rounded-[12px] border border-ink/10 bg-white p-6">
              <h2 className="font-display text-[18px] text-ink">Connected accounts</h2>
              <p className="mt-1 text-[13px] text-slate">Manage your linked accounts.</p>
              <div className="mt-5 space-y-3">
                <div className="flex items-center justify-between rounded-[8px] border border-ink/10 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    <div>
                      <p className="text-[13px] font-medium text-ink">Google</p>
                      <p className="text-[11px] text-slate">neil@example.com</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-sage/20 px-2.5 py-0.5 text-[11px] font-medium text-teal-dark">Connected</span>
                </div>
                <button type="button" className="flex w-full items-center justify-center gap-2 rounded-[8px] border border-dashed border-ink/15 px-4 py-3 text-[13px] font-medium text-slate transition-colors hover:border-ink/25 hover:text-ink">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  Connect another account
                </button>
              </div>
            </div>
          </FadeIn>

          {/* Danger zone */}
          <FadeIn delay={240}>
            <div className="rounded-[12px] border border-red-200 bg-white p-6">
              <h2 className="font-display text-[18px] text-red-600">Danger zone</h2>
              <p className="mt-1 text-[13px] text-slate">Permanently delete your account and all associated data.</p>
              <div className="mt-5 flex items-center gap-3">
                <button type="button" className="rounded-[8px] border border-red-200 px-4 py-2.5 text-[13px] font-medium text-red-600 transition-colors hover:bg-red-50">
                  Delete account
                </button>
                <span className="text-[12px] text-ink/40">This action cannot be undone.</span>
              </div>
            </div>
          </FadeIn>

          {/* Save */}
          <FadeIn delay={260}>
            <div className="flex items-center gap-4 pb-8">
              <button type="submit" className="btn-primary rounded-[8px] bg-teal-dark px-6 py-3 text-[14px] font-medium text-white">
                {saved ? "Saved!" : "Save changes"}
              </button>
            </div>
          </FadeIn>
        </form>
      </div>
    </DashboardLayout>
  );
}
