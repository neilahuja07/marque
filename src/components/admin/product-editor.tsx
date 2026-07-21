"use client";

import { useState, useEffect, useRef } from "react";
import { type Product } from "@/lib/types";
import { allSubjects, allLevels, allTypes } from "@/lib/dummy-data";
import { uploadThumbnail, uploadResource } from "@/lib/supabase/products";

interface ProductEditorProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: ProductData) => void;
  product?: Product | null;
  mode: "add" | "edit";
}

export interface ProductData {
  title: string;
  description: string;
  subject: string;
  level: string;
  examCode: string;
  type: Product["type"];
  price: number;
  originalPrice?: number;
  discount?: number;
  examBoard?: string;
  session?: string;
  paper?: string;
  variant?: string;
  tags: string[];
  featured: boolean;
  published: boolean;
  longDescription?: string;
  cover: string;
  author: string;
  pages: number;
  format?: string;
  language?: string;
  version?: string;
  thumbnail?: string;
  pdfUrl?: string;
}

const coverGradients = [
  "from-teal-dark to-ink",
  "from-teal to-teal-dark",
  "from-ink to-teal-dark",
  "from-teal-dark to-teal",
  "from-sage to-teal-dark",
  "from-teal to-sage",
  "from-ink to-sage",
  "from-brass to-ink",
  "from-teal to-ink",
  "from-sage to-ink",
  "from-ink to-brass",
  "from-brass to-teal-dark",
];

const defaultValues: ProductData = {
  title: "",
  description: "",
  subject: "Mathematics",
  level: "IGCSE",
  examCode: "",
  type: "Past Paper",
  price: 0,
  tags: [],
  featured: false,
  published: true,
  cover: "from-teal-dark to-ink",
  author: "",
  pages: 0,
};

