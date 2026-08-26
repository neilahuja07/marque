"use client";

import { createClient } from "./client";
import type { Product, ProductType, FAQ } from "@/lib/types";

const THUMBNAIL_BUCKET = "resource-thumbnails";
const PREVIEW_BUCKET = "product-previews";
const PDF_BUCKET = "resource-pdfs";

export { THUMBNAIL_BUCKET, PREVIEW_BUCKET, PDF_BUCKET };

type DbProduct = {
  id: string;
  slug: string;
  title: string;
  description: string;
  subject: string;
  level: string;
  exam_code: string;
  type: string;
  price: number;
  original_price: number | null;
  rating: number;
  review_count: number;
  pages: number;
  downloads: number;
  cover: string;
  bestseller: boolean;
  published: boolean;
  featured: boolean;
  tags: string[];
  author: string;
  updated_at: string;
  created_at: string;
  exam_board: string | null;
  session: string | null;
  paper: string | null;
  variant: string | null;
  language: string;
  format: string;
  version: string | null;
  thumbnail: string | null;
  preview_images: string[] | null;
  pdf_path: string | null;
  long_description: string | null;
  whats_included: string[] | null;
  syllabus_coverage: string[] | null;
  rating_distribution: { stars: number; count: number }[] | null;
  reviews: { name: string; role: string; rating: number; date: string; text: string }[] | null;
  product_faqs: FAQ[] | null;
  user_id: string | null;
};

function parseJsonArray(value: unknown): string[] {
  if (Array.isArray(value)) return value;
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
}

function toCamelCase(row: DbProduct): Product {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description,
    subject: row.subject,
    level: row.level,
    examCode: row.exam_code,
    type: row.type as ProductType,
    price: row.price,
    originalPrice: row.original_price ?? undefined,
    rating: row.rating,
    reviewCount: row.review_count,
    pages: row.pages,
    downloads: row.downloads,
    cover: row.cover,
    bestseller: row.bestseller,
    published: row.published,
    featured: row.featured,
    tags: parseJsonArray(row.tags),
    author: row.author,
    updatedAt: row.updated_at,
    createdAt: row.created_at,
    examBoard: row.exam_board ?? undefined,
    session: row.session ?? undefined,
    paper: row.paper ?? undefined,
    variant: row.variant ?? undefined,
    language: row.language,
    format: row.format,
    version: row.version ?? undefined,
    thumbnail: row.thumbnail ?? undefined,
    previewImages: row.preview_images ?? undefined,
    pdfUrl: row.pdf_path ?? undefined,
    longDescription: row.long_description ?? undefined,
    whatsIncluded: row.whats_included ?? undefined,
    syllabusCoverage: row.syllabus_coverage ?? undefined,
    ratingDistribution: row.rating_distribution ?? undefined,
    reviews: row.reviews ?? undefined,
    productFaqs: row.product_faqs ?? undefined,
  };
}

function toSnakeCase(product: Partial<Product>): Record<string, unknown> {
  const data: Record<string, unknown> = {};
  if (product.title !== undefined) data.title = product.title;
  if (product.slug !== undefined) data.slug = product.slug;
  if (product.description !== undefined) data.description = product.description;
  if (product.subject !== undefined) data.subject = product.subject;
  if (product.level !== undefined) data.level = product.level;
  if (product.examCode !== undefined) data.exam_code = product.examCode;
  if (product.type !== undefined) data.type = product.type;
  if (product.price !== undefined) data.price = product.price;
  if (product.originalPrice !== undefined) data.original_price = product.originalPrice ?? null;
  if (product.rating !== undefined) data.rating = product.rating;
  if (product.reviewCount !== undefined) data.review_count = product.reviewCount;
  if (product.pages !== undefined) data.pages = product.pages;
  if (product.downloads !== undefined) data.downloads = product.downloads;
  if (product.cover !== undefined) data.cover = product.cover;
  if (product.bestseller !== undefined) data.bestseller = product.bestseller;
  if (product.published !== undefined) data.published = product.published;
  if (product.featured !== undefined) data.featured = product.featured;
  if (product.tags !== undefined) data.tags = product.tags;
  if (product.author !== undefined) data.author = product.author;
  if (product.updatedAt !== undefined) data.updated_at = product.updatedAt;
  if (product.createdAt !== undefined) data.created_at = product.createdAt;
  if (product.examBoard !== undefined) data.exam_board = product.examBoard ?? null;
  if (product.session !== undefined) data.session = product.session ?? null;
  if (product.paper !== undefined) data.paper = product.paper ?? null;
  if (product.variant !== undefined) data.variant = product.variant ?? null;
  if (product.language !== undefined) data.language = product.language;
  if (product.format !== undefined) data.format = product.format;
  if (product.version !== undefined) data.version = product.version ?? null;
  if (product.thumbnail !== undefined) data.thumbnail = product.thumbnail ?? null;
  if (product.previewImages !== undefined) data.preview_images = product.previewImages ?? [];
  if (product.pdfUrl !== undefined) data.pdf_path = product.pdfUrl ?? null;
  if (product.longDescription !== undefined) data.long_description = product.longDescription ?? null;
  if (product.whatsIncluded !== undefined) data.whats_included = product.whatsIncluded ?? null;
  if (product.syllabusCoverage !== undefined) data.syllabus_coverage = product.syllabusCoverage ?? null;
  if (product.ratingDistribution !== undefined) data.rating_distribution = product.ratingDistribution ?? null;
  if (product.reviews !== undefined) data.reviews = product.reviews ?? null;
  if (product.productFaqs !== undefined) data.product_faqs = product.productFaqs ?? null;
  return data;
}

