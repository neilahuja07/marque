-- ============================================================
-- Migration 011: Harden orders / order_items RLS (CRITICAL fix)
-- ============================================================
-- Prior security audit (2026-08-29) found that the order write
-- policies used `with check (true)` / `using (true)` with NO
-- `to <role>` clause. A policy without a `to` clause applies to
-- PUBLIC, so the public `anon` role — via the shipped anon key —
-- could INSERT paid orders directly through PostgREST. This is a
-- total payment bypass.
--
-- This migration:
--   1. Removes every INSERT/UPDATE policy on orders/order_items
--      (the vulnerable `008` policies, and the legacy `004` ones).
--   2. Keeps read access strictly restricted to a user's own rows.
--   3. Leaves no client-writable path through PostgREST at all.
--
-- The ONLY remaining write path is the server-side payment
-- verification route (/api/razorpay/verify), which now writes using
-- a service_role client AFTER validating the Razorpay HMAC signature
-- and reconciling the amount. service_role bypasses RLS by design, so
-- no RLS policy is needed (or wanted) for those writes.
--
-- Requires: no data migration. Idempotent, safe to re-run.
-- Run in: Supabase SQL Editor (Dashboard → SQL Editor).
-- ============================================================

-- ─────────────────────────────────────────────────────────────
-- 1. Drop the vulnerable INSERT policies on `orders`
-- ─────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "Allow order insert from verified payment" ON orders;
DROP POLICY IF EXISTS "Service role can insert orders" ON orders;

-- ─────────────────────────────────────────────────────────────
-- 2. Drop the vulnerable UPDATE policies on `orders`
-- ─────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "Allow order update from server" ON orders;
DROP POLICY IF EXISTS "Service role can update orders" ON orders;

-- ─────────────────────────────────────────────────────────────
-- 3. Drop the vulnerable INSERT policies on `order_items`
-- ─────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "Allow order items insert from verified payment" ON order_items;
DROP POLICY IF EXISTS "Service role can insert order items" ON order_items;

-- ─────────────────────────────────────────────────────────────
-- 4. Read access: strictly own-rows only, authenticated users only
-- ─────────────────────────────────────────────────────────────
-- `to authenticated` keeps the `anon` role from even attempting a
-- read, and the `using` predicates limit each user to their own rows.
-- The subquery in the order_items policy is naturally restricted by
-- the orders SELECT policy above, so a user can only reach items that
-- belong to their own orders.

DROP POLICY IF EXISTS "Users can view their own orders" ON orders;
CREATE POLICY "Users can view their own orders"
  ON orders FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view their own order items" ON order_items;
CREATE POLICY "Users can view their own order items"
  ON order_items FOR SELECT
  TO authenticated
  USING (
    order_id IN (
      SELECT id FROM orders WHERE user_id = auth.uid()
    )
  );

-- ─────────────────────────────────────────────────────────────
-- 5. Intent notes (no code)
-- ─────────────────────────────────────────────────────────────
-- - There are intentionally NO INSERT/UPDATE/DELETE policies left on
--   orders / order_items for `anon` or `authenticated`. Direct REST
--   writes are now impossible (PostgREST returns "row-level security
--   policy" errors).
-- - The service_role client used by the server routes bypasses RLS,
--   which is the only sane way to let the payment-verification route
--   write while keeping every client-side path closed (the RLS layer
--   cannot verify the Razorpay HMAC signature itself).
-- - Download security (migration 010 + /api/orders/download) is
--   untouched: it still requires the requesting user to own a PAID
--   order containing the product before serving the PDF.