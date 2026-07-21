"use client";

export function SocialLoginDivider() {
  return (
    <>
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-ink/10" />
        </div>
        <div className="relative flex justify-center text-[12px]">
          <span className="bg-white px-3 text-slate">or</span>
        </div>
      </div>
    </>
  );
}
