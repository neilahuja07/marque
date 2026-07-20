"use client";

import Link from "next/link";
import { useState } from "react";

type AuthMode = "signin" | "signup";

export function HeroAuthForm() {
  const [mode, setMode] = useState<AuthMode>("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");

  if (forgotPassword) {
    return (
      <div className="rounded-[var(--radius-card)] border border-ink/10 bg-white p-6 shadow-[var(--shadow-soft)]">
        <p className="exam-code text-[12px] text-brass">Account recovery</p>
        <h3 className="mt-2 font-display text-[22px] text-ink">Reset password</h3>
        <p className="mt-2 text-[13px] leading-relaxed text-slate">
          Enter your email and we&apos;ll send you a reset link.
        </p>
        <form onSubmit={(e) => e.preventDefault()} className="mt-5 space-y-4">
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
              className="input-field mt-1.5 block w-full rounded-[8px] border border-ink/15 bg-parchment px-3.5 py-3 text-[14px] text-ink placeholder:text-ink/40"
            />
          </div>
          <button
            type="submit"
            className="btn-primary w-full rounded-[8px] bg-teal-dark px-4 py-3 text-[14px] font-medium text-white"
          >
            Send reset link
          </button>
        </form>
        <p className="mt-4 text-center text-[13px] text-slate">
          Remember your password?{" "}
          <button
            onClick={() => {
              setForgotPassword(false);
              setEmail(forgotEmail);
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
          onClick={() => { setMode("signin"); setShowPassword(false); setShowConfirmPassword(false); }}
          className={`py-1.5 text-[14px] font-medium transition-colors ${
            mode === "signin" ? "text-ink" : "text-ink/40 hover:text-ink/60"
          }`}
        >
          Sign in
        </button>
        <span className="text-ink/20">|</span>
        <button
          onClick={() => { setMode("signup"); setShowPassword(false); setShowConfirmPassword(false); }}
          className={`py-1.5 text-[14px] font-medium transition-colors ${
            mode === "signup" ? "text-ink" : "text-ink/40 hover:text-ink/60"
          }`}
        >
          Sign up
        </button>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="mt-4 space-y-3.5">
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
                onClick={() => setForgotPassword(true)}
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
          className="btn-primary mt-1 w-full rounded-[8px] bg-teal-dark px-4 py-3 text-[14px] font-medium text-white"
        >
          {mode === "signin" ? "Sign in" : "Create account"}
        </button>
      </form>

      {/* Social */}
      <div className="relative my-5">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-ink/10" />
        </div>
        <div className="relative flex justify-center text-[12px]">
          <span className="bg-white px-2.5 text-slate">or</span>
        </div>
      </div>

      <div className="space-y-2.5">
        <button className="btn-outline flex w-full items-center justify-center gap-2.5 rounded-[8px] border border-ink/15 bg-parchment px-3 py-3 text-[13px] font-medium text-ink">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Continue with Google
        </button>
      </div>

      <p className="mt-4 text-center text-[13px] text-slate">
        {mode === "signin" ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
          onClick={() => {
            setMode(mode === "signin" ? "signup" : "signin");
            setShowPassword(false);
            setShowConfirmPassword(false);
          }}
          className="py-1 font-medium text-teal-dark hover:underline"
        >
          {mode === "signin" ? "Sign up for free" : "Sign in"}
        </button>
      </p>
    </div>
  );
}
