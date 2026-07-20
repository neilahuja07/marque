import { type ReactNode } from "react";

interface AuthFormInputProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  success?: boolean;
  disabled?: boolean;
  rightElement?: ReactNode;
  hint?: string;
  maxLength?: number;
}

export function AuthFormInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  error,
  success,
  disabled = false,
  rightElement,
  hint,
  maxLength,
}: AuthFormInputProps) {
  const hasError = !!error;
  const hasSuccess = success && !hasError && value.length > 0;

  return (
    <div>
      <label htmlFor={id} className="block text-[13px] font-medium text-ink/70">
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </label>
      <div className="relative mt-1.5">
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          maxLength={maxLength}
          className={`input-field w-full rounded-[8px] border bg-parchment px-3.5 py-3 text-[14px] text-ink placeholder:text-ink/40 ${
            hasError
              ? "border-red-400 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.08)]"
              : hasSuccess
                ? "border-sage focus:border-teal-dark"
                : "border-ink/15"
          } ${disabled ? "cursor-not-allowed opacity-50" : ""} ${
            rightElement ? "pr-11" : ""
          }`}
        />
        {rightElement && (
          <div className="absolute right-1 top-1/2 -translate-y-1/2">
            {rightElement}
          </div>
        )}
        {hasSuccess && !rightElement && (
          <svg viewBox="0 0 24 24" className="absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-sage" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </div>
      {hint && !hasError && (
        <p className="mt-1.5 text-[12px] text-slate">{hint}</p>
      )}
      {hasError && (
        <p className="mt-1.5 text-[12px] text-red-500">{error}</p>
      )}
    </div>
  );
}

interface PasswordInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  success?: boolean;
  disabled?: boolean;
  showPassword: boolean;
  onToggleVisibility: () => void;
}

export function PasswordInput({
  id,
  label,
  value,
  onChange,
  placeholder = "••••••••",
  required = false,
  error,
  success,
  disabled = false,
  showPassword,
  onToggleVisibility,
}: PasswordInputProps) {
  const hasError = !!error;
  const hasSuccess = success && !hasError && value.length > 0;

  return (
    <div>
      <label htmlFor={id} className="block text-[13px] font-medium text-ink/70">
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </label>
      <div className="relative mt-1.5">
        <input
          id={id}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={`input-field w-full rounded-[8px] border bg-parchment px-3.5 py-3 pr-11 text-[14px] text-ink placeholder:text-ink/40 ${
            hasError
              ? "border-red-400 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.08)]"
              : hasSuccess
                ? "border-sage focus:border-teal-dark"
                : "border-ink/15"
          } ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
        />
        <button
          type="button"
          onClick={onToggleVisibility}
          disabled={disabled}
          className="absolute right-1 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded text-ink/30 transition-colors duration-200 hover:text-ink/60 disabled:cursor-not-allowed disabled:opacity-50"
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
      {hasError && (
        <p className="mt-1.5 text-[12px] text-red-500">{error}</p>
      )}
    </div>
  );
}
