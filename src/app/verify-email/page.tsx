"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AuthBranding } from "@/components/marketplace/auth-branding";
import { AuthCard } from "@/components/marketplace/auth-card";
import { createClient } from "@/lib/supabase/client";

export default function VerifyEmailPage() {
  const supabase = createClient();
  const [resent, setResent] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const email = sessionStorage.getItem("scholar-stack_signup_email");
    if (email) {
      setUserEmail(email);
    } else {
      const fetchEmail = async () => {
        const { data } = await supabase.auth.getUser();
        if (data.user?.email) setUserEmail(data.user.email);
      };
      fetchEmail();
    }
  }, [supabase]);

  const handleResend = async () => {
    if (!userEmail) return;
    setIsResending(true);

    const { error } = await supabase.auth.resend({
      type: "signup",
      email: userEmail,
    });

    setIsResending(false);

    if (!error) {
      setResent(true);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left: Branding */}
      <div className="hidden lg:block lg:w-[45%]">
        <AuthBranding />
      </div>

      {/* Right: Content */}
      <div className="flex w-full flex-1 items-center justify-center px-6 py-10 lg:w-[55%]">
        <AuthCard title="Verify your email">
          <div className="space-y-6">
            {/* Icon */}
            <div className="flex items-center justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sage/20">
                <svg viewBox="0 0 24 24" className="h-8 w-8 text-teal-dark" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
            </div>

            {/* Description */}
            <div className="text-center">
              <p className="text-[14px] text-slate">We&apos;ve sent a verification link to:</p>
              {userEmail && (
                <p className="mt-2 break-all rounded-[8px] border border-ink/10 bg-parchment px-3 py-2 text-[14px] font-medium text-ink">
                  {userEmail}
                </p>
              )}
              <p className="mt-2 text-[14px] text-slate">Please check your inbox and click the verification link to continue.</p>
            </div>

            {/* Steps */}
            <div className="rounded-[8px] border border-ink/10 bg-parchment p-4">
              <ol className="space-y-3 text-[13px] text-slate">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-dark text-[10px] font-bold text-white">1</span>
                  Open the email from Scholar Stack
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-dark text-[10px] font-bold text-white">2</span>
                  Click the verification link
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-dark text-[10px] font-bold text-white">3</span>
                  You&apos;re all set!
                </li>
              </ol>
            </div>

            {/* Resend */}
            {resent ? (
              <div className="rounded-[8px] border border-sage/30 bg-sage/5 p-3 text-center text-[13px] text-teal-dark">
                Verification email resent successfully.
              </div>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                disabled={isResending || !userEmail}
                className="flex w-full items-center justify-center gap-2 rounded-[8px] border border-ink/15 bg-parchment px-4 py-3 text-[13px] font-medium text-ink transition-all hover:bg-warm-gray disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isResending ? (
                  <>
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Resending…
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="23 4 23 10 17 10" />
                      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                    </svg>
                    Resend verification email
                  </>
                )}
              </button>
            )}

            {/* Help */}
            <div className="text-center text-[12px] text-slate">
              <p>
                Still need help?{" "}
                <Link href="/contact" className="font-medium text-teal-dark hover:underline">
                  Contact support
                </Link>
              </p>
            </div>
          </div>
        </AuthCard>
      </div>
    </div>
  );
}
