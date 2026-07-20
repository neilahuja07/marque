import Link from "next/link";

const themes: Record<
  string,
  { badge: string; iconWrap: string; icon: React.ReactNode; ring: string }
> = {
  sage: {
    badge: "bg-sage/20 text-teal-dark",
    iconWrap: "bg-sage/15 text-teal-dark",
    ring: "group-hover:border-sage",
    icon: (
      <path d="M4 17l5-9 4 6 3-4 4 7M4 17h16" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  teal: {
    badge: "bg-teal/10 text-teal-dark",
    iconWrap: "bg-teal/10 text-teal-dark",
    ring: "group-hover:border-teal",
    icon: (
      <>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 4a8 12 0 0 1 0 16 8 12 0 0 1 0-16z M4 12h16" strokeLinecap="round" />
      </>
    ),
  },
  brass: {
    badge: "bg-brass/15 text-brass",
    iconWrap: "bg-brass/15 text-brass",
    ring: "group-hover:border-brass",
    icon: (
      <path d="M5 4h11l3 3v13H5V4z M9 9h7M9 13h7M9 17h4" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
};

export function CategoryCard({
  name,
  slug,
  description,
  accent,
}: {
  name: string;
  slug: string;
  description: string;
  accent: string;
}) {
  const t = themes[accent];
  return (
    <Link
      href={`/categories/${slug}`}
      className={`card-hover group relative flex flex-col justify-between overflow-hidden rounded-[var(--radius-card)] border border-ink/10 bg-white p-7 ${t.ring}`}
    >
      <div className={`absolute -right-8 -top-8 h-32 w-32 rounded-full ${t.iconWrap} opacity-40 blur-2xl`} />
      <div className="relative">
        <div>
          <span className={`flex h-11 w-11 items-center justify-center rounded-[10px] ${t.iconWrap}`}>
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
              {t.icon}
            </svg>
          </span>
        </div>
        <h3 className="mt-6 font-display text-[23px] text-ink">{name}</h3>
        <p className="mt-1.5 text-[14px] leading-relaxed text-slate">{description}</p>
      </div>
      <span className="relative mt-8 inline-flex items-center gap-1.5 text-[13px] font-medium text-teal-dark transition-all group-hover:gap-2.5">
        Browse {name.toLowerCase()}
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  );
}
