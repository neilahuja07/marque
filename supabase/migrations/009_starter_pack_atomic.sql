-- =============================================================
-- Migration 009: Starter Pack atomic claim (fixes TOCTOU race)
-- Run this SQL in your Supabase SQL Editor (Dashboard → SQL Editor).
-- Safe to run multiple times (all statements are idempotent).
-- =============================================================

-- 1. Ensure a user can only ever have one starter-packet row.
--    This is required for the atomic upsert below to be safe.
ALTER TABLE public.starter_pack_downloads
  DROP CONSTRAINT IF EXISTS starter_pack_downloads_user_id_key;
ALTER TABLE public.starter_pack_downloads
  ADD CONSTRAINT starter_pack_downloads_user_id_key UNIQUE (user_id);

-- 2. Atomic claim: insert-or-increment download_count only while
--    the user is still under the limit. Returns the number of
--    downloads remaining (or 0 if the limit has been reached).
DROP FUNCTION IF EXISTS public.claim_starter_pack_download(uuid);
CREATE FUNCTION public.claim_starter_pack_download(p_user_id uuid)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_limit CONSTANT integer := 5;
  v_remaining integer;
BEGIN
  -- Insert the row only if it doesn't already exist.
  INSERT INTO public.starter_pack_downloads (user_id, download_count, last_download_at)
  SELECT p_user_id, 0, now()
  ON CONFLICT (user_id) DO NOTHING;

  -- Atomically increment and enforce the cap in a single statement.
  UPDATE public.starter_pack_downloads
     SET download_count = download_count + 1,
         last_download_at = now()
   WHERE user_id = p_user_id
     AND download_count < v_limit;

  SELECT v_limit - download_count
    INTO v_remaining
    FROM public.starter_pack_downloads
   WHERE user_id = p_user_id;

  RETURN COALESCE(v_remaining, 0);
END;
$$;

-- 3. Grant execution to authenticated users (and anon if desired).
REVOKE ALL ON FUNCTION public.claim_starter_pack_download(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.claim_starter_pack_download(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.claim_starter_pack_download(uuid) TO anon;
