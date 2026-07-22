import Link from "next/link";

const footerSections = [
  {
    title: "Subjects",
    links: [
      { label: "Mathematics", href: "/browse?subject=Mathematics" },
      { label: "Science", href: "/browse?subject=Science" },
      { label: "English", href: "/browse?subject=English" },
    ],
  },
  {
    title: "Resource types",
    links: [
      { label: "Past papers", href: "/browse" },
      { label: "Mock tests", href: "/browse" },
      { label: "Revision notes", href: "/browse" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Log in", href: "/login" },
      { label: "Sign up", href: "/register" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-6">
          <div className="col-span-2">
            <span className="font-display text-[20px] text-ink">Marque</span>
            <p className="mt-3 max-w-xs text-[13px] text-slate">
              Cambridge-aligned study resources, written and checked against real
              syllabus codes.
            </p>
          </div>
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-[13px] font-medium text-ink">{section.title}</h4>
              <ul className="mt-3 space-y-0.5 text-[13px] text-slate">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="block py-1.5 transition-colors hover:text-ink">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-ink/10 pt-6 text-[12px] text-slate sm:flex-row sm:items-center">
          <span>
            &copy; 2026 Marque Education Ltd. Not affiliated with Cambridge Assessment
            International Education.
          </span>
          <div className="flex gap-5">
            <Link href="/terms" className="transition-colors hover:text-ink">
              Terms
            </Link>
            <Link href="/privacy" className="transition-colors hover:text-ink">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
