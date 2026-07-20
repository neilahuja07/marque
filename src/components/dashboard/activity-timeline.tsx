interface TimelineItem {
  icon: React.ReactNode;
  label: string;
  date: string;
  color?: "sage" | "brass" | "teal" | "slate";
}

interface ActivityTimelineProps {
  items: TimelineItem[];
}

const colorMap: Record<string, string> = {
  sage: "bg-sage/15 text-teal-dark",
  brass: "bg-brass/10 text-brass",
  teal: "bg-teal-dark/10 text-teal-dark",
  slate: "bg-parchment text-slate",
};

export function ActivityTimeline({ items }: ActivityTimelineProps) {
  return (
    <div className="space-y-0">
      {items.map((item, i) => (
        <div key={i} className="flex gap-4">
          {/* Line */}
          <div className="flex flex-col items-center">
            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${colorMap[item.color || "sage"]}`}>
              {item.icon}
            </div>
            {i < items.length - 1 && (
              <div className="w-px flex-1 bg-ink/8" />
            )}
          </div>
          {/* Content */}
          <div className={`flex-1 ${i < items.length - 1 ? "pb-6" : "pb-0"}`}>
            <p className="text-[13px] font-medium text-ink">{item.label}</p>
            <p className="mt-0.5 text-[12px] text-slate">{item.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
