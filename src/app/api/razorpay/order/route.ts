import Razorpay from "razorpay";
import { usdToPaise } from "@/lib/currency";

const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;
const razorpayKeyId = process.env.RAZORPAY_KEY_ID;

console.log("[Razorpay] Key ID exists:", !!razorpayKeyId);
console.log("[Razorpay] Key ID value:", razorpayKeyId);
console.log("[Razorpay] Key Secret exists:", !!razorpayKeySecret);
console.log("[Razorpay] Key Secret length:", razorpayKeySecret?.length);

const razorpay = new Razorpay({
  key_id: razorpayKeyId || "",
  key_secret: razorpayKeySecret || "",
});

console.log("[Razorpay] Client initialized:", !!razorpay);
console.log("[Razorpay] orders API available:", !!razorpay?.orders);

export async function POST(request: Request) {
  const requestId = Math.random().toString(36).slice(2, 9);
  console.log(`[${requestId}] ===== REQUEST RECEIVED: POST /api/razorpay/order =====`);

  try {
    const body = await request.json();
    const { amount, receipt, notes } = body;

    console.log(`[${requestId}] Request body:`, JSON.stringify(body, null, 2));
    console.log(`[${requestId}] amount (USD):`, amount, `(type: ${typeof amount})`);
    console.log(`[${requestId}] receipt:`, receipt);
    console.log(`[${requestId}] notes:`, notes);

    if (!amount || amount <= 0) {
      console.log(`[${requestId}] Validation failed: amount=${amount}`);
      return Response.json(
        { error: "A valid positive amount is required" },
        { status: 400 },
      );
    }

    const amountInPaise = usdToPaise(amount);
    console.log(`[${requestId}] $${amount} USD → ₹${amount} × 95 = ₹${(amount * 95).toFixed(2)} → ${amountInPaise} paise`);

    console.log(`[${requestId}] Calling razorpay.orders.create()...`);
    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: receipt || `rcpt_${Date.now()}`,
      notes: notes || {},
    });

    console.log(`[${requestId}] razorpay.orders.create() succeeded:`, JSON.stringify({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      status: order.status,
    }));

    return Response.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (err: unknown) {
    console.error(`[${requestId}] ===== razorpay.orders.create() FAILED =====`);
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
