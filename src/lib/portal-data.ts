import type { Order } from "@/lib/dummy-data";

/* ── Seller Data ── */
export const sellerProducts = [
  { id: "LST-001", title: "IGCSE Mathematics Paper 4 — Worked Solutions Pack", status: "active", sales: 142, revenue: 923, downloads: 8420, rating: 4.9, subject: "Mathematics", level: "IGCSE", price: 6.5, updatedAt: "2025-05-15" },
  { id: "LST-002", title: "IGCSE Physics — Complete Revision Notes", status: "active", sales: 98, revenue: 784, downloads: 6250, rating: 4.8, subject: "Science", level: "IGCSE", price: 8.0, updatedAt: "2025-04-20" },
  { id: "LST-003", title: "O Level English 1123 — Ten-Year Past Paper Pack", status: "active", sales: 67, revenue: 737, downloads: 5840, rating: 4.9, subject: "English", level: "O Level", price: 11.0, updatedAt: "2025-02-10" },
  { id: "LST-004", title: "A Level Mathematics — Pure Year 2 Workbook", status: "draft", sales: 0, revenue: 0, downloads: 0, rating: 0, subject: "Mathematics", level: "A Level", price: 13.0, updatedAt: "2025-06-01" },
  { id: "LST-005", title: "IGCSE Chemistry — Practice Question Bank", status: "active", sales: 54, revenue: 459, downloads: 4560, rating: 4.6, subject: "Science", level: "IGCSE", price: 8.5, updatedAt: "2025-05-08" },
  { id: "LST-006", title: "IGCSE Mathematics — Topic Worksheets", status: "active", sales: 43, revenue: 408, downloads: 4100, rating: 4.6, subject: "Mathematics", level: "IGCSE", price: 9.5, updatedAt: "2025-03-18" },
  { id: "LST-007", title: "A Level Physics — Full Mock Exam Series", status: "paused", sales: 12, revenue: 180, downloads: 2890, rating: 4.9, subject: "Science", level: "A Level", price: 15.0, updatedAt: "2025-05-20" },
  { id: "LST-008", title: "IGCSE Biology — Revision Flashcards", status: "active", sales: 76, revenue: 380, downloads: 7200, rating: 4.8, subject: "Science", level: "IGCSE", price: 5.0, updatedAt: "2025-01-25" },
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

export const sellerReviews = [
  { name: "Amara Osei", rating: 5, date: "2025-06-01", text: "The worked solutions actually explain the method, not just the answer. My paper 4 grade moved from a C to an A.", product: "IGCSE Mathematics Paper 4 — Worked Solutions Pack" },
  { name: "James Mitchell", rating: 5, date: "2025-05-28", text: "Bought this for my daughter and her confidence has grown massively. Worth every penny.", product: "IGCSE Physics — Complete Revision Notes" },
  { name: "Fatima Al-Hassan", rating: 5, date: "2025-05-22", text: "I use these worked solutions with all my students. The quality is genuinely examiner-level.", product: "IGCSE Mathematics Paper 4 — Worked Solutions Pack" },
  { name: "Daniel Cho", rating: 4, date: "2025-05-18", text: "Very thorough solutions. Would love video walkthroughs too, but the written solutions are excellent.", product: "IGCSE Mathematics Paper 4 — Worked Solutions Pack" },
  { name: "Priya Sharma", rating: 5, date: "2025-05-12", text: "The best investment I made for my exams. Every question is covered.", product: "O Level English 1123 — Ten-Year Past Paper Pack" },
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
export const adminUsers = [
  { id: "USR-001", name: "Neil Sharma", email: "neil@example.com", role: "student", joined: "2025-01-15", orders: 5, status: "active" },
  { id: "USR-002", name: "Jane Smith", email: "jane@example.com", role: "student", joined: "2025-02-10", orders: 3, status: "active" },
  { id: "USR-003", name: "Dr. Sarah Chen", email: "sarah@marque.com", role: "seller", joined: "2024-06-01", orders: 0, status: "active" },
  { id: "USR-004", name: "John Doe", email: "john@example.com", role: "student", joined: "2025-03-20", orders: 1, status: "active" },
  { id: "USR-005", name: "Priya Patel", email: "priya@example.com", role: "student", joined: "2025-04-05", orders: 5, status: "active" },
  { id: "USR-006", name: "Ahmed Hassan", email: "ahmed@example.com", role: "student", joined: "2025-04-12", orders: 2, status: "suspended" },
  { id: "USR-007", name: "James Wright", email: "james@marque.com", role: "seller", joined: "2024-08-15", orders: 0, status: "active" },
  { id: "USR-008", name: "Lisa Park", email: "lisa@marque.com", role: "seller", joined: "2024-09-20", orders: 0, status: "active" },
  { id: "USR-009", name: "Admin User", email: "admin@marque.com", role: "admin", joined: "2024-01-01", orders: 0, status: "active" },
  { id: "USR-010", name: "Lucas Fernandes", email: "lucas@example.com", role: "student", joined: "2025-05-01", orders: 2, status: "active" },
];

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

export const adminOrders: Order[] = [
  { id: "ORD-001", date: "2025-06-10", total: 14.5, status: "completed", items: [{ title: "IGCSE Mathematics Paper 4 — Worked Solutions Pack", price: 6.5 }, { title: "IGCSE Physics — Complete Revision Notes", price: 8.0 }] },
  { id: "ORD-002", date: "2025-05-22", total: 11.0, status: "completed", items: [{ title: "O Level English 1123 — Ten-Year Past Paper Pack", price: 11.0 }] },
  { id: "ORD-003", date: "2025-04-15", total: 9.5, status: "refunded", items: [{ title: "IGCSE Mathematics — Topic Worksheets (200+ pages)", price: 9.5 }] },
  { id: "ORD-004", date: "2025-06-11", total: 22.5, status: "completed", items: [{ title: "A Level Physics — Full Mock Exam Series", price: 15.0 }, { title: "IGCSE Biology — Revision Flashcards", price: 5.0 }, { title: "IGCSE Chemistry — Practice Question Bank", price: 2.5 }] },
  { id: "ORD-005", date: "2025-06-09", total: 6.5, status: "completed", items: [{ title: "IGCSE Mathematics Paper 4 — Worked Solutions Pack", price: 6.5 }] },
  { id: "ORD-006", date: "2025-06-08", total: 8.0, status: "pending", items: [{ title: "IGCSE Physics — Complete Revision Notes", price: 8.0 }] },
  { id: "ORD-007", date: "2025-06-07", total: 27.0, status: "completed", items: [{ title: "A Level Mathematics — Pure Year 2 Workbook", price: 13.0 }, { title: "O Level English Literature — Study Guide", price: 9.0 }, { title: "IGCSE Biology — Revision Flashcards", price: 5.0 }] },
];

export const adminReviews = [
  { id: "REV-001", name: "Amara Osei", rating: 5, date: "2025-06-01", text: "The worked solutions actually explain the method, not just the answer.", product: "IGCSE Mathematics Paper 4 — Worked Solutions Pack", status: "approved" },
  { id: "REV-002", name: "James Mitchell", rating: 5, date: "2025-05-28", text: "Bought this for my daughter and her confidence has grown massively.", product: "IGCSE Physics — Complete Revision Notes", status: "approved" },
  { id: "REV-003", name: "Troll Account", rating: 1, date: "2025-06-05", text: "This is a scam! Don't buy!", product: "IGCSE Mathematics Paper 4 — Worked Solutions Pack", status: "reported" },
  { id: "REV-004", name: "Fatima Al-Hassan", rating: 5, date: "2025-05-22", text: "I use these worked solutions with all my students. Examiner-level quality.", product: "IGCSE Mathematics Paper 4 — Worked Solutions Pack", status: "approved" },
  { id: "REV-005", name: "Daniel Cho", rating: 4, date: "2025-05-18", text: "Very thorough solutions. Would love video walkthroughs too.", product: "IGCSE Mathematics Paper 4 — Worked Solutions Pack", status: "pending" },
  { id: "REV-006", name: "Priya Sharma", rating: 5, date: "2025-05-12", text: "The best investment I made for my exams.", product: "O Level English 1123 — Ten-Year Past Paper Pack", status: "approved" },
  { id: "REV-007", name: "Spam Bot", rating: 1, date: "2025-06-08", text: "Buy cheap resources at www.spam.com!!!", product: "IGCSE Physics — Complete Revision Notes", status: "reported" },
];

export const adminCategories = [
  { id: "CAT-001", name: "Mathematics", type: "subject", count: 428, status: "active" },
  { id: "CAT-002", name: "Science", type: "subject", count: 512, status: "active" },
  { id: "CAT-003", name: "English", type: "subject", count: 316, status: "active" },
  { id: "CAT-004", name: "IGCSE", type: "level", count: 890, status: "active" },
  { id: "CAT-005", name: "O Level", type: "level", count: 412, status: "active" },
  { id: "CAT-006", name: "A Level", type: "level", count: 354, status: "active" },
  { id: "CAT-007", name: "Past Paper", type: "resource_type", count: 480, status: "active" },
  { id: "CAT-008", name: "Mock Test", type: "resource_type", count: 245, status: "active" },
  { id: "CAT-009", name: "Worksheet", type: "resource_type", count: 312, status: "active" },
  { id: "CAT-010", name: "Revision Notes", type: "resource_type", count: 219, status: "active" },
  { id: "CAT-011", name: "algebra", type: "tag", count: 156, status: "active" },
  { id: "CAT-012", name: "paper 4", type: "tag", count: 89, status: "active" },
  { id: "CAT-013", name: "physics", type: "tag", count: 234, status: "active" },
  { id: "CAT-014", name: "chemistry", type: "tag", count: 178, status: "active" },
  { id: "CAT-015", name: "biology", type: "tag", count: 145, status: "active" },
];

export const adminRevenueData = [
  { label: "Jan", value: 12400 },
  { label: "Feb", value: 15800 },
  { label: "Mar", value: 18200 },
  { label: "Apr", value: 16900 },
  { label: "May", value: 22100 },
  { label: "Jun", value: 24800 },
];

export const adminUsersData = [
  { label: "Jan", value: 820 },
  { label: "Feb", value: 940 },
  { label: "Mar", value: 1120 },
  { label: "Apr", value: 1050 },
  { label: "May", value: 1280 },
  { label: "Jun", value: 1420 },
];

export const adminDownloadsData = [
  { label: "Jan", value: 4200 },
  { label: "Feb", value: 5100 },
  { label: "Mar", value: 6300 },
  { label: "Apr", value: 5800 },
  { label: "May", value: 7200 },
  { label: "Jun", value: 8400 },
];

export const adminSalesByCountry = [
  { label: "India", value: 4200, color: "#1F4B43" },
  { label: "UK", value: 3100, color: "#8FB3A3" },
  { label: "Singapore", value: 2400, color: "#B08D57" },
  { label: "UAE", value: 1800, color: "#5B6663" },
  { label: "Nigeria", value: 1200, color: "#EFEAE0" },
];

export const adminTopSellers = [
  { name: "Dr. Sarah Chen", products: 5, revenue: 2150, rating: 4.8 },
  { name: "James Wright", products: 3, revenue: 1700, rating: 4.8 },
  { name: "Prof. Amara Osei", products: 3, revenue: 1520, rating: 4.7 },
  { name: "Lisa Park", products: 2, revenue: 760, rating: 4.8 },
  { name: "Dr. Priya Nair", products: 2, revenue: 640, rating: 4.7 },
];
