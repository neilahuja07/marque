import type { MetadataRoute } from "next";

const SITE_URL = "https://www.scholarstack.online";

/**
 * Public marketing/storefront pages stay crawlable; auth, dashboard, admin,
 * API and checkout routes are hidden from crawlers (they are also absent
 * from sitemap.ts). Nothing under / or /browse or /product is blocked.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin",
        "/dashboard",
        "/api/",
        "/login",
        "/register",
        "/forgot-password",
        "/reset-password",
        "/verify-email",
        "/payment-success",
        "/orders",
        "/profile",
        "/downloads",
        "/settings",
        "/cart",
        "/checkout",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
