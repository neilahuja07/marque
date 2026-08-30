"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthBranding } from "@/components/marketplace/auth-branding";
import { AuthCard } from "@/components/marketplace/auth-card";
import { AuthFormInput, PasswordInput } from "@/components/marketplace/auth-form-input";
import { SocialLoginDivider } from "@/components/marketplace/social-login-divider";
import { createClient } from "@/lib/supabase/client";
import { sanitizeRedirectPath } from "@/lib/safe-redirect";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = sanitizeRedirectPath(
    searchParams.get("redirect"),
    typeof window !== "undefined" ? window.location.origin : "",
  );
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [touched, setTouched] = useState<{ email: boolean; password: boolean }>({
    email: false,
    password: false,
  });

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    return newErrors;
  };

  const handleBlur = (field: "email" | "password") => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const newErrors = validate();
    setErrors(newErrors);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setIsLoading(true);
    setErrors({});

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setIsLoading(false);
      if (error.message.includes("Email not confirmed")) {
        setErrors({ general: "Please verify your email before signing in." });
      } else if (error.message.includes("Invalid login")) {
        setErrors({ general: "Invalid email or password." });
      } else {
        setErrors({ general: error.message });
      }
      return;
    }

    router.push(redirectTo);
    router.refresh();
  };

  return (
    <div className="flex min-h-screen">
      {/* Left: Branding */}
      <div className="hidden lg:block lg:w-[45%]">
        <AuthBranding />
      </div>

      {/* Right: Auth form */}
      <div className="flex w-full flex-1 items-center justify-center px-6 py-10 lg:w-[55%]">
        <AuthCard title="Welcome back" subtitle="Sign in to access your resources.">
          {errors.general && (
            <div className="mb-4 rounded-[8px] border border-red-200 bg-red-50 p-3 text-[13px] text-red-600">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <AuthFormInput
              id="login-email"
              label="Email"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="you@example.com"
              required
              error={touched.email ? errors.email : undefined}
              success={touched.email && !errors.email && email.length > 0}
            />

            <div>
              <div className="flex items-center justify-between">
                <div className="flex-1" />
                <Link href="/forgot-password" className="py-1 text-[12px] font-medium text-teal-dark hover:underline">
                  Forgot password?
                </Link>
              </div>
              <PasswordInput
                id="login-password"
                label="Password"
                value={password}
                onChange={setPassword}
                required
                error={touched.password ? errors.password : undefined}
                success={touched.password && !errors.password && password.length > 0}
                showPassword={showPassword}
                onToggleVisibility={() => setShowPassword(!showPassword)}
              />
            </div>

            <label className="flex items-start gap-3 pt-1">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-ink/20 accent-teal-dark"
              />
              <span className="text-[13px] text-slate">Remember me for 30 days</span>
            </label>

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
                  Signing in…
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <SocialLoginDivider />

          <p className="mt-6 text-center text-[13px] text-slate">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-medium text-teal-dark hover:underline">
              Create one
            </Link>
          </p>
        </AuthCard>
      </div>
    </div>
  );
}