export function ProductEditor({ open, onClose, onSave, product, mode }: ProductEditorProps) {
  const [form, setForm] = useState<ProductData>(defaultValues);
  const [tagInput, setTagInput] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [resourceFile, setResourceFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const thumbnailRef = useRef<HTMLInputElement>(null);
  const resourceRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (product && mode === "edit") {
      setForm({
        title: product.title,
        description: product.description,
        subject: product.subject,
        level: product.level,
        examCode: product.examCode,
        type: product.type,
        price: product.price,
        originalPrice: product.originalPrice,
        discount: product.discount,
        examBoard: product.examBoard,
        session: product.session,
        paper: product.paper,
        variant: product.variant,
        tags: product.tags || [],
        featured: product.featured,
        published: product.published,
        longDescription: product.longDescription,
        cover: product.cover,
        author: product.author,
        pages: product.pages,
        format: product.format,
        language: product.language,
        version: product.version,
        thumbnail: product.thumbnail,
        pdfUrl: product.pdfUrl,
      });
    } else {
      setForm(defaultValues);
    }
    setTagInput("");
    setThumbnailFile(null);
    setResourceFile(null);
  }, [product, mode, open]);

  if (!open) return null;

  const set = <K extends keyof ProductData>(key: K, value: ProductData[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !form.tags.includes(t)) {
      set("tags", [...form.tags, t]);
    }
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    set("tags", form.tags.filter((t) => t !== tag));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    try {
      const data = { ...form };

      if (thumbnailFile) {
        const ext = thumbnailFile.name.split(".").pop() || "png";
        const path = `products/${Date.now()}.${ext}`;
        data.thumbnail = await uploadThumbnail(thumbnailFile, path);
      }

      if (resourceFile) {
        const ext = resourceFile.name.split(".").pop() || "pdf";
        const path = `products/${Date.now()}.${ext}`;
        data.pdfUrl = await uploadResource(resourceFile, path);
      }

      onSave(data);
      onClose();
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-ink/40 backdrop-blur-sm pt-10 pb-10">
      <div className="relative w-full max-w-2xl rounded-[16px] border border-ink/10 bg-parchment shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-ink/10 px-6 py-4">
          <h2 className="font-display text-[20px] text-ink">
            {mode === "add" ? "Add Resource" : "Edit Resource"}
          </h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-[6px] text-ink/40 transition-colors hover:bg-white hover:text-ink"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M6 18L18 6" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form noValidate onSubmit={handleSubmit} className="max-h-[70vh] overflow-y-auto px-6 py-6">
          <div className="space-y-5">
            {/* Title */}
            <div>
              <label className="text-[13px] font-medium text-ink">Title *</label>
              <input
                required
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
                className="input-field mt-1.5 block w-full rounded-[8px] border border-ink/15 bg-white px-3 py-2.5 text-[14px] text-ink"
                placeholder="e.g. IGCSE Mathematics Paper 4 — Worked Solutions"
              />
            </div>

            {/* Description */}
            <div>
              <label className="text-[13px] font-medium text-ink">Short Description *</label>
              <textarea
                required
                rows={3}
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                className="input-field mt-1.5 block w-full rounded-[8px] border border-ink/15 bg-white px-3 py-2.5 text-[14px] text-ink"
                placeholder="Brief description of the resource…"
              />
            </div>

            {/* Long Description */}
            <div>
              <label className="text-[13px] font-medium text-ink">Full Description</label>
              <textarea
                rows={5}
                value={form.longDescription || ""}
                onChange={(e) => set("longDescription", e.target.value)}
                className="input-field mt-1.5 block w-full rounded-[8px] border border-ink/15 bg-white px-3 py-2.5 text-[14px] text-ink"
                placeholder="Detailed description (paragraphs separated by blank lines)…"
              />
            </div>

            {/* Subject / Level / Type row */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-[13px] font-medium text-ink">Subject *</label>
                <select
                  value={form.subject}
                  onChange={(e) => set("subject", e.target.value)}
                  className="input-field mt-1.5 block w-full rounded-[8px] border border-ink/15 bg-white px-3 py-2.5 text-[13px] text-ink"
                >
                  {allSubjects.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[13px] font-medium text-ink">Qualification *</label>
                <select
                  value={form.level}
                  onChange={(e) => set("level", e.target.value)}
                  className="input-field mt-1.5 block w-full rounded-[8px] border border-ink/15 bg-white px-3 py-2.5 text-[13px] text-ink"
                >
                  {allLevels.map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[13px] font-medium text-ink">Type *</label>
                <select
                  value={form.type}
                  onChange={(e) => set("type", e.target.value as Product["type"])}
                  className="input-field mt-1.5 block w-full rounded-[8px] border border-ink/15 bg-white px-3 py-2.5 text-[13px] text-ink"
                >
                  {allTypes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Exam Board / Session / Paper / Variant row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[13px] font-medium text-ink">Exam Board</label>
                <input
                  value={form.examBoard || ""}
                  onChange={(e) => set("examBoard", e.target.value)}
                  className="input-field mt-1.5 block w-full rounded-[8px] border border-ink/15 bg-white px-3 py-2.5 text-[14px] text-ink"
                  placeholder="e.g. Cambridge"
                />
              </div>
              <div>
                <label className="text-[13px] font-medium text-ink">Exam Code</label>
                <input
                  value={form.examCode}
                  onChange={(e) => set("examCode", e.target.value)}
                  className="input-field mt-1.5 block w-full rounded-[8px] border border-ink/15 bg-white px-3 py-2.5 text-[14px] text-ink"
                  placeholder="e.g. 0580/42/M/J/25"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[13px] font-medium text-ink">Session</label>
                <input
                  value={form.session || ""}
                  onChange={(e) => set("session", e.target.value)}
                  className="input-field mt-1.5 block w-full rounded-[8px] border border-ink/15 bg-white px-3 py-2.5 text-[14px] text-ink"
                  placeholder="e.g. May/June 2025"
                />
              </div>
              <div>
                <label className="text-[13px] font-medium text-ink">Paper</label>
                <input
                  value={form.paper || ""}
                  onChange={(e) => set("paper", e.target.value)}
                  className="input-field mt-1.5 block w-full rounded-[8px] border border-ink/15 bg-white px-3 py-2.5 text-[14px] text-ink"
                  placeholder="e.g. Paper 4"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[13px] font-medium text-ink">Variant</label>
                <input
                  value={form.variant || ""}
                  onChange={(e) => set("variant", e.target.value)}
                  className="input-field mt-1.5 block w-full rounded-[8px] border border-ink/15 bg-white px-3 py-2.5 text-[14px] text-ink"
                  placeholder="e.g. Variant 2"
                />
              </div>
              <div>
                <label className="text-[13px] font-medium text-ink">Author</label>
                <input
                  value={form.author}
                  onChange={(e) => set("author", e.target.value)}
                  className="input-field mt-1.5 block w-full rounded-[8px] border border-ink/15 bg-white px-3 py-2.5 text-[14px] text-ink"
                  placeholder="e.g. Dr. Sarah Chen"
                />
              </div>
            </div>

            {/* Price / Discount / Original Price */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-[13px] font-medium text-ink">Price ($) *</label>
                <input
                  required
                  type="number"
                  step="0.5"
                  min="0"
                  value={form.price}
                  onChange={(e) => set("price", Number(e.target.value))}
                  className="input-field mt-1.5 block w-full rounded-[8px] border border-ink/15 bg-white px-3 py-2.5 text-[14px] text-ink"
                />
              </div>
              <div>
                <label className="text-[13px] font-medium text-ink">Original Price ($)</label>
                <input
                  type="number"
                  step="0.5"
                  min="0"
                  value={form.originalPrice || ""}
                  onChange={(e) => set("originalPrice", e.target.value ? Number(e.target.value) : undefined)}
                  className="input-field mt-1.5 block w-full rounded-[8px] border border-ink/15 bg-white px-3 py-2.5 text-[14px] text-ink"
                />
              </div>
              <div>
                <label className="text-[13px] font-medium text-ink">Discount (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={form.discount || ""}
                  onChange={(e) => set("discount", e.target.value ? Number(e.target.value) : undefined)}
                  className="input-field mt-1.5 block w-full rounded-[8px] border border-ink/15 bg-white px-3 py-2.5 text-[14px] text-ink"
                />
              </div>
            </div>

            {/* Pages / Format / Language */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-[13px] font-medium text-ink">Pages</label>
                <input
                  type="number"
                  min="0"
                  value={form.pages}
                  onChange={(e) => set("pages", Number(e.target.value))}
                  className="input-field mt-1.5 block w-full rounded-[8px] border border-ink/15 bg-white px-3 py-2.5 text-[14px] text-ink"
                />
              </div>
              <div>
                <label className="text-[13px] font-medium text-ink">Format</label>
                <input
                  value={form.format || "PDF"}
                  onChange={(e) => set("format", e.target.value)}
                  className="input-field mt-1.5 block w-full rounded-[8px] border border-ink/15 bg-white px-3 py-2.5 text-[14px] text-ink"
                />
              </div>
              <div>
                <label className="text-[13px] font-medium text-ink">Language</label>
                <input
                  value={form.language || "English"}
                  onChange={(e) => set("language", e.target.value)}
                  className="input-field mt-1.5 block w-full rounded-[8px] border border-ink/15 bg-white px-3 py-2.5 text-[14px] text-ink"
                />
              </div>
            </div>

            {/* Thumbnail upload */}
            <div>
              <label className="text-[13px] font-medium text-ink">Thumbnail</label>
              <div className="mt-1.5 flex items-center gap-3">
                <div className={`flex h-16 w-24 shrink-0 items-center justify-center rounded-[8px] bg-gradient-to-br ${form.cover} text-white/60`}>
                  {form.thumbnail ? (
                    <img src={form.thumbnail} alt="" className="h-full w-full rounded-[8px] object-cover" />
                  ) : (
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <select
                    value={form.cover}
                    onChange={(e) => set("cover", e.target.value)}
                    className="input-field block w-full rounded-[8px] border border-ink/15 bg-white px-3 py-2.5 text-[13px] text-ink"
                  >
                    {coverGradients.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                  <input
                    ref={thumbnailRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setThumbnailFile(file);
                        set("thumbnail", URL.createObjectURL(file));
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => thumbnailRef.current?.click()}
                    className="btn-outline rounded-[8px] border border-ink/15 px-3 py-1.5 text-[12px] font-medium text-ink"
                  >
                    {thumbnailFile ? "Change image" : "Upload image"}
                  </button>
                </div>
              </div>
            </div>

            {/* PDF upload */}
            <div>
              <label className="text-[13px] font-medium text-ink">Resource File (PDF)</label>
              <div className="mt-1.5">
                <input
                  ref={resourceRef}
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setResourceFile(file);
                  }}
                />
                <div
                  onClick={() => resourceRef.current?.click()}
                  className="flex cursor-pointer items-center gap-3 rounded-[8px] border border-dashed border-ink/20 bg-white px-4 py-3 transition-colors hover:border-ink/40"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-ink/30" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  <span className="text-[13px] text-ink/40">
                    {resourceFile
                      ? resourceFile.name
                      : form.pdfUrl
                        ? "Replace PDF file"
                        : "Click to upload a PDF file"}
                  </span>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="text-[13px] font-medium text-ink">Tags</label>
              <div className="mt-1.5 flex flex-wrap gap-2">
                {form.tags.map((tag) => (
                  <span key={tag} className="flex items-center gap-1 rounded-full bg-teal-dark/10 px-2.5 py-1 text-[12px] text-teal-dark">
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)} className="ml-0.5 hover:text-ink">
                      <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M2 2l8 8M10 2l-8 8" />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
              <div className="mt-2 flex gap-2">
                <input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
                  className="input-field flex-1 rounded-[8px] border border-ink/15 bg-white px-3 py-2 text-[13px] text-ink"
                  placeholder="Add a tag…"
                />
                <button type="button" onClick={addTag} className="btn-outline rounded-[8px] border border-ink/15 px-3 py-2 text-[13px] font-medium text-ink">
                  Add
                </button>
              </div>
            </div>

            {/* Published / Featured toggles */}
            <div className="flex gap-6">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <span
                  onClick={() => set("published", !form.published)}
                  className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors ${form.published ? "bg-teal-dark" : "bg-ink/20"}`}
                >
                  <span className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow transition-transform ${form.published ? "translate-x-[18px]" : "translate-x-[3px]"}`} />
                </span>
                <span className="text-[13px] text-ink">Published</span>
              </label>
              <label className="flex items-center gap-2.5 cursor-pointer">
                <span
                  onClick={() => set("featured", !form.featured)}
                  className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors ${form.featured ? "bg-brass" : "bg-ink/20"}`}
                >
                  <span className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow transition-transform ${form.featured ? "translate-x-[18px]" : "translate-x-[3px]"}`} />
                </span>
                <span className="text-[13px] text-ink">Featured</span>
              </label>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 flex items-center justify-end gap-3 border-t border-ink/10 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="btn-outline rounded-[8px] border border-ink/15 px-5 py-2.5 text-[13px] font-medium text-ink"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploading}
              className="btn-primary rounded-[8px] bg-teal-dark px-5 py-2.5 text-[13px] font-medium text-white disabled:opacity-50"
            >
              {uploading ? "Uploading…" : mode === "add" ? "Add Resource" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
