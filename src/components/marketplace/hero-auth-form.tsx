"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type AuthMode = "signin" | "signup";

export function HeroAuthForm() {
  const router = useRouter();
  const supabase = createClient();
  const [mode, setMode] = useState<AuthMode>("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [forgotSent, setForgotSent] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setIsLoading(false);

    if (error) {
      if (error.message.includes("Email not confirmed")) {
        setError("Please verify your email before signing in.");
      } else {
        setError(error.message);
      }
      return;
    }

    router.push("/dashboard");
    router.refresh();
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setIsLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name, role: "student" },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    setIsLoading(false);

    if (error) {
      if (error.message.includes("already registered")) {
        setError("An account with this email already exists.");
      } else {
        setError(error.message);
      }
      return;
    }

    sessionStorage.setItem("marque_signup_email", email);
    router.push("/verify-email");
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(forgotEmail, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    setIsLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setForgotSent(true);
  };

  if (forgotPassword) {
    return (
      <div className="rounded-[var(--radius-card)] border border-ink/10 bg-white p-6 shadow-[var(--shadow-soft)]">
        <p className="exam-code text-[12px] text-brass">Account recovery</p>
        <h3 className="mt-2 font-display text-[22px] text-ink">Reset password</h3>
        <p className="mt-2 text-[13px] leading-relaxed text-slate">
          Enter your email and we&apos;ll send you a reset link.
        </p>

        {error && (
          <div className="mt-3 rounded-[8px] border border-red-200 bg-red-50 p-3 text-[12px] text-red-600">
            {error}
          </div>
        )}

        {forgotSent ? (
          <div className="mt-5 space-y-4">
            <div className="rounded-[8px] border border-sage/30 bg-sage/5 p-3 text-center text-[13px] text-teal-dark">
              Check your inbox for the reset link.
            </div>
            <button
              onClick={() => {
                setForgotPassword(false);
                setForgotSent(false);
                setForgotEmail("");
                setError("");
              }}
              className="w-full rounded-[8px] border border-ink/15 bg-parchment px-4 py-3 text-[13px] font-medium text-ink transition-all hover:bg-warm-gray"
            >
              Back to sign in
            </button>
          </div>
        ) : (
          <form onSubmit={handleForgotPassword} className="mt-5 space-y-4">
            <div>
              <label htmlFor="forgot-email-hero" className="block text-[13px] font-medium text-ink">
                Email address
              </label>
              <input
                id="forgot-email-hero"
                type="email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="input-field mt-1.5 block w-full rounded-[8px] border border-ink/15 bg-parchment px-3.5 py-3 text-[14px] text-ink placeholder:text-ink/40"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full rounded-[8px] bg-teal-dark px-4 py-3 text-[14px] font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Sending…" : "Send reset link"}
            </button>
          </form>
        )}

        <p className="mt-4 text-center text-[13px] text-slate">
          Remember your password?{" "}
          <button
            onClick={() => {
              setForgotPassword(false);
              setForgotSent(false);
              setEmail(forgotEmail);
              setError("");
            }}
            className="py-1 font-medium text-teal-dark hover:underline"
          >
            Sign in
          </button>
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-[var(--radius-card)] border border-ink/10 bg-white p-6 shadow-[var(--shadow-soft)]">
      <div className="flex items-center gap-2 border-b border-ink/10 pb-3">
        <button
          onClick={() => { setMode("signin"); setShowPassword(false); setShowConfirmPassword(false); setError(""); }}
          className={`py-1.5 text-[14px] font-medium transition-colors ${
            mode === "signin" ? "text-ink" : "text-ink/40 hover:text-ink/60"
          }`}
        >
          Sign in
        </button>
        <span className="text-ink/20">|</span>
        <button
          onClick={() => { setMode("signup"); setShowPassword(false); setShowConfirmPassword(false); setError(""); }}
          className={`py-1.5 text-[14px] font-medium transition-colors ${
            mode === "signup" ? "text-ink" : "text-ink/40 hover:text-ink/60"
          }`}
        >
          Sign up
        </button>
      </div>

      {error && (
        <div className="mt-3 rounded-[8px] border border-red-200 bg-red-50 p-3 text-[12px] text-red-600">
          {error}
        </div>
      )}

      <form onSubmit={mode === "signin" ? handleSignIn : handleSignUp} className="mt-4 space-y-3.5">
        {mode === "signup" && (
          <div>
            <label htmlFor="hero-name" className="block text-[13px] font-medium text-ink">
              Full name
            </label>
            <input
              id="hero-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Amara Osei"
              className="input-field mt-1.5 block w-full rounded-[8px] border border-ink/15 bg-parchment px-3.5 py-3 text-[14px] text-ink placeholder:text-ink/40"
            />
          </div>
        )}

        <div>
          <label htmlFor="hero-email" className="block text-[13px] font-medium text-ink">
            Email address
          </label>
          <input
            id="hero-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="input-field mt-1.5 block w-full rounded-[8px] border border-ink/15 bg-parchment px-3.5 py-3 text-[14px] text-ink placeholder:text-ink/40"
          />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="hero-password" className="block text-[13px] font-medium text-ink">
              Password
            </label>
            {mode === "signin" && (
              <button
                type="button"
                onClick={() => { setForgotPassword(true); setError(""); }}
                className="py-1 text-[12px] text-teal-dark hover:underline"
              >
                Forgot password?
              </button>
            )}
          </div>
          <div className="relative mt-1.5">
            <input
              id="hero-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="input-field block w-full rounded-[8px] border border-ink/15 bg-parchment px-3.5 py-3 pr-11 text-[14px] text-ink placeholder:text-ink/40"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-1 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded text-ink/30 transition-colors duration-200 hover:text-ink/60"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {mode === "signup" && (
          <div>
            <label htmlFor="hero-confirm" className="block text-[13px] font-medium text-ink">
              Confirm password
            </label>
            <div className="relative mt-1.5">
              <input
                id="hero-confirm"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="input-field block w-full rounded-[8px] border border-ink/15 bg-parchment px-3.5 py-3 pr-11 text-[14px] text-ink placeholder:text-ink/40"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-1 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded text-ink/30 transition-colors duration-200 hover:text-ink/60"
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? (
                  <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary mt-1 w-full rounded-[8px] bg-teal-dark px-4 py-3 text-[14px] font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
        </button>
      </form>

      <p className="mt-4 text-center text-[13px] text-slate">
        {mode === "signin" ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
          onClick={() => {
            setMode(mode === "signin" ? "signup" : "signin");
            setShowPassword(false);
            setShowConfirmPassword(false);
            setError("");
          }}
          className="py-1 font-medium text-teal-dark hover:underline"
        >
          {mode === "signin" ? "Sign up for free" : "Sign in"}
        </button>
      </p>
    </div>
  );
}
