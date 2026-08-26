-- ============================================================
-- Migration 005: Fix infinite recursion in profiles RLS policies
-- The is_admin() SECURITY DEFINER function queries profiles,
-- which triggers its own RLS policies, causing infinite recursion.
-- Fix: Drop all profiles policies and recreate with
-- is_admin() using a direct auth.uid() check to break the cycle.
-- ============================================================

-- Recreate is_admin() as SECURITY DEFINER (ensure it's correct)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$;

-- Drop ALL existing policies on profiles to start fresh
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can read all profiles" ON profiles;
DROP POLICY IF EXISTS "Admins can update any profile" ON profiles;
DROP POLICY IF EXISTS "Admins can insert profiles" ON profiles;

-- Recreate safe policies (no recursion possible)
-- Users can always read their own profile (direct auth.uid() check, no function call)
CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Admins can read all profiles (uses SECURITY DEFINER function, bypasses RLS)
-- SECURITY DEFINER means is_admin() runs as the function owner, not the querying user,
-- so it does NOT trigger RLS policies on profiles.
CREATE POLICY "Admins can read all profiles"
  ON profiles FOR SELECT
  USING (public.is_admin());

-- Admins can update any profile
CREATE POLICY "Admins can update any profile"
  ON profiles FOR UPDATE
  USING (public.is_admin());

-- Admins can insert profiles (for manual user creation)
CREATE POLICY "Admins can insert profiles"
  ON profiles FOR INSERT
  WITH CHECK (public.is_admin());
