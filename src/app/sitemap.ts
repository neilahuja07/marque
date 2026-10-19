import type { MetadataRoute } from "next";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { allSubjects } from "@/lib/dummy-data";

/**
 * Canonical production domain for every URL in the sitemap.
 * Kept as an explicit constant (instead of the request origin) so the file
 * always emits production URLs regardless of where it is rendered
 * (localhost, Vercel preview, production).
 */
const SITE_URL = "https://www.scholarstack.online";

/**
 * Public, indexable routes only.
 *
 * Deliberately excluded (see robots.ts + middleware publicPages):
 *  - auth pages: /login /register /forgot-password /reset-password /verify-email
 *  - private app: /dashboard /orders /profile /downloads /settings /admin
 *  - transactional: /cart /checkout /payment-success
 *  - server routes: /api/*  (incl. /api/starter-pack/download)
 */
const staticPages: MetadataRoute.Sitemap = [
  {
    url: `${SITE_URL}/`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1,
  },
  {
    url: `${SITE_URL}/browse`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.9,
  },
  // Category (subject) pages — real routes rendered by /browse?subject=…
  ...allSubjects.map((subject) => ({
    url: `${SITE_URL}/browse?subject=${encodeURIComponent(subject)}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  })),
  {
    url: `${SITE_URL}/about`,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  },
  {
    url: `${SITE_URL}/faq`,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  },
  {
    url: `${SITE_URL}/contact`,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  },
  {
    url: `${SITE_URL}/privacy`,
    changeFrequency: "yearly" as const,
    priority: 0.3,
  },
  {
    url: `${SITE_URL}/terms`,
    changeFrequency: "yearly" as const,
    priority: 0.3,
  },
];

/**
 * Published product pages, read straight from Supabase with the anon key
 * (the same public read the browse page uses).
 *
 * Only `published: true` rows are listed — drafts and unpublished resources
 * must never be advertised to crawlers. If Supabase is unreachable we return
 * no product URLs rather than guessing slugs: a sitemap entry that 404s is
 * worse than a missing entry.
 */
async function getProductPages(): Promise<MetadataRoute.Sitemap> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !anonKey) {
    console.warn("sitemap: Supabase env not configured — product URLs omitted");
    return [];
  }

  try {
    const supabase = createSupabaseClient(supabaseUrl, anonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const { data, error } = await supabase
      .from("products")
      .select("slug, updated_at, published")
      .eq("published", true)
      .order("updated_at", { ascending: false });

    if (error) {
      console.error("sitemap: product query failed:", error.message);
      return [];
    }

    return (data ?? [])
      .filter((row) => typeof row.slug === "string" && row.slug.length > 0)
      .map((row) => ({
        url: `${SITE_URL}/product/${row.slug}`,
        lastModified: row.updated_at ?? undefined,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }));
  } catch (err) {
    console.error(
      "sitemap: could not reach Supabase:",
      err instanceof Error ? err.message : err,
    );
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const productPages = await getProductPages();
  return [...staticPages, ...productPages];
}
