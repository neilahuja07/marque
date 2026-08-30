import Razorpay from "razorpay";
import { usdToPaise } from "@/lib/currency";
import { createClient, createServiceClient } from "@/lib/supabase/server";

const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;
const razorpayKeyId = process.env.RAZORPAY_KEY_ID;

const razorpay = new Razorpay({
  key_id: razorpayKeyId || "",
  key_secret: razorpayKeySecret || "",
});

const MAX_ITEMS = 50;
const MAX_QUANTITY = 10;

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { items, receipt, notes } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return Response.json(
        { error: "At least one item is required" },
        { status: 400 },
      );
    }

    if (items.length > MAX_ITEMS) {
      return Response.json(
        { error: "Too many items in order" },
        { status: 400 },
      );
    }

    for (const item of items) {
      const productId = item?.productId;
      const quantity = Math.floor(Number(item?.quantity) || 0);
      if (typeof productId !== "string" || productId.length === 0 || quantity < 1 || quantity > MAX_QUANTITY) {
        return Response.json(
          { error: "Each item must have a valid productId and quantity" },
          { status: 400 },
        );
      }
    }

    const productIds = items.map((item: { productId: string }) => item.productId);
    const { data: products, error: productError } = await supabase
      .from("products")
      .select("id, title, price, published")
      .in("id", productIds);

    if (productError || !products) {
      return Response.json(
        { error: "Failed to verify products" },
        { status: 500 },
      );
    }

    const productMap = new Map(products.map((p) => [p.id, p]));

    let totalUsd = 0;
    const orderItems: {
      productId: string;
      title: string;
      price: number;
      quantity: number;
    }[] = [];

    for (const item of items) {
      const product = productMap.get(item.productId);
      const quantity = Math.floor(Number(item.quantity) || 1);
      if (!product || !product.published) {
        return Response.json(
          { error: "Product not found or not available" },
          { status: 400 },
        );
      }
      if (quantity < 1 || quantity > MAX_QUANTITY) {
        return Response.json(
          { error: "Invalid quantity" },
          { status: 400 },
        );
      }
      totalUsd += product.price * quantity;
      orderItems.push({
        productId: product.id,
        title:
          typeof item.title === "string"
            ? item.title.slice(0, 200)
            : product.title,
        price: product.price,
        quantity,
      });
    }

    const amountInPaise = usdToPaise(totalUsd);

    const safeNotes: Record<string, string | number | null> = {};
    if (isPlainObject(notes)) {
      for (const [key, value] of Object.entries(notes)) {
        if (["string", "number"].includes(typeof value)) {
          safeNotes[key] = value as string | number;
        }
      }
    }
    if (user && !userError && Object.keys(safeNotes).length < 20) {
      safeNotes.userId = user.id;
    }

    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: receipt || `rcpt_${Date.now()}`,
      notes: safeNotes,
    });

    // Persist the authoritative pending order server-side BEFORE the client
    // pays. This is what closes H1: the items/quantities/amount below are the
    // single source of truth for /api/razorpay/verify, which must NOT trust
    // any client-submitted items.
    const service = createServiceClient();

    const safeEmail =
      (user?.email && typeof user.email === "string" && user.email.trim()) ||
      (typeof safeNotes.email === "string" && safeNotes.email.trim()) ||
      "";

    const { data: pendingOrder, error: orderError } = await service
      .from("orders")
      .insert({
        user_id: user?.id || null,
        email: safeEmail,
        razorpay_order_id: order.id,
        amount: totalUsd,
        currency: "USD",
        status: "created",
        notes: Object.keys(safeNotes).length > 0 ? JSON.stringify(safeNotes) : null,
      })
      .select("id")
      .single();

    if (orderError || !pendingOrder) {
      console.error(
        "order: failed to persist pending order",
        orderError?.message,
      );
      return Response.json(
        { error: "Failed to create order" },
        { status: 500 },
      );
    }

    const { error: itemsError } = await service
      .from("order_items")
      .insert(
        orderItems.map((item) => ({
          order_id: pendingOrder.id,
          product_id: item.productId,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
        })),
      );

    if (itemsError) {
      console.error(
        "order: failed to persist order items",
        itemsError.message,
      );
      const { error: cleanupError } = await service
        .from("orders")
        .delete()
        .eq("id", pendingOrder.id);
      if (cleanupError) {
        console.error("order: failed to clean up pending order", cleanupError.message);
      }
      return Response.json(
        { error: "Failed to create order" },
        { status: 500 },
      );
    }

    return Response.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (err: unknown) {
    console.error(
      "Failed to create Razorpay order",
      err instanceof Error ? err.message : err,
    );
    return Response.json(
      { error: "Failed to create order" },
      { status: 500 },
    );
  }
}