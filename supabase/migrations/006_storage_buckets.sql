-- =============================================================
-- Migration 006: Create resource-thumbnails and resource-pdfs buckets
-- Run this SQL in your Supabase SQL Editor (Dashboard → SQL Editor).
-- Safe to run multiple times (all statements are idempotent).
-- =============================================================

-- ─────────────────────────────────────────────────────────────
-- 1. resource-thumbnails (Public — for thumbnail images)
-- ─────────────────────────────────────────────────────────────
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'resource-thumbnails',
  'resource-thumbnails',
  true,
  5242880,  -- 5 MB
  ARRAY['image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Public read
DROP POLICY IF EXISTS "Public read resource thumbnails" ON storage.objects;
CREATE POLICY "Public read resource thumbnails"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'resource-thumbnails');

-- Admin insert
DROP POLICY IF EXISTS "Admin insert resource thumbnails" ON storage.objects;
CREATE POLICY "Admin insert resource thumbnails"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'resource-thumbnails' AND public.is_admin()
  );

-- Admin update
DROP POLICY IF EXISTS "Admin update resource thumbnails" ON storage.objects;
CREATE POLICY "Admin update resource thumbnails"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'resource-thumbnails' AND public.is_admin()
  );

-- Admin delete
DROP POLICY IF EXISTS "Admin delete resource thumbnails" ON storage.objects;
CREATE POLICY "Admin delete resource thumbnails"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'resource-thumbnails' AND public.is_admin()
  );

-- ─────────────────────────────────────────────────────────────
-- 2. resource-pdfs (Private — for PDF resource files)
-- ─────────────────────────────────────────────────────────────
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'resource-pdfs',
  'resource-pdfs',
  false,
  52428800,  -- 50 MB
  ARRAY['application/pdf']
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Admin read
DROP POLICY IF EXISTS "Admin read resource PDFs" ON storage.objects;
CREATE POLICY "Admin read resource PDFs"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'resource-pdfs' AND public.is_admin()
  );

-- Admin insert
DROP POLICY IF EXISTS "Admin insert resource PDFs" ON storage.objects;
CREATE POLICY "Admin insert resource PDFs"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'resource-pdfs' AND public.is_admin()
  );

-- Admin update
DROP POLICY IF EXISTS "Admin update resource PDFs" ON storage.objects;
CREATE POLICY "Admin update resource PDFs"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'resource-pdfs' AND public.is_admin()
  );

-- Admin delete
DROP POLICY IF EXISTS "Admin delete resource PDFs" ON storage.objects;
CREATE POLICY "Admin delete resource PDFs"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'resource-pdfs' AND public.is_admin()
  );
