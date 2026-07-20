"use client";

import { FadeIn } from "@/components/ui/fade-in";

/* ── Bar Chart ── */
interface BarChartProps {
  data: { label: string; value: number }[];
  title?: string;
  height?: number;
  color?: string;
}

export function BarChart({ data, title, height = 200, color = "bg-teal-dark" }: BarChartProps) {
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <FadeIn>
      <div className="rounded-[12px] border border-ink/10 bg-white p-5 sm:p-6">
        {title && <h3 className="font-display text-[16px] text-ink">{title}</h3>}
        <div className="mt-4 flex items-end gap-1.5" style={{ height }}>
          {data.map((d, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
              <span className="text-[10px] font-medium text-slate">${d.value >= 1000 ? `${(d.value / 1000).toFixed(1)}k` : d.value}</span>
              <div
                className={`w-full rounded-t-[4px] ${color} transition-all duration-500`}
                style={{ height: `${(d.value / max) * 100}%`, minHeight: 4 }}
              />
            </div>
          ))}
        </div>
        <div className="mt-2 flex gap-1.5">
          {data.map((d, i) => (
            <div key={i} className="flex flex-1 text-center">
              <span className="text-[10px] text-ink/40 w-full truncate">{d.label}</span>
            </div>
          ))}
        </div>
      </div>
    </FadeIn>
  );
}

/* ── Line Chart ── */
interface LineChartProps {
  data: { label: string; value: number }[];
  title?: string;
  height?: number;
  color?: string;
}

export function LineChart({ data, title, height = 180, color = "stroke-teal-dark" }: LineChartProps) {
  const max = Math.max(...data.map((d) => d.value), 1);
  const padding = 20;
  const chartWidth = 600;
  const chartHeight = height - padding * 2;

  const points = data.map((d, i) => {
    const x = padding + (i / (data.length - 1 || 1)) * (chartWidth - padding * 2);
    const y = chartHeight + padding - (d.value / max) * chartHeight;
    return `${x},${y}`;
  });

  const pathD = `M ${points.join(" L ")}`;
  const areaD = `${pathD} L ${padding + ((data.length - 1) / (data.length - 1 || 1)) * (chartWidth - padding * 2)},${chartHeight + padding} L ${padding},${chartHeight + padding} Z`;

  return (
    <FadeIn>
      <div className="rounded-[12px] border border-ink/10 bg-white p-5 sm:p-6">
        {title && <h3 className="font-display text-[16px] text-ink">{title}</h3>}
        <div className="mt-4 overflow-hidden">
          <svg viewBox={`0 0 ${chartWidth} ${height}`} className="w-full" preserveAspectRatio="none">
            {/* Grid lines */}
            {[0.25, 0.5, 0.75, 1].map((pct) => (
              <line
                key={pct}
                x1={padding}
                y1={chartHeight + padding - pct * chartHeight}
                x2={chartWidth - padding}
                y2={chartHeight + padding - pct * chartHeight}
                stroke="currentColor"
                className="text-ink/5"
                strokeWidth="1"
              />
            ))}
            {/* Area fill */}
            <path d={areaD} className="fill-teal-dark/5" />
            {/* Line */}
            <path d={pathD} className={`${color} fill-none`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            {/* Dots */}
            {data.map((d, i) => {
              const x = padding + (i / (data.length - 1 || 1)) * (chartWidth - padding * 2);
              const y = chartHeight + padding - (d.value / max) * chartHeight;
              return <circle key={i} cx={x} cy={y} r="3" className="fill-teal-dark" />;
            })}
          </svg>
        </div>
        <div className="mt-2 flex justify-between px-5">
          {data.map((d, i) => (
            <span key={i} className="text-[10px] text-ink/40">{d.label}</span>
          ))}
        </div>
      </div>
    </FadeIn>
  );
}

/* ── Donut Chart ── */
interface DonutChartProps {
  data: { label: string; value: number; color: string }[];
  title?: string;
  size?: number;
}

export function DonutChart({ data, title, size = 160 }: DonutChartProps) {
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const radius = size / 2 - 10;
  const strokeWidth = 20;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <FadeIn>
      <div className="rounded-[12px] border border-ink/10 bg-white p-5 sm:p-6">
        {title && <h3 className="font-display text-[16px] text-ink">{title}</h3>}
        <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row sm:items-start">
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {data.map((d, i) => {
              const pct = d.value / total;
              const dashLen = pct * circumference;
              const dashOff = offset;
              offset += dashLen;
              return (
                <circle
                  key={i}
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="none"
                  stroke={d.color}
                  strokeWidth={strokeWidth}
                  strokeDasharray={`${dashLen} ${circumference - dashLen}`}
                  strokeDashoffset={-dashOff}
                  strokeLinecap="round"
                  className="transition-all duration-700"
                />
              );
            })}
          </svg>
          <div className="space-y-2">
            {data.map((d, i) => (
              <div key={i} className="flex items-center gap-2.5 text-[13px]">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: d.color }} />
                <span className="text-slate">{d.label}</span>
                <span className="ml-auto font-medium text-ink">{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </FadeIn>
  );
}
