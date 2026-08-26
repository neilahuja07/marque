import type { Order } from "@/lib/dummy-data";

/* ── Seller Data ── */
export const sellerProducts = [
  { id: "LST-001", title: "IGCSE Mathematics Paper 4 — Worked Solutions Pack", status: "active", sales: 142, revenue: 923, downloads: 8420, rating: 4.9, subject: "Mathematics", level: "Grade 7", price: 6.5, updatedAt: "2025-05-15" },
  { id: "LST-002", title: "IGCSE Physics — Complete Revision Notes", status: "active", sales: 98, revenue: 784, downloads: 6250, rating: 4.8, subject: "Science", level: "Grade 7", price: 8.0, updatedAt: "2025-04-20" },
  { id: "LST-003", title: "O Level English 1123 — Ten-Year Past Paper Pack", status: "active", sales: 67, revenue: 737, downloads: 5840, rating: 4.9, subject: "English", level: "Grade 8", price: 11.0, updatedAt: "2025-02-10" },
  { id: "LST-004", title: "A Level Mathematics — Pure Year 2 Workbook", status: "draft", sales: 0, revenue: 0, downloads: 0, rating: 0, subject: "Mathematics", level: "Grade 8", price: 13.0, updatedAt: "2025-06-01" },
  { id: "LST-005", title: "IGCSE Chemistry — Practice Question Bank", status: "active", sales: 54, revenue: 459, downloads: 4560, rating: 4.6, subject: "Science", level: "Grade 7", price: 8.5, updatedAt: "2025-05-08" },
  { id: "LST-006", title: "IGCSE Mathematics — Topic Worksheets", status: "active", sales: 43, revenue: 408, downloads: 4100, rating: 4.6, subject: "Mathematics", level: "Grade 6", price: 9.5, updatedAt: "2025-03-18" },
  { id: "LST-007", title: "A Level Physics — Full Mock Exam Series", status: "paused", sales: 12, revenue: 180, downloads: 2890, rating: 4.9, subject: "Science", level: "Grade 8", price: 15.0, updatedAt: "2025-05-20" },
  { id: "LST-008", title: "IGCSE Biology — Revision Flashcards", status: "active", sales: 76, revenue: 380, downloads: 7200, rating: 4.8, subject: "Science", level: "Grade 7", price: 5.0, updatedAt: "2025-01-25" },
];

export const sellerOrders: Order[] = [
  { id: "ORD-201", date: "2025-06-12", total: 14.5, status: "completed", items: [{ title: "IGCSE Mathematics Paper 4 — Worked Solutions Pack", price: 6.5 }, { title: "IGCSE Physics — Complete Revision Notes", price: 8.0 }] },
  { id: "ORD-202", date: "2025-06-11", total: 11.0, status: "completed", items: [{ title: "O Level English 1123 — Ten-Year Past Paper Pack", price: 11.0 }] },
  { id: "ORD-203", date: "2025-06-10", total: 8.5, status: "completed", items: [{ title: "IGCSE Chemistry — Practice Question Bank", price: 8.5 }] },
  { id: "ORD-204", date: "2025-06-09", total: 9.5, status: "completed", items: [{ title: "IGCSE Mathematics — Topic Worksheets", price: 9.5 }] },
  { id: "ORD-205", date: "2025-06-08", total: 6.5, status: "refunded", items: [{ title: "IGCSE Mathematics Paper 4 — Worked Solutions Pack", price: 6.5 }] },
  { id: "ORD-206", date: "2025-06-07", total: 15.0, status: "completed", items: [{ title: "A Level Physics — Full Mock Exam Series", price: 15.0 }] },
  { id: "ORD-207", date: "2025-06-06", total: 5.0, status: "pending", items: [{ title: "IGCSE Biology — Revision Flashcards", price: 5.0 }] },
  { id: "ORD-208", date: "2025-06-05", total: 21.5, status: "completed", items: [{ title: "O Level English 1123 — Ten-Year Past Paper Pack", price: 11.0 }, { title: "IGCSE Chemistry — Practice Question Bank", price: 8.5 }, { title: "IGCSE Biology — Revision Flashcards", price: 2.0 }] },
];

export const sellerRevenueData = [
  { label: "Jan", value: 180 },
  { label: "Feb", value: 240 },
  { label: "Mar", value: 320 },
  { label: "Apr", value: 290 },
  { label: "May", value: 410 },
  { label: "Jun", value: 480 },
];

export const sellerDownloadsData = [
  { label: "Jan", value: 420 },
  { label: "Feb", value: 580 },
  { label: "Mar", value: 710 },
  { label: "Apr", value: 650 },
  { label: "May", value: 820 },
  { label: "Jun", value: 940 },
];

export const sellerSalesBySubject = [
  { label: "Mathematics", value: 185, color: "#1F4B43" },
  { label: "Science", value: 164, color: "#8FB3A3" },
  { label: "English", value: 67, color: "#B08D57" },
];

/* ── Admin Data ── */
export const adminResources = [
  { id: "LST-001", title: "IGCSE Mathematics Paper 4 — Worked Solutions Pack", seller: "Dr. Sarah Chen", status: "approved", subject: "Mathematics", submitted: "2025-03-15", featured: true },
  { id: "LST-002", title: "IGCSE Physics — Complete Revision Notes", seller: "James Wright", status: "approved", subject: "Science", submitted: "2025-04-20", featured: false },
  { id: "LST-003", title: "O Level English 1123 — Ten-Year Past Paper Pack", seller: "Prof. Amara Osei", status: "approved", subject: "English", submitted: "2025-02-10", featured: false },
  { id: "LST-004", title: "A Level Mathematics — Pure Year 2 Workbook", seller: "Dr. Sarah Chen", status: "pending", subject: "Mathematics", submitted: "2025-06-01", featured: false },
  { id: "LST-005", title: "IGCSE Chemistry — Practice Question Bank", seller: "Dr. Priya Nair", status: "approved", subject: "Science", submitted: "2025-05-08", featured: false },
  { id: "LST-006", title: "IGCSE Mathematics — Topic Worksheets", seller: "Dr. Sarah Chen", status: "approved", subject: "Mathematics", submitted: "2025-03-18", featured: false },
  { id: "LST-007", title: "A Level Physics — Full Mock Exam Series", seller: "James Wright", status: "approved", subject: "Science", submitted: "2025-05-20", featured: true },
  { id: "LST-008", title: "IGCSE Biology — Revision Flashcards", seller: "Lisa Park", status: "approved", subject: "Science", submitted: "2025-01-25", featured: false },
  { id: "LST-009", title: "O Level English Literature — Study Guide", seller: "Prof. Amara Osei", status: "pending", subject: "English", submitted: "2025-06-10", featured: false },
  { id: "LST-010", title: "A Level Further Mathematics — Revision Notes", seller: "Dr. Sarah Chen", status: "rejected", subject: "Mathematics", submitted: "2025-03-28", featured: false },
];
