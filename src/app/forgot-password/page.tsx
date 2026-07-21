"use client";

import { useState } from "react";
import Link from "next/link";
import { AuthBranding } from "@/components/marketplace/auth-branding";
import { AuthCard } from "@/components/marketplace/auth-card";
import { AuthFormInput } from "@/components/marketplace/auth-form-input";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false);

  const validate = () => {
    if (!email) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Please enter a valid email address";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    const err = validate();
    setError(err);
    if (err) return;

    setIsLoading(true);

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    setIsLoading(false);

    if (resetError) {
      setError(resetError.message);
      return;
    }

    setSent(true);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left: Branding */}
      <div className="hidden lg:block lg:w-[45%]">
        <AuthBranding />
      </div>

      {/* Right: Form */}
      <div className="flex w-full flex-1 items-center justify-center px-6 py-10 lg:w-[55%]">
        <AuthCard
          title={sent ? "Check your inbox" : "Forgot your password?"}
          subtitle={
            sent
              ? `We\u2019ve sent a password reset link to ${email}.`
              : "Enter your email and we\u2019ll send you a reset link."
          }
        >
          {sent ? (
            <div className="space-y-6">
              <div className="flex items-center justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sage/20">
                  <svg viewBox="0 0 24 24" className="h-8 w-8 text-teal-dark" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
              </div>
              <div className="text-center">
                <p className="text-[13px] text-slate">
                  Didn&apos;t receive the email?{" "}
                  <button
                    onClick={() => {
                      setSent(false);
                      setEmail("");
                      setError("");
                      setTouched(false);
                    }}
                    className="font-medium text-teal-dark hover:underline"
                  >
                    Try again
                  </button>
                </p>
              </div>
              <Link
                href="/login"
                className="btn-primary flex w-full items-center justify-center rounded-[8px] bg-teal-dark px-6 py-3 text-[14px] font-medium text-white"
              >
                Back to sign in
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <AuthFormInput
                id="forgot-email"
                label="Email"
                type="email"
                value={email}
                onChange={(v) => {
                  setEmail(v);
                  if (touched) setError(validate());
                }}
                placeholder="you@example.com"
                required
                error={touched ? error : undefined}
                success={touched && !error && email.length > 0}
              />

              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary flex w-full items-center justify-center gap-2 rounded-[8px] bg-teal-dark px-6 py-3 text-[14px] font-medium text-white transition-all disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending…
                  </>
                ) : (
                  "Send reset link"
                )}
              </button>
            </form>
          )}

          <p className="mt-6 text-center text-[13px] text-slate">
            Remember your password?{" "}
            <Link href="/login" className="font-medium text-teal-dark hover:underline">
              Sign in
            </Link>
          </p>
        </AuthCard>
      </div>
    </div>
  );
}
