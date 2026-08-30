import { createClient } from "@/lib/supabase/server";

const PDF_BUCKET = "resource-pdfs";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    const isAdmin = profile?.role === "admin";

    if (!isAdmin) {
      return Response.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json().catch(() => null);
    const path = body?.path;
    const expiresIn = body?.expiresIn;

    if (typeof path !== "string" || path.length === 0 || path.length > 512) {
      return Response.json({ error: "Missing path" }, { status: 400 });
    }

    if (
      path.includes("..") ||
      path.includes("~") ||
      path.includes("\\") ||
      path.includes("\0") ||
      path.startsWith("/") ||
      path.includes("://") ||
      !/\.pdf$/i.test(path)
    ) {
      return Response.json({ error: "Invalid path" }, { status: 400 });
    }

    const maxExpiry = 3600;
    const parsedExpiry = Math.floor(Number(expiresIn));
    const safeExpiry = Number.isFinite(parsedExpiry)
      ? Math.min(Math.max(parsedExpiry, 60), maxExpiry)
      : 3600;

    const { data, error } = await supabase.storage
      .from(PDF_BUCKET)
      .createSignedUrl(path, safeExpiry);

    if (error) {
      return Response.json(
        { error: "Failed to generate signed URL" },
        { status: 404 },
      );
    }

    return Response.json({ signedUrl: data.signedUrl });
  } catch {
    console.error("signed-url route error");
    return Response.json(
      { error: "Failed to generate signed URL" },
      { status: 500 },
    );
  }
}
