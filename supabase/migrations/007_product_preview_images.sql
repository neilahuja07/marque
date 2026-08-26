-- =============================================================
-- Migration 007: Product preview images (gallery)
--
-- Adds a `preview_images` JSONB column to `products` to persist up
-- to 4 preview image storage paths, and creates a dedicated public
-- `product-previews` storage bucket for those images.
--
-- The existing `thumb_url`/`thumbnail` field and the private
-- `resource-pdfs` bucket are left untouched.
--
-- Run this SQL in your Supabase SQL Editor (Dashboard → SQL Editor).
-- Safe to run multiple times (all statements are idempotent).
-- =============================================================

-- ─────────────────────────────────────────────────────────────
-- 1. Add preview_images column (JSONB array of storage paths)
-- ─────────────────────────────────────────────────────────────
ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS preview_images JSONB DEFAULT '[]'::jsonb;

-- ─────────────────────────────────────────────────────────────
-- 2. product-previews bucket (Public — for preview images only)
--    Product PDFs remain private in resource-pdfs.
-- ─────────────────────────────────────────────────────────────
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'product-previews',
  'product-previews',
  true,
  5242880,  -- 5 MB
  ARRAY['image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Public read (preview images only; this bucket never holds PDFs)
DROP POLICY IF EXISTS "Public read product previews" ON storage.objects;
CREATE POLICY "Public read product previews"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'product-previews');

-- Admin insert
DROP POLICY IF EXISTS "Admin insert product previews" ON storage.objects;
CREATE POLICY "Admin insert product previews"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'product-previews' AND public.is_admin()
  );

-- Admin update
DROP POLICY IF EXISTS "Admin update product previews" ON storage.objects;
CREATE POLICY "Admin update product previews"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'product-previews' AND public.is_admin()
  );

-- Admin delete
DROP POLICY IF EXISTS "Admin delete product previews" ON storage.objects;
CREATE POLICY "Admin delete product previews"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'product-previews' AND public.is_admin()
  );
