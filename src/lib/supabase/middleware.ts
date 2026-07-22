import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

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

  const publicPages = [
    "/", "/browse", "/about", "/contact", "/faq",
    "/privacy", "/terms", "/cart", "/checkout",
    "/login", "/register", "/forgot-password",
    "/reset-password", "/verify-email",
  ];

  const isPublicPage =
    publicPages.includes(pathname) || pathname.startsWith("/product/");

  if (!user && !isPublicPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
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
        "/admin/categories", "/admin/reviews", "/admin/analytics",
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

    if (!isPublicPage && !allowedRoutes.includes(pathname)) {
      const url = request.nextUrl.clone();
      url.pathname = role === "admin" ? "/admin" : "/dashboard";
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}
