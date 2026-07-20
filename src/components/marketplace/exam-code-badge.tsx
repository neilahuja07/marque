import Link from "next/link";

export function ExamCodeBadge({ code }: { code: string }) {
  return (
    <span className="exam-code inline-flex rounded border border-ink/15 bg-warm-gray px-2 py-0.5 text-[11px] text-slate">
      {code}
    </span>
  );
}
