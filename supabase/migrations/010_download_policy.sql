-- ============================================================
-- Migration 010: Paid-user PDF download policy
--
-- The `resource-pdfs` bucket is private and only admins can read
-- it. For the customer download flow (no service-role key in this
-- app), the server-side runtime runs as the authenticated user with
-- the anon key, so `createSignedUrl` will only succeed if that user
-- has SELECT on the bucket.
--
-- This policy grants SELECT to any authenticated user who has a
-- PAID order containing the product whose pdf_path matches the
-- storage object. Non-owners / unpaid users still get nothing.
--
-- The separate /api/orders/download route additionally verifies
-- ownership before handing out a signed URL.
-- ============================================================

DROP POLICY IF EXISTS "Paid users can read purchased PDFs" ON storage.objects;
CREATE POLICY "Paid users can read purchased PDFs"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'resource-pdfs'
    AND EXISTS (
      SELECT 1
      FROM public.products p
      JOIN public.order_items oi ON oi.product_id = p.id
      JOIN public.orders o ON o.id = oi.order_id
      WHERE p.pdf_path = storage.objects.name
        AND o.user_id = auth.uid()
        AND o.status = 'paid'
    )
  );
