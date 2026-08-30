import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import { sanitizeRedirectPath } from "@/lib/safe-redirect";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return supabaseResponse;
  }

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options),
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  // Server-side validation of the post-login `redirect` parameter to prevent
  // open redirects. Rewrites the URL to a sanitized value so the client only
  // ever receives a safe, same-origin path. Only rewrites when the value
  // actually changes, so legitimate internal redirects add no extra hop.
  if (pathname === "/login") {
    const rawRedirect = request.nextUrl.searchParams.get("redirect");
    if (rawRedirect !== null) {
      const safeRedirect = sanitizeRedirectPath(
        rawRedirect,
        request.nextUrl.origin,
      );
      if (safeRedirect !== rawRedirect) {
        const url = request.nextUrl.clone();
        url.searchParams.set("redirect", safeRedirect);
        return NextResponse.redirect(url);
      }
    }
  }

  const publicPages = [
    "/", "/browse", "/about", "/contact", "/faq",
    "/privacy", "/terms", "/cart", "/checkout",
    "/login", "/register", "/forgot-password",
    "/reset-password", "/verify-email",
  ];

  const isPublicPage =
    publicPages.includes(pathname) || pathname.startsWith("/product/");

  const isApiRoute = pathname.startsWith("/api/");

  const protectedApiRoutes = [
    "/api/starter-pack/download",
  ];

  const isProtectedApiRoute = isApiRoute && protectedApiRoutes.some((route) => pathname.startsWith(route));

  if (!user && !isPublicPage && !isApiRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (!user && isProtectedApiRoute) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    const role = (profile?.role as string) || "student";

    const dashboardRoutes: Record<string, string[]> = {
      student: [
        "/dashboard", "/dashboard/downloads", "/dashboard/orders",
        "/dashboard/profile", "/settings",
        "/orders", "/profile", "/downloads",
      ],
      admin: [
        "/admin", "/admin/users", "/admin/resources", "/admin/orders",
        "/admin/categories", "/admin/analytics",
        "/admin/settings",
      ],
    };

    const allowedRoutes = dashboardRoutes[role] || dashboardRoutes.student;

    const isAuthPage =
      pathname === "/login" ||
      pathname === "/register" ||
      pathname === "/forgot-password" ||
      pathname === "/verify-email";

    if (isAuthPage) {
      const url = request.nextUrl.clone();
      url.pathname = role === "admin" ? "/admin" : "/dashboard";
      return NextResponse.redirect(url);
    }

    if (!isPublicPage && !isApiRoute && !allowedRoutes.includes(pathname)) {
      const url = request.nextUrl.clone();
      url.pathname = role === "admin" ? "/admin" : "/dashboard";
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}
