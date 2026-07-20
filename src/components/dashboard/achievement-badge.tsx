interface AchievementBadgeProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

export function AchievementBadge({ icon, label, value }: AchievementBadgeProps) {
  return (
    <div className="flex items-center gap-3.5 rounded-[10px] border border-ink/10 bg-white p-4 transition-all hover:shadow-sm">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] bg-brass/10 text-brass">
        {icon}
      </div>
      <div>
        <p className="text-[15px] font-medium text-ink">{value}</p>
        <p className="text-[12px] text-slate">{label}</p>
      </div>
    </div>
  );
}
