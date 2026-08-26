import crypto from "crypto";
import { createClient } from "@/lib/supabase/server";
import { usdToInr } from "@/lib/currency";

export async function POST(request: Request) {
  const requestId = Math.random().toString(36).slice(2, 9);
  console.log(`[${requestId}] ===== POST /api/razorpay/verify =====`);

  try {
    const body = await request.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      items,
      email,
      notes = null,
    } = body;

    console.log(`[${requestId}] razorpay_order_id:`, razorpay_order_id);
    console.log(`[${requestId}] razorpay_payment_id:`, razorpay_payment_id);
    console.log(`[${requestId}] razorpay_signature:`, razorpay_signature);
    console.log(`[${requestId}] items:`, JSON.stringify(items));
    console.log(`[${requestId}] email:`, email);

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      console.log(`[${requestId}] Missing payment verification parameters`);
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

    console.log(`[${requestId}] Generated HMAC signature:`, expectedSignature);
    console.log(`[${requestId}] Provided signature:`, razorpay_signature);
    console.log(`[${requestId}] Signatures match:`, expectedSignature === razorpay_signature);

    if (expectedSignature !== razorpay_signature) {
      console.log(`[${requestId}] Signature mismatch — rejecting payment`);
      return Response.json(
        { error: "Invalid payment signature" },
        { status: 400 },
      );
    }

    console.log(`[${requestId}] Signature valid. Proceeding to save order...`);

    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    console.log(`[${requestId}] Authenticated user:`, user?.id || "(anonymous)");
    if (authError) {
      console.log(`[${requestId}] Auth error:`, authError);
    }

    const totalUsd = items.reduce(
      (sum: number, item: { price: number; quantity: number }) =>
        sum + item.price * item.quantity,
      0,
    );
    const totalInr = usdToInr(totalUsd);

    console.log(`[${requestId}] USD amount: $${totalUsd}`);
    console.log(`[${requestId}] INR amount: ₹${totalInr}`);

    console.log(`[${requestId}] INSERT INTO orders:`, JSON.stringify({
      user_id: user?.id || null,
      email,
      razorpay_order_id,
      razorpay_payment_id,
      amount: totalInr,
      currency: "INR",
      status: "paid",
    }));

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: user?.id || null,
        email,
        razorpay_order_id,
        razorpay_payment_id,
        amount: totalInr,
        currency: "INR",
        status: "paid",
        notes: notes || null,
      })
      .select("id")
      .single();

    if (orderError) {
      console.error(`[${requestId}] ===== ORDER INSERT FAILED =====`);
      console.error(`[${requestId}] orderError.message:`, orderError.message);
      console.error(`[${requestId}] orderError.details:`, orderError.details);
      console.error(`[${requestId}] orderError.hint:`, orderError.hint);
      console.error(`[${requestId}] orderError.code:`, orderError.code);
      console.error(`[${requestId}] Full orderError:`, JSON.stringify(orderError, Object.getOwnPropertyNames(orderError), 2));
      return Response.json(
        { error: `Database error: ${orderError.message}` },
        { status: 500 },
      );
    }

    console.log(`[${requestId}] Order created with id:`, order.id);

    const orderItems = items.map(
      (item: { productId: string; title: string; price: number; quantity: number }) => ({
        order_id: order.id,
        product_id: item.productId,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
      }),
    );

    console.log(`[${requestId}] INSERT INTO order_items:`, JSON.stringify(orderItems));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (itemsError) {
      console.error(`[${requestId}] ===== ORDER_ITEMS INSERT FAILED =====`);
      console.error(`[${requestId}] itemsError.message:`, itemsError.message);
      console.error(`[${requestId}] itemsError.details:`, itemsError.details);
      console.error(`[${requestId}] itemsError.hint:`, itemsError.hint);
      console.error(`[${requestId}] itemsError.code:`, itemsError.code);
      console.error(`[${requestId}] Full itemsError:`, JSON.stringify(itemsError, Object.getOwnPropertyNames(itemsError), 2));
      return Response.json(
        { error: `Database error: ${itemsError.message}` },
        { status: 500 },
      );
    }

    console.log(`[${requestId}] Order items inserted successfully`);
    console.log(`[${requestId}] Verify complete. Returning success.`);

    return Response.json({
      success: true,
      orderId: order.id,
      paymentId: razorpay_payment_id,
    });
  } catch (err: unknown) {
    console.error(`[${requestId}] ===== VERIFY ENDPOINT EXCEPTION =====`);
    console.error(`[${requestId}] error.name:`, err instanceof Error ? err.name : typeof err);
    console.error(`[${requestId}] error.message:`, err instanceof Error ? err.message : String(err));
    console.error(`[${requestId}] error.stack:`, err instanceof Error ? err.stack : "(no stack)");
    console.error(`[${requestId}] Full serialized error:`, JSON.stringify(err, Object.getOwnPropertyNames(err as object), 2));

    const errorMessage = err instanceof Error ? err.message : String(err);
    return Response.json(
      { error: errorMessage },
      { status: 500 },
    );
  }
}
