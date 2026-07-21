import { createClient } from "./client";
import type { Product, ProductType, ProductReview, FAQ } from "@/lib/types";

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
  discount: number | null;
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
  pdf_path: string | null;
  long_description: string | null;
  whats_included: string[] | null;
  syllabus_coverage: string[] | null;
  rating_distribution: { stars: number; count: number }[] | null;
  reviews: ProductReview[] | null;
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
    discount: row.discount ?? undefined,
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
    examBoard: row.exam_board ?? undefined,
    session: row.session ?? undefined,
    paper: row.paper ?? undefined,
    variant: row.variant ?? undefined,
    language: row.language,
    format: row.format,
    version: row.version ?? undefined,
    thumbnail: row.thumbnail ?? undefined,
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
  if ("title" in product) data.title = product.title;
  if ("slug" in product) data.slug = product.slug;
  if ("description" in product) data.description = product.description;
  if ("subject" in product) data.subject = product.subject;
  if ("level" in product) data.level = product.level;
  if ("examCode" in product) data.exam_code = product.examCode;
  if ("type" in product) data.type = product.type;
  if ("price" in product) data.price = product.price;
  if ("originalPrice" in product) data.original_price = product.originalPrice ?? null;
  if ("discount" in product) data.discount = product.discount ?? null;
  if ("rating" in product) data.rating = product.rating;
  if ("reviewCount" in product) data.review_count = product.reviewCount;
  if ("pages" in product) data.pages = product.pages;
  if ("downloads" in product) data.downloads = product.downloads;
  if ("cover" in product) data.cover = product.cover;
  if ("bestseller" in product) data.bestseller = product.bestseller;
  if ("published" in product) data.published = product.published;
  if ("featured" in product) data.featured = product.featured;
  if ("tags" in product) data.tags = product.tags;
  if ("author" in product) data.author = product.author;
  if ("updatedAt" in product) data.updated_at = product.updatedAt;
  if ("examBoard" in product) data.exam_board = product.examBoard ?? null;
  if ("session" in product) data.session = product.session ?? null;
  if ("paper" in product) data.paper = product.paper ?? null;
  if ("variant" in product) data.variant = product.variant ?? null;
  if ("language" in product) data.language = product.language;
  if ("format" in product) data.format = product.format;
  if ("version" in product) data.version = product.version ?? null;
  if ("thumbnail" in product) data.thumbnail = product.thumbnail ?? null;
  if ("pdfUrl" in product) data.pdf_path = product.pdfUrl ?? null;
  if ("longDescription" in product) data.long_description = product.longDescription ?? null;
  if ("whatsIncluded" in product) data.whats_included = product.whatsIncluded ?? null;
  if ("syllabusCoverage" in product) data.syllabus_coverage = product.syllabusCoverage ?? null;
  if ("ratingDistribution" in product) data.rating_distribution = product.ratingDistribution ?? null;
  if ("reviews" in product) data.reviews = product.reviews ?? null;
  if ("productFaqs" in product) data.product_faqs = product.productFaqs ?? null;
  return data;
}

export async function fetchProducts(): Promise<Product[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
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

export async function uploadThumbnail(file: File, path: string): Promise<string> {
  const supabase = createClient();
  const { error } = await supabase.storage
    .from("thumbnails")
    .upload(path, file, { upsert: true });

  if (error) throw error;

  const { data: urlData } = supabase.storage
    .from("thumbnails")
    .getPublicUrl(path);

  return urlData.publicUrl;
}

export async function uploadResource(file: File, path: string): Promise<string> {
  const supabase = createClient();
  const { error } = await supabase.storage
    .from("resources")
    .upload(path, file, { upsert: true });

  if (error) throw error;

  const { data: urlData } = supabase.storage
    .from("resources")
    .getPublicUrl(path);

  return urlData.publicUrl;
}

export { toSnakeCase };
