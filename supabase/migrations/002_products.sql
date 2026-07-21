-- ============================================================
-- Migration 002: Products + Profiles + RLS + Storage
-- Creates products table from scratch (idempotent DDL)
-- ============================================================

-- ============================================================
-- PART 1: Products table (complete schema)
-- ============================================================
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL DEFAULT '',
  title TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  subject TEXT NOT NULL DEFAULT '',
  level TEXT NOT NULL DEFAULT '',
  exam_code TEXT NOT NULL DEFAULT '',
  type TEXT NOT NULL DEFAULT 'Past Paper',
  price NUMERIC(10,2) NOT NULL DEFAULT 0,
  original_price NUMERIC(10,2),
  discount NUMERIC(10,2),
  rating NUMERIC(3,1) NOT NULL DEFAULT 0,
  review_count INTEGER NOT NULL DEFAULT 0,
  pages INTEGER NOT NULL DEFAULT 0,
  downloads INTEGER NOT NULL DEFAULT 0,
  cover TEXT NOT NULL DEFAULT 'from-teal-dark to-ink',
  bestseller BOOLEAN NOT NULL DEFAULT false,
  published BOOLEAN NOT NULL DEFAULT false,
  featured BOOLEAN NOT NULL DEFAULT false,
  tags JSONB DEFAULT '[]'::jsonb,
  author TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  exam_board TEXT,
  session TEXT,
  paper TEXT,
  variant TEXT,
  language TEXT NOT NULL DEFAULT 'English',
  format TEXT NOT NULL DEFAULT 'PDF',
  version TEXT DEFAULT '1.0',
  thumbnail TEXT,
  pdf_path TEXT,
  long_description TEXT,
  whats_included JSONB DEFAULT '[]'::jsonb,
  syllabus_coverage JSONB DEFAULT '[]'::jsonb,
  rating_distribution JSONB DEFAULT '[]'::jsonb,
  reviews JSONB DEFAULT '[]'::jsonb,
  product_faqs JSONB DEFAULT '[]'::jsonb,
  user_id UUID
);

-- Populate slug for existing rows (safe no-op if none are NULL)
UPDATE products
SET slug = lower(regexp_replace(regexp_replace(title, '[^a-z0-9]+', '-', 'g'), '^-|-$', '', 'g'))
WHERE slug IS NULL OR slug = '';

-- Disambiguate any duplicate slugs by appending a short hash suffix
UPDATE products p
SET slug = p.slug || '-' || substr(md5(p.id::text), 1, 4)
WHERE p.id IN (
  SELECT id FROM (
    SELECT id, ROW_NUMBER() OVER (PARTITION BY slug ORDER BY id) AS rn
    FROM products
  ) dupes
  WHERE dupes.rn > 1
);

-- Ensure slug is unique
CREATE UNIQUE INDEX IF NOT EXISTS idx_products_slug ON products (slug);

-- ============================================================
-- PART 2: Profiles table + RLS
-- ============================================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check admin status without RLS recursion
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

DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Admins can read all profiles" ON profiles;
CREATE POLICY "Admins can read all profiles"
  ON profiles FOR SELECT
  USING (
    public.is_admin()
  );

DROP POLICY IF EXISTS "Admins can update any profile" ON profiles;
CREATE POLICY "Admins can update any profile"
  ON profiles FOR UPDATE
  USING (
    public.is_admin()
  );

-- Allow admins to insert profiles (for manual user creation)
DROP POLICY IF EXISTS "Admins can insert profiles" ON profiles;
CREATE POLICY "Admins can insert profiles"
  ON profiles FOR INSERT
  WITH CHECK (
    public.is_admin()
  );

-- Signup trigger: auto-create profile row
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'role', 'student')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- PART 3: Products RLS policies
-- ============================================================
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anon can read published products" ON products;
CREATE POLICY "Anon can read published products"
  ON products FOR SELECT
  USING (published = true);

DROP POLICY IF EXISTS "Users can read published products" ON products;
CREATE POLICY "Users can read published products"
  ON products FOR SELECT
  USING (published = true);

DROP POLICY IF EXISTS "Admins can read all products" ON products;
CREATE POLICY "Admins can read all products"
  ON products FOR SELECT
  USING (
    public.is_admin()
  );

DROP POLICY IF EXISTS "Admins can insert products" ON products;
CREATE POLICY "Admins can insert products"
  ON products FOR INSERT
  WITH CHECK (
    public.is_admin()
  );

DROP POLICY IF EXISTS "Admins can update products" ON products;
CREATE POLICY "Admins can update products"
  ON products FOR UPDATE
  USING (
    public.is_admin()
  );

DROP POLICY IF EXISTS "Admins can delete products" ON products;
CREATE POLICY "Admins can delete products"
  ON products FOR DELETE
  USING (
    public.is_admin()
  );

-- ============================================================
-- PART 4: Storage buckets + RLS
-- ============================================================
INSERT INTO storage.buckets (id, name, public) VALUES ('thumbnails', 'thumbnails', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Anyone can read thumbnails" ON storage.objects;
CREATE POLICY "Anyone can read thumbnails"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'thumbnails');

DROP POLICY IF EXISTS "Admins can upload thumbnails" ON storage.objects;
CREATE POLICY "Admins can upload thumbnails"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'thumbnails' AND public.is_admin()
  );

DROP POLICY IF EXISTS "Admins can update thumbnails" ON storage.objects;
CREATE POLICY "Admins can update thumbnails"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'thumbnails' AND public.is_admin()
  );

DROP POLICY IF EXISTS "Admins can delete thumbnails" ON storage.objects;
CREATE POLICY "Admins can delete thumbnails"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'thumbnails' AND public.is_admin()
  );

INSERT INTO storage.buckets (id, name, public) VALUES ('resources', 'resources', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Anyone can read resources" ON storage.objects;
CREATE POLICY "Anyone can read resources"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'resources');

DROP POLICY IF EXISTS "Admins can upload resources" ON storage.objects;
CREATE POLICY "Admins can upload resources"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'resources' AND public.is_admin()
  );

DROP POLICY IF EXISTS "Admins can update resources" ON storage.objects;
CREATE POLICY "Admins can update resources"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'resources' AND public.is_admin()
  );

DROP POLICY IF EXISTS "Admins can delete resources" ON storage.objects;
CREATE POLICY "Admins can delete resources"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'resources' AND public.is_admin()
  );
