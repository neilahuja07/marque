"use client";

import { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthBranding } from "@/components/marketplace/auth-branding";
import { AuthCard } from "@/components/marketplace/auth-card";
import { PasswordInput } from "@/components/marketplace/auth-form-input";
import { createClient } from "@/lib/supabase/client";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [reset, setReset] = useState(false);
  const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string; general?: string }>({});
  const [touched, setTouched] = useState({ password: false, confirmPassword: false });
  const [hasAccess, setHasAccess] = useState(true);

  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      supabase.auth.exchangeCodeForSession(code).catch(() => {
        setHasAccess(false);
      });
    }
  }, [searchParams, supabase]);

  const validate = () => {
    const e: typeof errors = {};
    if (!password) {
      e.password = "Password is required";
    } else if (password.length < 8) {
      e.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])/.test(password)) {
      e.password = "Include uppercase and lowercase letters";
    }
    if (!confirmPassword) {
      e.confirmPassword = "Please confirm your password";
    } else if (confirmPassword !== password) {
      e.confirmPassword = "Passwords do not match";
    }
    return e;
  };

  const handleBlur = (field: "password" | "confirmPassword") => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ password: true, confirmPassword: true });
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setIsLoading(true);

    const { error } = await supabase.auth.updateUser({ password });

    setIsLoading(false);

    if (error) {
      setErrors({ general: error.message });
      return;
    }

    setReset(true);
  };

  if (!hasAccess) {
    return (
      <div className="flex min-h-screen">
        <div className="hidden lg:block lg:w-[45%]">
          <AuthBranding />
        </div>
        <div className="flex w-full flex-1 items-center justify-center px-6 py-10 lg:w-[55%]">
          <AuthCard title="Invalid or expired link" subtitle="Please request a new password reset link.">
            <Link
              href="/forgot-password"
              className="btn-primary flex w-full items-center justify-center rounded-[8px] bg-teal-dark px-6 py-3 text-[14px] font-medium text-white"
            >
              Request new link
            </Link>
          </AuthCard>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Left: Branding */}
      <div className="hidden lg:block lg:w-[45%]">
        <AuthBranding />
      </div>

      {/* Right: Form */}
      <div className="flex w-full flex-1 items-center justify-center px-6 py-10 lg:w-[55%]">
        <AuthCard
          title={reset ? "Password updated" : "Set a new password"}
          subtitle={
            reset
              ? "Your password has been successfully updated."
              : "Create a strong password to secure your account."
          }
        >
          {errors.general && (
            <div className="mb-4 rounded-[8px] border border-red-200 bg-red-50 p-3 text-[13px] text-red-600">
              {errors.general}
            </div>
          )}

          {reset ? (
            <div className="space-y-6">
              <div className="flex items-center justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sage/20">
                  <svg viewBox="0 0 24 24" className="h-8 w-8 text-teal-dark" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              </div>
              <Link
                href="/login"
                className="btn-primary flex w-full items-center justify-center rounded-[8px] bg-teal-dark px-6 py-3 text-[14px] font-medium text-white"
              >
                Sign in with new password
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <PasswordInput
                id="reset-password"
                label="New password"
                value={password}
                onChange={(v) => {
                  setPassword(v);
                  if (touched.password) setErrors(validate());
                }}
                required
                error={touched.password ? errors.password : undefined}
                success={touched.password && !errors.password && password.length > 0}
                showPassword={showPassword}
                onToggleVisibility={() => setShowPassword(!showPassword)}
              />

              <PasswordInput
                id="reset-confirm"
                label="Confirm new password"
                value={confirmPassword}
                onChange={(v) => {
                  setConfirmPassword(v);
                  if (touched.confirmPassword) setErrors(validate());
                }}
                required
                error={touched.confirmPassword ? errors.confirmPassword : undefined}
                success={touched.confirmPassword && !errors.confirmPassword && confirmPassword.length > 0 && confirmPassword === password}
                showPassword={showConfirm}
                onToggleVisibility={() => setShowConfirm(!showConfirm)}
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
                    Updating…
                  </>
                ) : (
                  "Update password"
                )}
              </button>
            </form>
          )}

          <p className="mt-6 text-center text-[13px] text-slate">
            <Link href="/login" className="font-medium text-teal-dark hover:underline">
              Back to sign in
            </Link>
          </p>
        </AuthCard>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <svg className="h-6 w-6 animate-spin text-teal-dark" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
