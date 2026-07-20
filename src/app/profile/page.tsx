"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar, Footer } from "@/components/marketplace";
import { FadeIn } from "@/components/ui/fade-in";
import { Breadcrumbs } from "@/components/marketplace/breadcrumbs";

export default function ProfilePage() {
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <>
      <Navbar />

      <main id="main-content" className="flex-1">
        <section className="border-b border-ink/10">
          <div className="mx-auto max-w-7xl px-6 py-6">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Dashboard", href: "/dashboard" }, { label: "Profile" }]} />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pt-8 pb-16">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-[26px] text-ink">Profile settings</h1>
              <p className="mt-1 text-[14px] text-slate">Manage your account details and preferences.</p>
            </div>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[240px_1fr] lg:gap-12">
            {/* Sidebar nav */}
            <FadeIn>
              <nav className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-0.5">
                {[
                  { label: "Profile", href: "/profile", active: true },
                  { label: "Orders", href: "/orders" },
                  { label: "Downloads", href: "/downloads" },
                  { label: "Dashboard", href: "/dashboard" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`whitespace-nowrap rounded-[8px] px-4 py-2.5 text-[13px] font-medium transition-colors ${
                      item.active
                        ? "bg-teal-dark/10 text-teal-dark"
                        : "text-slate hover:bg-parchment hover:text-ink"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </FadeIn>

            {/* Form */}
            <FadeIn delay={100}>
              <form onSubmit={handleSave} className="space-y-8">
                {/* Avatar */}
                <div className="rounded-[10px] border border-ink/10 bg-white p-6">
                  <h2 className="font-display text-[18px] text-ink">Public profile</h2>
                  <p className="mt-1 text-[13px] text-slate">This information will be displayed publicly.</p>

                  <div className="mt-5 flex items-center gap-5">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sage/20 font-display text-[20px] text-teal-dark">
                      JS
                    </div>
                    <div>
                      <button type="button" className="rounded-[8px] border border-ink/15 px-4 py-2.5 text-[13px] font-medium text-ink transition-colors hover:bg-parchment">
                        Change avatar
                      </button>
                      <p className="mt-1.5 text-[11px] text-ink/40">JPG, PNG or GIF. Max 2 MB.</p>
                    </div>
                  </div>
                </div>

                {/* Personal info */}
                <div className="rounded-[10px] border border-ink/10 bg-white p-6">
                  <h2 className="font-display text-[18px] text-ink">Personal information</h2>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-[13px] font-medium text-ink/70">First name</label>
                      <input
                        type="text"
                        defaultValue="Jane"
                        className="input-field mt-1.5 w-full rounded-[8px] border border-ink/15 bg-parchment px-3.5 py-3 text-[14px] text-ink"
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-ink/70">Last name</label>
                      <input
                        type="text"
                        defaultValue="Smith"
                        className="input-field mt-1.5 w-full rounded-[8px] border border-ink/15 bg-parchment px-3.5 py-3 text-[14px] text-ink"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[13px] font-medium text-ink/70">Email</label>
                      <input
                        type="email"
                        defaultValue="jane@example.com"
                        className="input-field mt-1.5 w-full rounded-[8px] border border-ink/15 bg-parchment px-3.5 py-3 text-[14px] text-ink"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[13px] font-medium text-ink/70">Institution / School</label>
                      <input
                        type="text"
                        defaultValue="Cambridge International School"
                        className="input-field mt-1.5 w-full rounded-[8px] border border-ink/15 bg-parchment px-3.5 py-3 text-[14px] text-ink"
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-ink/70">Country</label>
                      <select className="input-field mt-1.5 w-full appearance-none rounded-[8px] border border-ink/15 bg-parchment px-3.5 py-3 text-[14px] text-ink">
                        <option>United Kingdom</option>
                        <option>United States</option>
                        <option>Canada</option>
                        <option>Australia</option>
                        <option>India</option>
                        <option>Singapore</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-ink/70">Timezone</label>
                      <select className="input-field mt-1.5 w-full appearance-none rounded-[8px] border border-ink/15 bg-parchment px-3.5 py-3 text-[14px] text-ink">
                        <option>GMT (London)</option>
                        <option>EST (New York)</option>
                        <option>PST (Los Angeles)</option>
                        <option>IST (Mumbai)</option>
                        <option>SGT (Singapore)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Notification preferences */}
                <div className="rounded-[10px] border border-ink/10 bg-white p-6">
                  <h2 className="font-display text-[18px] text-ink">Notifications</h2>
                  <div className="mt-5 space-y-4">
                    {[
                      { id: "email-updates", label: "Email me about new resources in my subjects", defaultChecked: true },
                      { id: "email-orders", label: "Order confirmations and download links", defaultChecked: true },
                      { id: "email-marketing", label: "Marketing emails and promotions", defaultChecked: false },
                    ].map((item) => (
                      <label key={item.id} className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          id={item.id}
                          defaultChecked={item.defaultChecked}
                          className="mt-0.5 h-4 w-4 rounded border-ink/20 accent-teal-dark"
                        />
                        <span className="text-[13px] text-slate">{item.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Save */}
                <div className="flex items-center gap-4">
                  <button
                    type="submit"
                    className="btn-primary rounded-[8px] bg-teal-dark px-6 py-3 text-[14px] font-medium text-white"
                  >
                    {saved ? "Saved!" : "Save changes"}
                  </button>
                  <Link href="/dashboard" className="text-[13px] text-slate hover:text-ink">
                    Cancel
                  </Link>
                </div>
              </form>
            </FadeIn>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
