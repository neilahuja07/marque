"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { type Product } from "@/lib/types";
import { allSubjects, allLevels, allTypes } from "@/lib/dummy-data";
import { uploadThumbnail, uploadResource, uploadPreviewImage, deletePreviewImage, resolveThumbnailUrl, resolvePreviewUrl, deleteStorageFile } from "@/lib/supabase/products";

const THUMBNAIL_BUCKET = "resource-thumbnails";
const PDF_BUCKET = "resource-pdfs";
const MAX_THUMBNAIL_SIZE = 5 * 1024 * 1024;
const MAX_PDF_SIZE = 50 * 1024 * 1024;
const ALLOWED_THUMBNAIL_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"];

interface ProductEditorProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: ProductData, meta?: { id?: string }) => Promise<void>;
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
  previewImages?: string[];
  pdfUrl?: string;
}

export interface PreviewSlot {
  url: string;
  path?: string;
  file?: File;
}

const MAX_PREVIEW_IMAGES = 4;
const MAX_PREVIEW_SIZE = 5 * 1024 * 1024;

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
  level: "Grade 4",
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
  const [thumbnailUploading, setThumbnailUploading] = useState(false);
  const [pdfUploading, setPdfUploading] = useState(false);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [pdfName, setPdfName] = useState<string | null>(null);
  const [previewSlots, setPreviewSlots] = useState<PreviewSlot[]>([]);
  const [previewError, setPreviewError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const thumbnailDropRef = useRef<HTMLDivElement>(null);
  const pdfDropRef = useRef<HTMLDivElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);
  const previewInputRef = useRef<HTMLInputElement>(null);
  const previewDropRef = useRef<HTMLDivElement>(null);

  const isUploading = thumbnailUploading || pdfUploading || saving;

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
        previewImages: product.previewImages,
        pdfUrl: product.pdfUrl,
      });
      if (product.thumbnail) {
        setThumbnailPreview(resolveThumbnailUrl(product.thumbnail) || null);
      } else {
        setThumbnailPreview(null);
      }
      setPreviewSlots(
        (product.previewImages || [])
          .filter((path) => typeof path === "string" && path.length > 0)
          .slice(0, MAX_PREVIEW_IMAGES)
          .map((path) => ({ url: resolvePreviewUrl(path) || path, path })),
      );
      if (product.pdfUrl) {
        setPdfName(product.pdfUrl.split("/").pop() || "resource.pdf");
      } else {
        setPdfName(null);
      }
    } else {
      setForm(defaultValues);
      setThumbnailPreview(null);
      setPdfName(null);
      setPreviewSlots([]);
    }
    setTagInput("");
    setThumbnailUploading(false);
    setPdfUploading(false);
    setPreviewError(null);
    setErrors({});
  }, [product, mode, open]);

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

  const makePath = (ext: string) =>
    `products/${Date.now()}-${Math.random().toString(36).slice(2, 6)}.${ext}`;

  const handleThumbnailFile = useCallback(async (file: File) => {
    const ext = "." + (file.name.split(".").pop() || "").toLowerCase();
    if (!ALLOWED_THUMBNAIL_EXTENSIONS.includes(ext)) {
      setErrors((prev) => ({ ...prev, thumbnail: "Invalid file type. Allowed: .jpg, .jpeg, .png, .webp" }));
      return;
    }
    if (file.size > MAX_THUMBNAIL_SIZE) {
      setErrors((prev) => ({ ...prev, thumbnail: "File too large. Max 5 MB." }));
      return;
    }

    setErrors((prev) => { const n = { ...prev }; delete n.thumbnail; return n; });
    setThumbnailPreview(URL.createObjectURL(file));
    setThumbnailUploading(true);

    try {
      const path = makePath(ext.slice(1));
      const storedPath = await uploadThumbnail(file, path);

      if (mode === "edit" && form.thumbnail) {
        deleteStorageFile(form.thumbnail, THUMBNAIL_BUCKET).catch(() => {});
      }

      set("thumbnail", storedPath);
      setThumbnailPreview(resolveThumbnailUrl(storedPath) || null);
    } catch (err: unknown) {
      setErrors((prev) => ({
        ...prev,
        thumbnail: err instanceof Error ? err.message : "Upload failed",
      }));
      setThumbnailPreview(null);
    } finally {
      setThumbnailUploading(false);
    }
  }, [mode, form.thumbnail, set]);

  const handlePdfFile = useCallback(async (file: File) => {
    if (file.type && file.type !== "application/pdf") {
      setErrors((prev) => ({ ...prev, pdf: "Only PDF files are allowed." }));
      return;
    }
    if (!file.name.toLowerCase().endsWith(".pdf")) {
      setErrors((prev) => ({ ...prev, pdf: "Only PDF files are allowed." }));
      return;
    }
    if (file.size > MAX_PDF_SIZE) {
      setErrors((prev) => ({ ...prev, pdf: "File too large. Max 50 MB." }));
      return;
    }

    setErrors((prev) => { const n = { ...prev }; delete n.pdf; return n; });
    setPdfName(file.name);
    setPdfUploading(true);

    try {
      const path = makePath("pdf");
      const storedPath = await uploadResource(file, path);

      if (mode === "edit" && form.pdfUrl) {
        deleteStorageFile(form.pdfUrl, PDF_BUCKET).catch(() => {});
      }

      set("pdfUrl", storedPath);
    } catch (err: unknown) {
      setErrors((prev) => ({
        ...prev,
        pdf: err instanceof Error ? err.message : "Upload failed",
      }));
      setPdfName(null);
    } finally {
      setPdfUploading(false);
    }
  }, [mode, form.pdfUrl, set]);

  const handleThumbnailDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleThumbnailFile(file);
  }, [handleThumbnailFile]);

  const handlePdfDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handlePdfFile(file);
  }, [handlePdfFile]);

  const addPreviewFiles = useCallback((files: FileList | File[]) => {
    setPreviewError(null);
    const list = Array.from(files).slice(0, MAX_PREVIEW_IMAGES);
    setPreviewSlots((prev) => {
      const available = MAX_PREVIEW_IMAGES - prev.length;
      const incoming = list.slice(0, available);
      const added: PreviewSlot[] = incoming.map((file) => ({
        url: URL.createObjectURL(file),
        file,
      }));
      if (list.length > available) {
        setPreviewError(`You can add up to ${MAX_PREVIEW_IMAGES} preview images.`);
      }
      return [...prev, ...added];
    });
  }, []);

  const handlePreviewFile = useCallback((file: File) => {
    const ext = "." + (file.name.split(".").pop() || "").toLowerCase();
    if (!ALLOWED_THUMBNAIL_EXTENSIONS.includes(ext)) {
      setPreviewError("Invalid file type. Allowed: .jpg, .jpeg, .png, .webp");
      return;
    }
    if (file.size > MAX_PREVIEW_SIZE) {
      setPreviewError("File too large. Max 5 MB.");
      return;
    }
    addPreviewFiles([file]);
  }, [addPreviewFiles]);

  const handlePreviewDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length === 0) return;
    if (files.length === 1) {
      handlePreviewFile(files[0]);
    } else {
      addPreviewFiles(files);
    }
  }, [handlePreviewFile, addPreviewFiles]);

  const removePreviewSlot = useCallback((index: number) => {
    setPreviewSlots((prev) => {
      const slot = prev[index];
      if (slot?.file && slot.url.startsWith("blob:")) {
        URL.revokeObjectURL(slot.url);
      }
      const next = prev.filter((_, i) => i !== index);
      setPreviewError(null);
      return next;
    });
  }, []);

  const movePreviewSlot = useCallback((from: number, to: number) => {
    setPreviewSlots((prev) => {
      if (from === to || from < 0 || to < 0 || from >= prev.length || to >= prev.length) return prev;
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
  }, []);

  const previewInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      addPreviewFiles(files);
    }
    e.target.value = "";
  }, [addPreviewFiles]);

  /** Upload any new preview files, build final path list, and set thumbnail to the first preview. */
  const persistPreviewImages = useCallback(async (productId: string, currentSlots: PreviewSlot[]) => {
    const paths: string[] = [];
    const newUploads: string[] = [];
    for (const slot of currentSlots) {
      if (slot.path) {
        paths.push(slot.path);
      } else if (slot.file) {
        const ext = "." + (slot.file.name.split(".").pop() || "jpg").toLowerCase();
        const path = `${productId}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;
        const storedPath = await uploadPreviewImage(slot.file, path);
        newUploads.push(storedPath);
        paths.push(storedPath);
      }
    }
    return { paths, newUploads };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.description.trim()) newErrors.description = "Description is required";
    if (!form.thumbnail) newErrors.thumbnail = "Thumbnail is required";
    if (!form.pdfUrl) newErrors.pdf = "PDF is required";
    if (form.price < 0) newErrors.price = "Price must be positive";

    if (previewSlots.length > MAX_PREVIEW_IMAGES) {
      newErrors.previewImages = `You can add up to ${MAX_PREVIEW_IMAGES} preview images.`;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSaving(true);

    // Determine the product id used for storage paths.
    const productId = mode === "edit" && product?.id ? product.id : crypto.randomUUID();

    const newUploads: string[] = [];
    let removedExisting: string[] = [];
    try {
      const { paths, newUploads: uploaded } = await persistPreviewImages(productId, previewSlots);
      newUploads.push(...uploaded);

      const finalPreviewImages = paths;
      const firstPreview = finalPreviewImages[0] || undefined;

      // Only delete replaced/removed existing preview files after a successful DB write.
      if (mode === "edit" && product?.previewImages) {
        removedExisting = product.previewImages.filter((p) => !finalPreviewImages.includes(p));
      }

      const savedForm: ProductData = {
        ...form,
        previewImages: finalPreviewImages,
        thumbnail: firstPreview || form.thumbnail,
      };

      await onSave(savedForm, { id: mode === "add" ? productId : undefined });

      await Promise.all(removedExisting.map((path) => deletePreviewImage(path).catch(() => {})));
    } catch (err: unknown) {
      // Clean up any newly uploaded preview files to avoid orphans.
      await Promise.all(newUploads.map((path) => deletePreviewImage(path).catch(() => {})));
      setSaving(false);
      setErrors((prev) => ({
        ...prev,
        previewImages: err instanceof Error ? err.message : "Could not save preview images",
      }));
      return;
    }

    setSaving(false);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-ink/40 backdrop-blur-sm pt-10 pb-10">
      <div className="relative w-full max-w-2xl rounded-[16px] border border-ink/10 bg-parchment shadow-2xl">
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

        <form noValidate onSubmit={handleSubmit} className="max-h-[70vh] overflow-y-auto px-6 py-6">
          <div className="space-y-5">
            {/* Title */}
            <div>
              <label className="text-[13px] font-medium text-ink">Title *</label>
              <input
                required
                value={form.title}
                onChange={(e) => { set("title", e.target.value); setErrors((prev) => { const n = { ...prev }; delete n.title; return n; }); }}
                className={`input-field mt-1.5 block w-full rounded-[8px] border bg-white px-3 py-2.5 text-[14px] text-ink ${errors.title ? "border-red-400" : "border-ink/15"}`}
                placeholder="e.g. Mathematics Paper 4 — Worked Solutions"
              />
              {errors.title && <p className="mt-1 text-[12px] text-red-500">{errors.title}</p>}
            </div>

            {/* Description */}
            <div>
              <label className="text-[13px] font-medium text-ink">Short Description *</label>
              <textarea
                required
                rows={3}
                value={form.description}
                onChange={(e) => { set("description", e.target.value); setErrors((prev) => { const n = { ...prev }; delete n.description; return n; }); }}
                className={`input-field mt-1.5 block w-full rounded-[8px] border bg-white px-3 py-2.5 text-[14px] text-ink ${errors.description ? "border-red-400" : "border-ink/15"}`}
                placeholder="Brief description of the resource…"
              />
              {errors.description && <p className="mt-1 text-[12px] text-red-500">{errors.description}</p>}
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

            {/* Subject / Level / Type */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div>
                <label className="text-[13px] font-medium text-ink">Subject *</label>
                <select
                  value={form.subject}
                  onChange={(e) => set("subject", e.target.value)}
                  className="input-field mt-1.5 block w-full rounded-[8px] border border-ink/15 bg-white px-3 py-2.5 text-[13px] text-ink"
                >
                  {allSubjects.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[13px] font-medium text-ink">Grade *</label>
                <select
                  value={form.level}
                  onChange={(e) => set("level", e.target.value)}
                  className="input-field mt-1.5 block w-full rounded-[8px] border border-ink/15 bg-white px-3 py-2.5 text-[13px] text-ink"
                >
                  {allLevels.map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[13px] font-medium text-ink">Type *</label>
                <select
                  value={form.type}
                  onChange={(e) => set("type", e.target.value as Product["type"])}
                  className="input-field mt-1.5 block w-full rounded-[8px] border border-ink/15 bg-white px-3 py-2.5 text-[13px] text-ink"
                >
                  {allTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>

            {/* Exam Code */}
            <div>
              <label className="text-[13px] font-medium text-ink">Exam Code</label>
              <input
                value={form.examCode}
                onChange={(e) => set("examCode", e.target.value)}
                className="input-field mt-1.5 block w-full rounded-[8px] border border-ink/15 bg-white px-3 py-2.5 text-[14px] text-ink"
                placeholder="e.g. 0580/42/M/J/25"
              />
            </div>

            {/* Session / Paper / Variant / Author */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
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
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
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

            {/* Price / Original Price */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="text-[13px] font-medium text-ink">Price ($) *</label>
                <input
                  required
                  type="number"
                  step="0.5"
                  min="0"
                  value={form.price}
                  onChange={(e) => { set("price", Number(e.target.value)); setErrors((prev) => { const n = { ...prev }; delete n.price; return n; }); }}
                  className={`input-field mt-1.5 block w-full rounded-[8px] border bg-white px-3 py-2.5 text-[14px] text-ink ${errors.price ? "border-red-400" : "border-ink/15"}`}
                />
                {errors.price && <p className="mt-1 text-[12px] text-red-500">{errors.price}</p>}
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
            </div>

            {/* Pages / Format / Language */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
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

            {/* Thumbnail Upload */}
            <div>
              <label className="text-[13px] font-medium text-ink">Thumbnail *</label>
              <div className="mt-1.5">
                {thumbnailPreview && !thumbnailUploading ? (
                  <div className="relative inline-block">
                    <img
                      src={thumbnailPreview}
                      alt="Thumbnail preview"
                      className="h-40 w-56 rounded-[8px] object-cover"
                      loading="lazy"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setThumbnailPreview(null);
                        set("thumbnail", undefined);
                        setErrors((prev) => { const n = { ...prev }; delete n.thumbnail; return n; });
                      }}
                      className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white text-[11px] hover:bg-red-600"
                    >
                      ✕
                    </button>
                  </div>
                ) : thumbnailUploading ? (
                  <div className="flex h-40 w-56 items-center justify-center rounded-[8px] border-2 border-dashed border-teal-dark/30 bg-teal-dark/5">
                    <div className="text-center">
                      <svg className="mx-auto h-8 w-8 animate-spin text-teal-dark" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      <p className="mt-2 text-[13px] text-teal-dark font-medium">Uploading…</p>
                    </div>
                  </div>
                ) : (
                  <div
                    ref={thumbnailDropRef}
                    onDrop={handleThumbnailDrop}
                    onDragOver={(e) => e.preventDefault()}
                    onDragEnter={(e) => e.preventDefault()}
                    onDragLeave={(e) => e.preventDefault()}
                    onClick={() => thumbnailInputRef.current?.click()}
                    className={`flex cursor-pointer flex-col items-center justify-center rounded-[8px] border-2 border-dashed px-4 py-8 transition-colors ${
                      errors.thumbnail ? "border-red-300 bg-red-50" : "border-ink/20 bg-white hover:border-ink/40"
                    }`}
                  >
                    <svg viewBox="0 0 24 24" className="mb-2 h-8 w-8 text-ink/20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                    <p className="text-[13px] text-ink/60">
                      <span className="font-medium text-teal-dark">Click to browse</span> or drag and drop
                    </p>
                    <p className="mt-0.5 text-[11px] text-slate">.jpg, .jpeg, .png, .webp — max 5 MB</p>
                  </div>
                )}
                {errors.thumbnail && <p className="mt-1 text-[12px] text-red-500">{errors.thumbnail}</p>}
                <input
                  ref={thumbnailInputRef}
                  type="file"
                  accept=".jpg,.jpeg,.png,.webp"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleThumbnailFile(file);
                    e.target.value = "";
                  }}
                />
              </div>
            </div>

            {/* Preview Images */}
            <div>
              <label className="text-[13px] font-medium text-ink">Preview Images</label>
              <p className="mt-0.5 text-[12px] text-slate">Upload up to 4 images. The first image is used as the featured preview.</p>

              {previewSlots.length > 0 && (
                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {previewSlots.map((slot, i) => (
                    <div key={i} className="group relative">
                      <div className={`relative overflow-hidden rounded-[8px] border ${i === 0 ? "border-teal-dark" : "border-ink/15"} bg-white`}>
                        <img
                          src={slot.url}
                          alt={`Preview ${i + 1}`}
                          className="aspect-[4/3] w-full object-cover"
                          loading="lazy"
                        />
                        <span className="absolute left-1.5 top-1.5 rounded-[4px] bg-ink/70 px-1.5 py-0.5 text-[10px] font-medium text-white">
                          {i + 1}
                        </span>
                        {i === 0 && previewSlots.length > 1 && (
                          <span className="absolute right-1.5 top-1.5 rounded-[4px] bg-teal-dark/90 px-1.5 py-0.5 text-[9px] font-medium text-white">
                            Featured
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => removePreviewSlot(i)}
                          className="absolute right-1.5 bottom-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white text-[11px] shadow hover:bg-red-600"
                          aria-label={`Remove preview ${i + 1}`}
                        >
                          ✕
                        </button>
                      </div>
                      <div className="mt-1.5 flex items-center justify-between">
                        <span className="text-[11px] text-slate">Image {i + 1}</span>
                        <div className="flex items-center gap-0.5">
                          <button
                            type="button"
                            disabled={i === 0}
                            onClick={() => movePreviewSlot(i, i - 1)}
                            className="flex h-6 w-6 items-center justify-center rounded-[4px] text-ink/50 hover:bg-parchment hover:text-ink disabled:opacity-30"
                            aria-label="Move preview up"
                          >
                            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="18 15 12 9 6 15" />
                            </svg>
                          </button>
                          <button
                            type="button"
                            disabled={i === previewSlots.length - 1}
                            onClick={() => movePreviewSlot(i, i + 1)}
                            className="flex h-6 w-6 items-center justify-center rounded-[4px] text-ink/50 hover:bg-parchment hover:text-ink disabled:opacity-30"
                            aria-label="Move preview down"
                          >
                            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="6 9 12 15 18 9" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-3">
                {previewSlots.length >= MAX_PREVIEW_IMAGES ? (
                  <div className="flex flex-col items-center justify-center rounded-[8px] border-2 border-dashed border-ink/15 bg-parchment/50 px-4 py-6 text-center">
                    <p className="text-[13px] text-ink/60">You have reached the maximum of {MAX_PREVIEW_IMAGES} preview images.</p>
                  </div>
                ) : (
                  <div
                    ref={previewDropRef}
                    onDrop={handlePreviewDrop}
                    onDragOver={(e) => e.preventDefault()}
                    onDragEnter={(e) => e.preventDefault()}
                    onDragLeave={(e) => e.preventDefault()}
                    onClick={() => previewInputRef.current?.click()}
                    className={`flex cursor-pointer flex-col items-center justify-center rounded-[8px] border-2 border-dashed px-4 py-6 transition-colors ${
                      previewError ? "border-red-300 bg-red-50" : "border-ink/20 bg-white hover:border-ink/40"
                    }`}
                  >
                    <svg viewBox="0 0 24 24" className="mb-2 h-7 w-7 text-ink/20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                    <p className="text-[13px] text-ink/60">
                      <span className="font-medium text-teal-dark">Click to browse</span> or drag and drop
                    </p>
                    <p className="mt-0.5 text-[11px] text-slate">
                      .jpg, .jpeg, .png, .webp — max 5 MB ({previewSlots.length}/{MAX_PREVIEW_IMAGES})
                    </p>
                  </div>
                )}
                {(previewError || errors.previewImages) && (
                  <p className="mt-1 text-[12px] text-red-500">{previewError || errors.previewImages}</p>
                )}
                <input
                  ref={previewInputRef}
                  type="file"
                  accept=".jpg,.jpeg,.png,.webp"
                  multiple
                  className="hidden"
                  onChange={previewInputChange}
                />
              </div>
            </div>

            {/* PDF Upload */}
            <div>
              <label className="text-[13px] font-medium text-ink">Resource File (PDF) *</label>
              <div className="mt-1.5">
                {pdfName && !pdfUploading ? (
                  <div className="relative flex items-center gap-3 rounded-[8px] border border-sage/30 bg-sage/10 px-4 py-3">
                    <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0 text-teal-dark" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-[13px] font-medium text-teal-dark">{pdfName}</p>
                      <p className="text-[11px] text-teal-dark/70">Uploaded successfully</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setPdfName(null);
                        set("pdfUrl", undefined);
                        setErrors((prev) => { const n = { ...prev }; delete n.pdf; return n; });
                      }}
                      className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white text-[11px] hover:bg-red-600"
                    >
                      ✕
                    </button>
                  </div>
                ) : pdfUploading ? (
                  <div className="flex items-center justify-center gap-3 rounded-[8px] border-2 border-dashed border-teal-dark/30 bg-teal-dark/5 px-4 py-8">
                    <svg className="h-6 w-6 animate-spin text-teal-dark" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    <span className="text-[13px] text-teal-dark font-medium">Uploading PDF…</span>
                  </div>
                ) : (
                  <div
                    ref={pdfDropRef}
                    onDrop={handlePdfDrop}
                    onDragOver={(e) => e.preventDefault()}
                    onDragEnter={(e) => e.preventDefault()}
                    onDragLeave={(e) => e.preventDefault()}
                    onClick={() => pdfInputRef.current?.click()}
                    className={`flex cursor-pointer flex-col items-center justify-center rounded-[8px] border-2 border-dashed px-4 py-8 transition-colors ${
                      errors.pdf ? "border-red-300 bg-red-50" : "border-ink/20 bg-white hover:border-ink/40"
                    }`}
                  >
                    <svg viewBox="0 0 24 24" className="mb-2 h-8 w-8 text-ink/20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                    <p className="text-[13px] text-ink/60">
                      <span className="font-medium text-teal-dark">Click to browse</span> or drag and drop
                    </p>
                    <p className="mt-0.5 text-[11px] text-slate">PDF only — max 50 MB</p>
                  </div>
                )}
                {errors.pdf && <p className="mt-1 text-[12px] text-red-500">{errors.pdf}</p>}
                <input
                  ref={pdfInputRef}
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handlePdfFile(file);
                    e.target.value = "";
                  }}
                />
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

            {/* Published / Featured Toggles */}
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
              disabled={isUploading}
              className="btn-primary rounded-[8px] bg-teal-dark px-5 py-2.5 text-[13px] font-medium text-white disabled:opacity-50"
            >
              {isUploading ? "Uploading…" : mode === "add" ? "Add Resource" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
