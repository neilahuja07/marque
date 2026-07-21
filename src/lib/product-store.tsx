"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import type { Product } from "@/lib/types";
import {
  fetchProducts,
  insertProduct,
  updateProductById,
  deleteProductById,
  toSnakeCase,
} from "@/lib/supabase/products";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

interface ProductStore {
  products: Product[];
  loading: boolean;
  getProductBySlug: (slug: string) => Product | undefined;
  getProductById: (id: string) => Product | undefined;
  addProduct: (data: Omit<Product, "id" | "slug" | "rating" | "reviewCount" | "downloads">) => Promise<Product>;
  updateProduct: (id: string, updates: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  togglePublish: (id: string) => Promise<void>;
  toggleFeatured: (id: string) => Promise<void>;
}

const ProductContext = createContext<ProductStore | null>(null);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const getProductBySlug = useCallback(
    (slug: string) => products.find((p) => p.slug === slug),
    [products],
  );

  const getProductById = useCallback(
    (id: string) => products.find((p) => p.id === id),
    [products],
  );

  const addProduct = useCallback(
    async (data: Omit<Product, "id" | "slug" | "rating" | "reviewCount" | "downloads">) => {
      let slug = slugify(data.title);
      const existingSlugs = products.map((p) => p.slug);
      if (existingSlugs.includes(slug)) {
        slug = `${slug}-${Date.now().toString().slice(-4)}`;
      }

      const dbData = toSnakeCase({
        ...data,
        slug,
        rating: 0,
        reviewCount: 0,
        downloads: 0,
      });

      dbData.created_at = new Date().toISOString();
      dbData.updated_at = new Date().toISOString();

      const newProduct = await insertProduct(dbData);
      setProducts((prev) => [newProduct, ...prev]);
      return newProduct;
    },
    [products],
  );

  const updateProduct = useCallback(async (id: string, updates: Partial<Product>) => {
    const dbUpdates = toSnakeCase({
      ...updates,
      updatedAt: new Date().toISOString(),
    });

    if (updates.title && !updates.slug) {
      dbUpdates.slug = slugify(updates.title);
    }

    await updateProductById(id, dbUpdates);
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const updated = { ...p, ...updates };
        if (updates.title && !updates.slug) {
          updated.slug = slugify(updates.title);
        }
        updated.updatedAt = new Date().toISOString();
        return updated;
      }),
    );
  }, []);

  const deleteProduct = useCallback(async (id: string) => {
    await deleteProductById(id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const togglePublish = useCallback(async (id: string) => {
    const product = products.find((p) => p.id === id);
    if (!product) return;
    const newPublished = !product.published;
    await updateProductById(id, { published: newPublished, updated_at: new Date().toISOString() });
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, published: newPublished, updatedAt: new Date().toISOString() } : p)),
    );
  }, [products]);

  const toggleFeatured = useCallback(async (id: string) => {
    const product = products.find((p) => p.id === id);
    if (!product) return;
    const newFeatured = !product.featured;
    await updateProductById(id, { featured: newFeatured, updated_at: new Date().toISOString() });
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, featured: newFeatured, updatedAt: new Date().toISOString() } : p)),
    );
  }, [products]);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        getProductBySlug,
        getProductById,
        addProduct,
        updateProduct,
        deleteProduct,
        togglePublish,
        toggleFeatured,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error("useProducts must be used within ProductProvider");
  return ctx;
}
