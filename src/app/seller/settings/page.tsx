"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { FadeIn } from "@/components/ui/fade-in";
import { DashboardSectionHeader } from "@/components/dashboard/dashboard-sub-page";
import { sellerSidebarItems } from "@/lib/seller-sidebar";

const payoutSchedules = ["Weekly", "Monthly"];

export default function SellerSettingsPage() {
  const [saved, setSaved] = useState(false);
  const [storeName, setStoreName] = useState("Dr. Sarah Chen");
  const [description, setDescription] = useState("Mathematics and Science resources for IGCSE, O Level and A Level students.");
  const [email, setEmail] = useState("sarah@marque.com");
  const [payoutSchedule, setPayoutSchedule] = useState("Monthly");
  const [minPayout, setMinPayout] = useState("50");
  const [notifications, setNotifications] = useState({
    orders: true,
    reviews: true,
    weeklyReports: false,
  });

  const toggle = (key: keyof typeof notifications) =>
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <DashboardLayout
      sidebarItems={sellerSidebarItems}
      header={
        <div className="mx-auto max-w-7xl px-6 py-4">
          <DashboardSectionHeader title="Settings" />
        </div>
      }
    >
      <div className="mx-auto max-w-3xl space-y-8">
        <form onSubmit={handleSave} className="space-y-8">
          {/* Store Information */}
          <FadeIn>
            <div className="rounded-[12px] border border-ink/10 bg-white p-6">
              <h2 className="font-display text-[18px] text-ink">Store information</h2>
              <p className="mt-1 text-[13px] text-slate">Manage your store profile and contact details.</p>
              <div className="mt-5 space-y-4">
                <div>
                  <label className="block text-[13px] font-medium text-ink/70">Store name</label>
                  <input
                    type="text"
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    className="input-field mt-1.5 w-full rounded-[8px] border border-ink/10 bg-parchment py-2.5 px-3.5 text-[13px] text-ink"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-ink/70">Description</label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="input-field mt-1.5 w-full resize-none rounded-[8px] border border-ink/10 bg-parchment py-2.5 px-3.5 text-[13px] text-ink"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-ink/70">Contact email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field mt-1.5 w-full rounded-[8px] border border-ink/10 bg-parchment py-2.5 px-3.5 text-[13px] text-ink"
                  />
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Payout Settings */}
          <FadeIn delay={40}>
            <div className="rounded-[12px] border border-ink/10 bg-white p-6">
              <h2 className="font-display text-[18px] text-ink">Payout settings</h2>
              <p className="mt-1 text-[13px] text-slate">Configure how and when you receive payments.</p>
              <div className="mt-5 space-y-4">
                <div>
                  <label className="block text-[13px] font-medium text-ink/70">Bank account</label>
                  <div className="mt-1.5 rounded-[8px] border border-ink/10 bg-parchment px-3.5 py-2.5">
                    <span className="text-[13px] text-ink">••••••••4242</span>
                  </div>
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-ink/70">Payout schedule</label>
                  <select
                    value={payoutSchedule}
                    onChange={(e) => setPayoutSchedule(e.target.value)}
                    className="input-field mt-1.5 w-full appearance-none rounded-[8px] border border-ink/10 bg-parchment py-2.5 px-3.5 text-[13px] text-ink"
                  >
                    {payoutSchedules.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-ink/70">Minimum payout</label>
                  <div className="relative mt-1.5">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[13px] text-ink/40">$</span>
                    <input
                      type="number"
                      min="0"
                      value={minPayout}
                      onChange={(e) => setMinPayout(e.target.value)}
                      className="input-field w-full rounded-[8px] border border-ink/10 bg-parchment py-2.5 pl-8 pr-3.5 text-[13px] text-ink"
                    />
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Notification Preferences */}
          <FadeIn delay={80}>
            <div className="rounded-[12px] border border-ink/10 bg-white p-6">
              <h2 className="font-display text-[18px] text-ink">Notification preferences</h2>
              <p className="mt-1 text-[13px] text-slate">Choose which notifications you receive.</p>
              <div className="mt-5 space-y-4">
                {([
                  { key: "orders" as const, label: "Order notifications", desc: "Get notified when you receive a new order." },
                  { key: "reviews" as const, label: "Review notifications", desc: "Get notified when a customer leaves a review." },
                  { key: "weeklyReports" as const, label: "Weekly reports", desc: "Receive a weekly summary of your store performance." },
                ]).map((item) => (
                  <label key={item.key} className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-[13px] font-medium text-ink">{item.label}</span>
                      <p className="text-[12px] text-slate">{item.desc}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggle(item.key)}
                      className={`relative mt-0.5 inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
                        notifications[item.key] ? "bg-teal-dark" : "bg-ink/15"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${
                          notifications[item.key] ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </label>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Danger Zone */}
          <FadeIn delay={120}>
            <div className="rounded-[12px] border border-red-200 bg-white p-6">
              <h2 className="font-display text-[18px] text-red-600">Danger zone</h2>
              <p className="mt-1 text-[13px] text-slate">Irreversible actions for your account.</p>
              <div className="mt-5">
                <button
                  type="button"
                  className="rounded-[8px] border border-red-200 px-5 py-2.5 text-[13px] font-medium text-red-600 transition-colors hover:bg-red-50"
                >
                  Delete store account
                </button>
              </div>
            </div>
          </FadeIn>

          {/* Save */}
          <FadeIn delay={160}>
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
