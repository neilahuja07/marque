/**
 * Resolves the canonical public site URL for the app.
 *
 * Uses NEXT_PUBLIC_SITE_URL when defined (set in the production Vercel
 * environment to the deployed Scholar Stack URL). Falls back to the current
 * browser origin so local development (http://localhost:3000) keeps working
 * without any extra configuration.
 */
export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  if (configured) return configured.replace(/\/+$/, "");

  // In the browser we can safely derive the origin from window.location.
  // This keeps local dev (localhost:3000) and Vercel preview deployments
  // working without setting the env var.
  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  return "http://localhost:3000";
}