export async function fetchProducts(): Promise<Product[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("fetchProducts error:", JSON.stringify(error, Object.keys(error)));
    throw error;
  }
  return (data ?? []).map(toCamelCase);
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) return null;
  return data ? toCamelCase(data as DbProduct) : null;
}

export async function insertProduct(data: Record<string, unknown>): Promise<Product> {
  const supabase = createClient();
  const { data: inserted, error } = await supabase
    .from("products")
    .insert(data)
    .select()
    .single();

  if (error) throw error;
  return toCamelCase(inserted as DbProduct);
}

export async function updateProductById(id: string, updates: Record<string, unknown>): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase
    .from("products")
    .update(updates)
    .eq("id", id);

  if (error) throw error;
}

export async function deleteProductById(id: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

/** Upload a file to Supabase storage via the client SDK.
 *  Returns the storage path only. */
export async function uploadToStorage(
  file: File,
  path: string,
  bucket: string,
): Promise<string> {
  const supabase = createClient();
  const { error } = await supabase.storage
    .from(bucket)
    .upload(path, file, { upsert: true });

  if (error) throw error;
  return path;
}

/** Upload a thumbnail to resource-thumbnails bucket. */
export async function uploadThumbnail(file: File, path: string): Promise<string> {
  return uploadToStorage(file, path, THUMBNAIL_BUCKET);
}

/** Upload a preview image to product-previews bucket. */
export async function uploadPreviewImage(file: File, path: string): Promise<string> {
  return uploadToStorage(file, path, PREVIEW_BUCKET);
}

/** Delete a preview image from product-previews bucket. */
export async function deletePreviewImage(path: string): Promise<void> {
  return deleteStorageFile(path, PREVIEW_BUCKET);
}

/** Upload a PDF to resource-pdfs bucket. */
export async function uploadResource(file: File, path: string): Promise<string> {
  return uploadToStorage(file, path, PDF_BUCKET);
}

/** Delete a file from a storage bucket. */
export async function deleteStorageFile(path: string, bucket: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.storage
    .from(bucket)
    .remove([path]);

  if (error) throw error;
}

/** Safely resolve a thumbnail to a public URL.
 *  Handles both old-style full URLs and new-style storage paths. */
export function resolveThumbnailUrl(value: string | undefined | null): string | undefined {
  if (!value) return undefined;
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  const supabase = createClient();
  const { data } = supabase.storage
    .from(THUMBNAIL_BUCKET)
    .getPublicUrl(value);
  return data.publicUrl;
}

/** Safely resolve a preview image to a public URL.
 *  Handles both old-style full URLs and new-style storage paths. */
export function resolvePreviewUrl(value: string | undefined | null): string | undefined {
  if (!value) return undefined;
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  const supabase = createClient();
  const { data } = supabase.storage
    .from(PREVIEW_BUCKET)
    .getPublicUrl(value);
  return data.publicUrl;
}

/** Generate a signed URL for a private PDF file. */
export async function getSignedUrl(path: string, expiresIn = 3600): Promise<string> {
  const supabase = createClient();
  const { data, error } = await supabase.storage
    .from(PDF_BUCKET)
    .createSignedUrl(path, expiresIn);

  if (error) throw error;
  return data.signedUrl;
}

export { toSnakeCase };
