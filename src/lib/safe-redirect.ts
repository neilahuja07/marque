/**
 * Safe post-login redirect handling.
 *
 * Prevents open redirects: only same-origin http(s) paths are allowed.
 * Used by the middleware (authoritative, server-side) and by the login
 * page (defense in depth). Intentionally isomorphic so both can share it.
 */

export const DEFAULT_REDIRECT_PATH = "/dashboard";

/**
 * Decodes percent-encoding repeatedly until the value is stable, so that
 * double-encoded payloads (e.g. "%252F%252Fevil.com") cannot hide a scheme
 * or a protocol-relative prefix behind more than one layer of encoding.
 */
function decodeUntilStable(value: string, maxDepth = 3): string {
  let current = value;
  for (let i = 0; i < maxDepth; i += 1) {
    let next: string;
    try {
      next = decodeURIComponent(current);
    } catch {
      break;
    }
    if (next === current) break;
    current = next;
  }
  return current;
}

/**
 * Given a raw `redirect` query value (already decoded once by the URL
 * parser/call-site) and the site origin, returns a safe, same-origin path
 * or the DEFAULT_REDIRECT_PATH fallback.
 *
 * Rejects absolute externals (https://evil.com), protocol-relative URLs
 * (//evil.com, ///evil.com, backslash variants), and any non-http(s)
 * scheme (javascript:, data:, etc.).
 */
export function sanitizeRedirectPath(
  value: string | null | undefined,
  baseOrigin: string,
): string {
  if (!value) {
    return DEFAULT_REDIRECT_PATH;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return DEFAULT_REDIRECT_PATH;
  }

  const candidate = decodeUntilStable(trimmed);

  let parsed: URL;
  try {
    parsed = new URL(candidate, baseOrigin);
  } catch {
    return DEFAULT_REDIRECT_PATH;
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    return DEFAULT_REDIRECT_PATH;
  }

  let base: URL;
  try {
    base = new URL(baseOrigin);
  } catch {
    return DEFAULT_REDIRECT_PATH;
  }

  if (parsed.origin !== base.origin) {
    return DEFAULT_REDIRECT_PATH;
  }

  const redirect = `${parsed.pathname}${parsed.search}${parsed.hash}`;

  // Belt-and-suspenders: the URL parser may normalize an ambiguous input to
  // a same-origin URL whose path still begins with "//" (protocol-relative
  // looking). Never hand such a value to the router/dangerously. Also refuse
  // stray backslashes in the final value outright.
  if (redirect.startsWith("//") || redirect.includes("\\")) {
    return DEFAULT_REDIRECT_PATH;
  }

  return redirect;
}