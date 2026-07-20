"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { FadeIn } from "@/components/ui/fade-in";
import { DashboardSectionHeader } from "@/components/dashboard/dashboard-sub-page";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { adminSidebarItems } from "@/lib/admin-sidebar";

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);

  // General
  const [platformName, setPlatformName] = useState("Marque");
  const [supportEmail, setSupportEmail] = useState("support@marque.com");
  const [defaultCurrency, setDefaultCurrency] = useState("USD");
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  // Branding
  const [primaryColor, setPrimaryColor] = useState("#1F4B43");
  const [tagline, setTagline] = useState("Premium resources for IGCSE, O Level & A Level");

  // Email
  const [smtpHost, setSmtpHost] = useState("smtp.marque.com");
  const [fromName, setFromName] = useState("Marque");
  const [orderConfirmation, setOrderConfirmation] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);

  // Payment
  const [razorpayKey, setRazorpayKey] = useState("rzp_test_••••••••••••");
  const [webhookUrl, setWebhookUrl] = useState("https://marque.com/api/webhooks/razorpay");
  const [autoRefund, setAutoRefund] = useState(false);

  // Storage
  const [maxFileSize, setMaxFileSize] = useState("50");
  const [allowedFormats, setAllowedFormats] = useState("PDF, DOCX, PPTX, ZIP");

  // Security
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState("24");
  const [apiRateLimit, setApiRateLimit] = useState("1000");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const Toggle = ({ value, onChange }: { value: boolean; onChange: () => void }) => (
    <button
      type="button"
      onClick={onChange}
      className={`relative mt-0.5 inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
        value ? "bg-teal-dark" : "bg-ink/15"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${
          value ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );

  return (
    <DashboardLayout
      sidebarItems={adminSidebarItems}
      header={
        <div className="mx-auto max-w-7xl px-6 py-4">
          <DashboardSectionHeader title="Settings" />
        </div>
      }
    >
      <div className="mx-auto max-w-3xl space-y-8">
        <FadeIn>
          <Tabs defaultValue="general">
            <TabsList>
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="branding">Branding</TabsTrigger>
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="payment">Payment</TabsTrigger>
              <TabsTrigger value="storage">Storage</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            <form onSubmit={handleSave}>
              {/* General */}
              <TabsContent value="general">
                <div className="mt-6 rounded-[12px] border border-ink/10 bg-white p-6">
                  <h2 className="font-display text-[18px] text-ink">General settings</h2>
                  <p className="mt-1 text-[13px] text-slate">Configure your platform basics.</p>
                  <div className="mt-5 space-y-4">
                    <div>
                      <label className="block text-[13px] font-medium text-ink/70">Platform name</label>
                      <input
                        type="text"
                        value={platformName}
                        onChange={(e) => setPlatformName(e.target.value)}
                        className="input-field mt-1.5 w-full rounded-[8px] border border-ink/10 bg-parchment py-2.5 px-3.5 text-[13px] text-ink"
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-ink/70">Support email</label>
                      <input
                        type="email"
                        value={supportEmail}
                        onChange={(e) => setSupportEmail(e.target.value)}
                        className="input-field mt-1.5 w-full rounded-[8px] border border-ink/10 bg-parchment py-2.5 px-3.5 text-[13px] text-ink"
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-ink/70">Default currency</label>
                      <select
                        value={defaultCurrency}
                        onChange={(e) => setDefaultCurrency(e.target.value)}
                        className="input-field mt-1.5 w-full appearance-none rounded-[8px] border border-ink/10 bg-parchment py-2.5 px-3.5 text-[13px] text-ink"
                      >
                        <option value="USD">USD — US Dollar</option>
                        <option value="GBP">GBP — British Pound</option>
                        <option value="INR">INR — Indian Rupee</option>
                        <option value="SGD">SGD — Singapore Dollar</option>
                      </select>
                    </div>
                    <label className="flex items-start justify-between gap-4">
                      <div>
                        <span className="text-[13px] font-medium text-ink">Maintenance mode</span>
                        <p className="text-[12px] text-slate">Temporarily disable public access to the platform.</p>
                      </div>
                      <Toggle value={maintenanceMode} onChange={() => setMaintenanceMode(!maintenanceMode)} />
                    </label>
                  </div>
                </div>
              </TabsContent>

              {/* Branding */}
              <TabsContent value="branding">
                <div className="mt-6 rounded-[12px] border border-ink/10 bg-white p-6">
                  <h2 className="font-display text-[18px] text-ink">Branding</h2>
                  <p className="mt-1 text-[13px] text-slate">Customize your platform appearance.</p>
                  <div className="mt-5 space-y-4">
                    <div>
                      <label className="block text-[13px] font-medium text-ink/70">Logo</label>
                      <div className="mt-1.5 flex items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-[8px] border border-dashed border-ink/20 bg-parchment text-[13px] text-ink/40">
                          Upload
                        </div>
                        <button type="button" className="text-[13px] font-medium text-teal-dark hover:underline">
                          Change logo
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-ink/70">Primary color</label>
                      <div className="mt-1.5 flex items-center gap-3">
                        <input
                          type="color"
                          value={primaryColor}
                          onChange={(e) => setPrimaryColor(e.target.value)}
                          className="h-10 w-10 cursor-pointer rounded-[6px] border border-ink/10"
                        />
                        <input
                          type="text"
                          value={primaryColor}
                          onChange={(e) => setPrimaryColor(e.target.value)}
                          className="input-field w-full rounded-[8px] border border-ink/10 bg-parchment py-2.5 px-3.5 text-[13px] text-ink"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-ink/70">Tagline</label>
                      <input
                        type="text"
                        value={tagline}
                        onChange={(e) => setTagline(e.target.value)}
                        className="input-field mt-1.5 w-full rounded-[8px] border border-ink/10 bg-parchment py-2.5 px-3.5 text-[13px] text-ink"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Email */}
              <TabsContent value="email">
                <div className="mt-6 rounded-[12px] border border-ink/10 bg-white p-6">
                  <h2 className="font-display text-[18px] text-ink">Email settings</h2>
                  <p className="mt-1 text-[13px] text-slate">Configure email delivery and notifications.</p>
                  <div className="mt-5 space-y-4">
                    <div>
                      <label className="block text-[13px] font-medium text-ink/70">SMTP host</label>
                      <input
                        type="text"
                        value={smtpHost}
                        onChange={(e) => setSmtpHost(e.target.value)}
                        className="input-field mt-1.5 w-full rounded-[8px] border border-ink/10 bg-parchment py-2.5 px-3.5 text-[13px] text-ink"
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-ink/70">From name</label>
                      <input
                        type="text"
                        value={fromName}
                        onChange={(e) => setFromName(e.target.value)}
                        className="input-field mt-1.5 w-full rounded-[8px] border border-ink/10 bg-parchment py-2.5 px-3.5 text-[13px] text-ink"
                      />
                    </div>
                    <label className="flex items-start justify-between gap-4">
                      <div>
                        <span className="text-[13px] font-medium text-ink">Order confirmation emails</span>
                        <p className="text-[12px] text-slate">Send automatic confirmation after purchase.</p>
                      </div>
                      <Toggle value={orderConfirmation} onChange={() => setOrderConfirmation(!orderConfirmation)} />
                    </label>
                    <label className="flex items-start justify-between gap-4">
                      <div>
                        <span className="text-[13px] font-medium text-ink">Marketing emails</span>
                        <p className="text-[12px] text-slate">Send promotional emails to users.</p>
                      </div>
                      <Toggle value={marketingEmails} onChange={() => setMarketingEmails(!marketingEmails)} />
                    </label>
                  </div>
                </div>
              </TabsContent>

              {/* Payment */}
              <TabsContent value="payment">
                <div className="mt-6 rounded-[12px] border border-ink/10 bg-white p-6">
                  <h2 className="font-display text-[18px] text-ink">Payment settings</h2>
                  <p className="mt-1 text-[13px] text-slate">Configure payment gateway and refund policies.</p>
                  <div className="mt-5 space-y-4">
                    <div>
                      <label className="block text-[13px] font-medium text-ink/70">Razorpay key</label>
                      <input
                        type="text"
                        value={razorpayKey}
                        onChange={(e) => setRazorpayKey(e.target.value)}
                        className="input-field mt-1.5 w-full rounded-[8px] border border-ink/10 bg-parchment py-2.5 px-3.5 text-[13px] text-ink font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-ink/70">Webhook URL</label>
                      <input
                        type="text"
                        value={webhookUrl}
                        onChange={(e) => setWebhookUrl(e.target.value)}
                        className="input-field mt-1.5 w-full rounded-[8px] border border-ink/10 bg-parchment py-2.5 px-3.5 text-[13px] text-ink font-mono"
                      />
                    </div>
                    <label className="flex items-start justify-between gap-4">
                      <div>
                        <span className="text-[13px] font-medium text-ink">Auto-refund on rejection</span>
                        <p className="text-[12px] text-slate">Automatically refund when a resource is rejected.</p>
                      </div>
                      <Toggle value={autoRefund} onChange={() => setAutoRefund(!autoRefund)} />
                    </label>
                  </div>
                </div>
              </TabsContent>

              {/* Storage */}
              <TabsContent value="storage">
                <div className="mt-6 rounded-[12px] border border-ink/10 bg-white p-6">
                  <h2 className="font-display text-[18px] text-ink">Storage settings</h2>
                  <p className="mt-1 text-[13px] text-slate">Manage file upload limits and storage usage.</p>
                  <div className="mt-5 space-y-4">
                    <div>
                      <label className="block text-[13px] font-medium text-ink/70">Max file size (MB)</label>
                      <input
                        type="number"
                        min="1"
                        value={maxFileSize}
                        onChange={(e) => setMaxFileSize(e.target.value)}
                        className="input-field mt-1.5 w-full rounded-[8px] border border-ink/10 bg-parchment py-2.5 px-3.5 text-[13px] text-ink"
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-ink/70">Allowed formats</label>
                      <input
                        type="text"
                        value={allowedFormats}
                        onChange={(e) => setAllowedFormats(e.target.value)}
                        className="input-field mt-1.5 w-full rounded-[8px] border border-ink/10 bg-parchment py-2.5 px-3.5 text-[13px] text-ink"
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-ink/70">Storage used</label>
                      <div className="mt-1.5">
                        <div className="h-2 w-full overflow-hidden rounded-full bg-ink/10">
                          <div className="h-full w-[34%] rounded-full bg-teal-dark" />
                        </div>
                        <p className="mt-1.5 text-[12px] text-slate">17.2 GB of 50 GB used</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Security */}
              <TabsContent value="security">
                <div className="mt-6 rounded-[12px] border border-ink/10 bg-white p-6">
                  <h2 className="font-display text-[18px] text-ink">Security settings</h2>
                  <p className="mt-1 text-[13px] text-slate">Manage authentication and access controls.</p>
                  <div className="mt-5 space-y-4">
                    <label className="flex items-start justify-between gap-4">
                      <div>
                        <span className="text-[13px] font-medium text-ink">Two-factor authentication</span>
                        <p className="text-[12px] text-slate">Require 2FA for admin accounts.</p>
                      </div>
                      <Toggle value={twoFactorAuth} onChange={() => setTwoFactorAuth(!twoFactorAuth)} />
                    </label>
                    <div>
                      <label className="block text-[13px] font-medium text-ink/70">Session timeout (hours)</label>
                      <input
                        type="number"
                        min="1"
                        value={sessionTimeout}
                        onChange={(e) => setSessionTimeout(e.target.value)}
                        className="input-field mt-1.5 w-full rounded-[8px] border border-ink/10 bg-parchment py-2.5 px-3.5 text-[13px] text-ink"
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-ink/70">API rate limit (req/min)</label>
                      <input
                        type="number"
                        min="100"
                        value={apiRateLimit}
                        onChange={(e) => setApiRateLimit(e.target.value)}
                        className="input-field mt-1.5 w-full rounded-[8px] border border-ink/10 bg-parchment py-2.5 px-3.5 text-[13px] text-ink"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Save */}
              <FadeIn delay={80}>
                <div className="flex items-center gap-4 pb-8 pt-6">
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
          </Tabs>
        </FadeIn>
      </div>
    </DashboardLayout>
  );
}
