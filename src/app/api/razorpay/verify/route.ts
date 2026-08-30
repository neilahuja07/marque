import crypto from "crypto";
import Razorpay from "razorpay";
import { usdToPaise } from "@/lib/currency";
import { createClient, createServiceClient } from "@/lib/supabase/server";

// Read-only Razorpay client used to confirm the amount that was actually
// charged on the Razorpay order created by /api/razorpay/order.
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "",
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return Response.json(
        { error: "Missing payment verification parameters" },
        { status: 400 },
      );
    }

    const secret = process.env.RAZORPAY_KEY_SECRET;
    const expectedSignature = crypto
      .createHmac("sha256", secret!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return Response.json(
        { error: "Invalid payment signature" },
        { status: 400 },
      );
    }

    const supabase = await createClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    // The pending order was persisted server-side by /api/razorpay/order.
    // The client can NEVER influence which items are fulfilled: everything
    // below is read from the database, not from the request body.
    const service = createServiceClient();

    const { data: pendingOrder, error: orderError } = await service
      .from("orders")
      .select("id, user_id, email, amount, currency, status, notes")
      .eq("razorpay_order_id", razorpay_order_id)
      .maybeSingle();

    if (orderError) {
      return Response.json(
        { error: "Failed to load order" },
        { status: 500 },
      );
    }

    if (!pendingOrder) {
      return Response.json(
        { error: "Order not found" },
        { status: 400 },
      );
    }

    if (pendingOrder.user_id !== user.id) {
      return Response.json(
        { error: "Order does not belong to this user" },
        { status: 403 },
      );
    }

    if (pendingOrder.status === "paid") {
      return Response.json({
        success: true,
        orderId: pendingOrder.id,
        paymentId: razorpay_payment_id,
        alreadyProcessed: true,
      });
    }

    if (pendingOrder.status !== "created") {
      return Response.json(
        { error: "Order is not in a payable state" },
        { status: 400 },
      );
    }

    const { data: orderItems, error: itemsError } = await service
      .from("order_items")
      .select("product_id, title, price, quantity")
      .eq("order_id", pendingOrder.id);

    if (itemsError || !orderItems || orderItems.length === 0) {
      return Response.json(
        { error: "Failed to load order items" },
        { status: 500 },
      );
    }

    let totalUsd = 0;
    for (const item of orderItems) {
      const quantity = Math.floor(Number(item.quantity) || 0);
      if (quantity < 1) {
        return Response.json(
          { error: "Invalid order item quantity" },
          { status: 500 },
        );
      }
      totalUsd += Number(item.price) * quantity;
    }

    // The DB-snapshotted items must still match the amount Razorpay actually
    // charged on the order created by /api/razorpay/order.
    let chargedAmount = 0;
    try {
      const razorpayOrder = await razorpay.orders.fetch(razorpay_order_id);
      chargedAmount = Number(razorpayOrder.amount);
    } catch (razorpayError) {
      console.error(
        "verify: failed to fetch razorpay order",
        razorpay_order_id,
        razorpayError instanceof Error ? razorpayError.message : razorpayError,
      );
      return Response.json(
        { error: "Failed to confirm payment amount" },
        { status: 502 },
      );
    }

    if (chargedAmount !== usdToPaise(totalUsd)) {
      return Response.json(
        { error: "Payment amount does not match the order" },
        { status: 400 },
      );
    }

    // Guarded update: only transitions a 'created' order to 'paid' once.
    // Concurrent duplicate verifies therefore yield at most one fulfillment.
    const { data: updatedOrder, error: updateError } = await service
      .from("orders")
      .update({
        status: "paid",
        razorpay_payment_id,
        updated_at: new Date().toISOString(),
      })
      .eq("id", pendingOrder.id)
      .eq("status", "created")
      .select("id")
      .maybeSingle();

    if (updateError) {
      console.error("verify: failed to mark order paid", updateError.message);
      return Response.json(
        { error: "Failed to finalize order" },
        { status: 500 },
      );
    }

    if (!updatedOrder) {
      // Another concurrent verify already transitioned it to 'paid'.
      return Response.json({
        success: true,
        orderId: pendingOrder.id,
        paymentId: razorpay_payment_id,
        alreadyProcessed: true,
      });
    }

    return Response.json({
      success: true,
      orderId: pendingOrder.id,
      paymentId: razorpay_payment_id,
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Payment verification failed";
    return Response.json({ error: errorMessage }, { status: 500 });
  }
}