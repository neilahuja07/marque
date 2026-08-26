"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthBranding } from "@/components/marketplace/auth-branding";
import { AuthCard } from "@/components/marketplace/auth-card";
import { AuthFormInput, PasswordInput } from "@/components/marketplace/auth-form-input";
import { SocialLoginDivider } from "@/components/marketplace/social-login-divider";
import { createClient } from "@/lib/supabase/client";

const countries = [
  "India",
  "United Kingdom",
  "United States",
  "Canada",
  "Australia",
  "Singapore",
  "Malaysia",
  "Nigeria",
  "Kenya",
  "South Africa",
  "UAE",
  "Other",
];

type FormFields = "firstName" | "lastName" | "email" | "password" | "confirmPassword" | "country";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  country: string;
};

const initialForm: FormValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  country: "",
};

export default function RegisterPage() {
  const router = useRouter();
  const supabase = createClient();
  const [form, setForm] = useState<FormValues>(initialForm);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<FormFields | "general", string>>>({});
  const [touched, setTouched] = useState<Record<FormFields, boolean>>({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    confirmPassword: false,
    country: false,
  });

  const update = (field: FormFields, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const validate = () => {
    const e: Partial<Record<FormFields, string>> = {};
    if (!form.firstName.trim()) e.firstName = "First name is required";
    if (!form.lastName.trim()) e.lastName = "Last name is required";
    if (!form.email) {
      e.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Please enter a valid email address";
    }
    if (!form.password) {
      e.password = "Password is required";
    } else if (form.password.length < 8) {
      e.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])/.test(form.password)) {
      e.password = "Include uppercase and lowercase letters";
    }
    if (!form.confirmPassword) {
      e.confirmPassword = "Please confirm your password";
    } else if (form.confirmPassword !== form.password) {
      e.confirmPassword = "Passwords do not match";
    }
    if (!form.country) e.country = "Please select your country";
    return e;
  };

  const handleBlur = (field: FormFields) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const e = validate();
    setErrors(e);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched: Record<FormFields, boolean> = {
      firstName: true,
      lastName: true,
      email: true,
      password: true,
      confirmPassword: true,
      country: true,
    };
    setTouched(allTouched);
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0 || !agreeTerms) return;

    setIsLoading(true);
    setErrors({});

    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          first_name: form.firstName,
          last_name: form.lastName,
          country: form.country,
          role: "student",
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setIsLoading(false);
      if (error.message.includes("already registered")) {
        setErrors({ general: "An account with this email already exists." });
      } else {
        setErrors({ general: error.message });
      }
      return;
    }

    sessionStorage.setItem("scholar-stack_signup_email", form.email);
    router.push("/verify-email");
  };

  return (
    <div className="flex min-h-screen">
      {/* Left: Branding */}
      <div className="hidden lg:block lg:w-[45%]">
        <AuthBranding />
      </div>

      {/* Right: Auth form */}
      <div className="flex w-full flex-1 items-center justify-center px-6 py-10 lg:w-[55%]">
        <AuthCard title="Create your account" subtitle="Start exploring premium study resources.">
          {errors.general && (
            <div className="mb-4 rounded-[8px] border border-red-200 bg-red-50 p-3 text-[13px] text-red-600">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <AuthFormInput
                id="reg-first"
                label="First name"
                value={form.firstName}
                onChange={(v) => update("firstName", v)}
                placeholder="Jane"
                required
                error={touched.firstName ? errors.firstName : undefined}
                success={touched.firstName && !errors.firstName && form.firstName.length > 0}
              />
              <AuthFormInput
                id="reg-last"
                label="Last name"
                value={form.lastName}
                onChange={(v) => update("lastName", v)}
                placeholder="Smith"
                required
                error={touched.lastName ? errors.lastName : undefined}
                success={touched.lastName && !errors.lastName && form.lastName.length > 0}
              />
            </div>

            <AuthFormInput
              id="reg-email"
              label="Email"
              type="email"
              value={form.email}
              onChange={(v) => update("email", v)}
              placeholder="you@example.com"
              required
              error={touched.email ? errors.email : undefined}
              success={touched.email && !errors.email && form.email.length > 0}
              hint="We'll send download links to this email."
            />

            <PasswordInput
              id="reg-password"
              label="Password"
              value={form.password}
              onChange={(v) => update("password", v)}
              required
              error={touched.password ? errors.password : undefined}
              success={touched.password && !errors.password && form.password.length > 0}
              showPassword={showPassword}
              onToggleVisibility={() => setShowPassword(!showPassword)}
            />

            <PasswordInput
              id="reg-confirm"
              label="Confirm password"
              value={form.confirmPassword}
              onChange={(v) => update("confirmPassword", v)}
              required
              error={touched.confirmPassword ? errors.confirmPassword : undefined}
              success={touched.confirmPassword && !errors.confirmPassword && form.confirmPassword.length > 0 && form.confirmPassword === form.password}
              showPassword={showConfirmPassword}
              onToggleVisibility={() => setShowConfirmPassword(!showConfirmPassword)}
            />

            <div>
              <label htmlFor="reg-country" className="block text-[13px] font-medium text-ink/70">
                Country <span className="text-red-500">*</span>
              </label>
              <select
                id="reg-country"
                required
                value={form.country}
                onChange={(e) => update("country", e.target.value)}
                className={`input-field mt-1.5 w-full appearance-none rounded-[8px] border bg-parchment px-3.5 py-3 text-[14px] text-ink ${
                  touched.country && errors.country
                    ? "border-red-400 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.08)]"
                    : touched.country && !errors.country && form.country
                      ? "border-sage focus:border-teal-dark"
                      : "border-ink/15"
                }`}
              >
                <option value="">Select country</option>
                {countries.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              {touched.country && errors.country && (
                <p className="mt-1.5 text-[12px] text-red-500">{errors.country}</p>
              )}
            </div>

            <label className="flex items-start gap-3 pt-1">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-ink/20 accent-teal-dark"
              />
              <span className="text-[13px] leading-relaxed text-slate">
                I agree to the{" "}
                <Link href="/terms" className="font-medium text-teal-dark hover:underline">Terms of Service</Link>{" "}
                and{" "}
                <Link href="/privacy" className="font-medium text-teal-dark hover:underline">Privacy Policy</Link>
              </span>
            </label>

            <button
              type="submit"
              disabled={isLoading || !agreeTerms}
              className="btn-primary flex w-full items-center justify-center gap-2 rounded-[8px] bg-teal-dark px-6 py-3 text-[14px] font-medium text-white transition-all disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Creating account…
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <SocialLoginDivider />

          <p className="mt-6 text-center text-[13px] text-slate">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-teal-dark hover:underline">
              Sign In
            </Link>
          </p>
        </AuthCard>
      </div>
    </div>
  );
}
