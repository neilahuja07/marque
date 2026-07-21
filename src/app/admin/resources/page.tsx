"use client";

import { useState, useMemo } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { FadeIn } from "@/components/ui/fade-in";
import { Badge } from "@/components/ui/badge";
import { Dropdown, DropdownItem, DropdownSeparator } from "@/components/ui/dropdown";
import {
  DashboardSectionHeader,
  DashboardSearch,
  DashboardFilterPills,
} from "@/components/dashboard/dashboard-sub-page";
import { adminSidebarItems } from "@/lib/admin-sidebar";
import { useProducts } from "@/lib/product-store";
import { ProductEditor, type ProductData } from "@/components/admin/product-editor";
import type { Product } from "@/lib/types";

const filters = [
  { label: "All", value: "all" },
  { label: "Published", value: "published" },
  { label: "Draft", value: "draft" },
  { label: "Featured", value: "featured" },
];

export default function AdminResourcesPage() {
  const { products, addProduct, updateProduct, deleteProduct, togglePublish, toggleFeatured } = useProducts();
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [editorOpen, setEditorOpen] = useState(false);
  const [editorMode, setEditorMode] = useState<"add" | "edit">("add");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return products.filter((r) => {
      const matchesFilter =
        activeFilter === "all" ||
        (activeFilter === "published" && r.published) ||
        (activeFilter === "draft" && !r.published) ||
        (activeFilter === "featured" && r.featured);
      const matchesSearch =
        search === "" ||
        r.title.toLowerCase().includes(search.toLowerCase()) ||
        r.author.toLowerCase().includes(search.toLowerCase()) ||
        r.subject.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [products, search, activeFilter]);

  const handleAdd = () => {
    setEditorMode("add");
    setEditingProduct(null);
    setEditorOpen(true);
  };

  const handleEdit = (product: Product) => {
    setEditorMode("edit");
    setEditingProduct(product);
    setEditorOpen(true);
  };

  const handleSave = async (data: ProductData) => {
    if (editorMode === "add") {
      await addProduct({
        ...data,
        bestseller: data.featured,
        updatedAt: new Date().toISOString().split("T")[0],
      });
    } else if (editingProduct) {
      await updateProduct(editingProduct.id, {
        ...data,
        bestseller: data.featured,
        updatedAt: new Date().toISOString().split("T")[0],
      });
    }
  };

  const handleDelete = async (id: string) => {
    await deleteProduct(id);
    setDeleteConfirm(null);
  };

  return (
    <DashboardLayout
      sidebarItems={adminSidebarItems}
      header={
        <div className="mx-auto max-w-7xl px-6 py-4">
          <DashboardSectionHeader
            title="Resources"
            count={products.length}
            actions={
              <button
                onClick={handleAdd}
                className="btn-primary flex items-center gap-2 rounded-[8px] bg-teal-dark px-4 py-2 text-[13px] font-medium text-white"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Add Resource
              </button>
            }
          />
        </div>
      }
    >
      <div className="mx-auto max-w-7xl space-y-6 px-6 pb-10">
        {/* Search + Filters */}
        <FadeIn>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <DashboardSearch value={search} onChange={setSearch} placeholder="Search resources…" />
            <DashboardFilterPills filters={filters} active={activeFilter} onChange={setActiveFilter} />
          </div>
        </FadeIn>

        {/* Desktop Table */}
        <FadeIn delay={40}>
          <div className="hidden rounded-[12px] border border-ink/10 bg-white md:block">
            <table className="w-full text-left text-[13px]">
              <thead>
                <tr className="border-b border-ink/10 bg-parchment/50">
                  <th className="px-5 py-3 font-medium text-ink/60">Resource</th>
                  <th className="px-5 py-3 font-medium text-ink/60">Subject</th>
                  <th className="px-5 py-3 font-medium text-ink/60">Price</th>
                  <th className="px-5 py-3 font-medium text-ink/60">Status</th>
                  <th className="px-5 py-3 font-medium text-ink/60">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id} className="border-b border-ink/5 last:border-0">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-ink line-clamp-1">{r.title}</p>
                        {r.featured && (
                          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0 text-brass" fill="currentColor">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        )}
                      </div>
                      <p className="mt-0.5 text-[11px] text-slate">{r.author}</p>
                    </td>
                    <td className="px-5 py-3.5 text-slate">{r.subject}</td>
                    <td className="px-5 py-3.5 text-ink">${r.price.toFixed(2)}</td>
                    <td className="px-5 py-3.5">
                      <Badge variant={r.published ? "success" : "warning"}>
                        {r.published ? "published" : "draft"}
                      </Badge>
                    </td>
                    <td className="px-5 py-3.5">
                      <Dropdown
                        trigger={
                          <button className="flex h-8 w-8 items-center justify-center rounded-[6px] text-ink/40 transition-colors hover:bg-parchment hover:text-ink">
                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="5" r="1" />
                              <circle cx="12" cy="12" r="1" />
                              <circle cx="12" cy="19" r="1" />
                            </svg>
                          </button>
                        }
                      >
                        <DropdownItem
                          onClick={() => handleEdit(r)}
                          icon={
                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                          }
                        >
                          Edit
                        </DropdownItem>
                        <DropdownItem
                          onClick={() => togglePublish(r.id)}
                          icon={
                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          }
                        >
                          {r.published ? "Unpublish" : "Publish"}
                        </DropdownItem>
                        <DropdownItem
                          onClick={() => toggleFeatured(r.id)}
                          icon={
                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                          }
                        >
                          {r.featured ? "Unfeature" : "Feature"}
                        </DropdownItem>
                        <DropdownSeparator />
                        <DropdownItem
                          onClick={() => setDeleteConfirm(r.id)}
                          icon={
                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            </svg>
                          }
                        >
                          Delete
                        </DropdownItem>
                      </Dropdown>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>

        {/* Mobile Cards */}
        <FadeIn delay={60}>
          <div className="space-y-3 md:hidden">
            {filtered.map((r) => (
              <div key={r.id} className="rounded-[12px] border border-ink/10 bg-white p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-ink line-clamp-1">{r.title}</p>
                      {r.featured && (
                        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0 text-brass" fill="currentColor">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      )}
                    </div>
                    <p className="mt-0.5 text-[11px] text-slate">{r.author} · {r.subject}</p>
                  </div>
                  <Badge variant={r.published ? "success" : "warning"}>
                    {r.published ? "published" : "draft"}
                  </Badge>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-ink/5 pt-3">
                  <p className="text-[13px] font-medium text-ink">${r.price.toFixed(2)}</p>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleEdit(r)}
                      className="flex h-8 w-8 items-center justify-center rounded-[6px] text-ink/40 transition-colors hover:bg-parchment hover:text-ink"
                    >
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </button>
                    <Dropdown
                      trigger={
                        <button className="flex h-8 w-8 items-center justify-center rounded-[6px] text-ink/40 transition-colors hover:bg-parchment hover:text-ink">
                          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="5" r="1" />
                            <circle cx="12" cy="12" r="1" />
                            <circle cx="12" cy="19" r="1" />
                          </svg>
                        </button>
                      }
                    >
                      <DropdownItem onClick={() => togglePublish(r.id)}>
                        {r.published ? "Unpublish" : "Publish"}
                      </DropdownItem>
                      <DropdownItem onClick={() => toggleFeatured(r.id)}>
                        {r.featured ? "Unfeature" : "Feature"}
                      </DropdownItem>
                      <DropdownSeparator />
                      <DropdownItem onClick={() => setDeleteConfirm(r.id)}>
                        Delete
                      </DropdownItem>
                    </Dropdown>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-parchment text-ink/25">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <h3 className="mt-4 font-display text-[16px] text-ink">No resources found</h3>
            <p className="mt-1.5 max-w-sm text-[13px] text-slate">Try adjusting your search or filter.</p>
          </div>
        )}
      </div>

      {/* Product Editor Modal */}
      <ProductEditor
        open={editorOpen}
        onClose={() => setEditorOpen(false)}
        onSave={handleSave}
        product={editingProduct}
        mode={editorMode}
      />

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 backdrop-blur-sm">
          <div className="mx-4 w-full max-w-sm rounded-[16px] border border-ink/10 bg-parchment p-6 shadow-2xl">
            <h3 className="font-display text-[18px] text-ink">Delete Resource</h3>
            <p className="mt-2 text-[14px] text-slate">
              Are you sure you want to delete this resource? This action cannot be undone.
            </p>
            <div className="mt-5 flex items-center justify-end gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="btn-outline rounded-[8px] border border-ink/15 px-4 py-2.5 text-[13px] font-medium text-ink"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="rounded-[8px] bg-red-600 px-4 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
