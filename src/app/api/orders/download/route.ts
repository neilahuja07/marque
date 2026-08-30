import { createClient } from "@/lib/supabase/server";

const PDF_BUCKET = "resource-pdfs";

function toAsciiFilename(value: string): string {
  return value
    .replace(/[\\/:*?"<>|]+/g, "_")
    .replace(/[^\x20-\x7E]/g, "_")
    .trim();
}

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

    const body = await request.json().catch(() => null);
    const productId = body?.productId;

    if (typeof productId !== "string" || productId.length === 0) {
      return Response.json({ error: "Missing product" }, { status: 400 });
    }

    const { data: product, error: productError } = await supabase
      .from("products")
      .select("id, title, pdf_path")
      .eq("id", productId)
      .maybeSingle();

    if (productError || !product) {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }

    if (!product.pdf_path) {
      return Response.json(
        { error: "This resource has no file attached yet." },
        { status: 404 },
      );
    }

    const { data: paidItems, error: itemsError } = await supabase
      .from("order_items")
      .select("order_id")
      .eq("product_id", productId);

    if (itemsError) {
      return Response.json(
        { error: "Failed to verify purchase" },
        { status: 500 },
      );
    }

    if (!paidItems || paidItems.length === 0) {
      return Response.json(
        { error: "You have not purchased this resource." },
        { status: 403 },
      );
    }

    const orderIds = paidItems.map((item: { order_id: string }) => item.order_id);
    const { data: paidOrders, error: orderError } = await supabase
      .from("orders")
      .select("id")
      .eq("user_id", user.id)
      .eq("status", "paid")
      .in("id", orderIds)
      .limit(1);

    if (orderError) {
      return Response.json(
        { error: "Failed to verify purchase" },
        { status: 500 },
      );
    }

    if (!paidOrders || paidOrders.length === 0) {
      return Response.json(
        { error: "You have not purchased this resource." },
        { status: 403 },
      );
    }

    const { data, error: downloadError } = await supabase.storage
      .from(PDF_BUCKET)
      .download(product.pdf_path);

    if (downloadError || !data) {
      console.error(
        "orders/download storage error for",
        product.pdf_path,
        "->",
        downloadError?.message || "no data",
      );
      return Response.json(
        { error: "Failed to prepare download." },
        { status: 500 },
      );
    }

    const baseName = `${product.title || "resource"}`.trim() || "resource";
    const asciiName = `${toAsciiFilename(baseName)}.pdf`;
    const encodedName = encodeURIComponent(`${baseName}.pdf`);

    return new Response(data, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${asciiName}"; filename*=UTF-8''${encodedName}`,
      },
    });
  } catch (err: unknown) {
    console.error("orders/download error:", err instanceof Error ? err.message : err);
    return Response.json(
      { error: "Failed to prepare download." },
      { status: 500 },
    );
  }
}
