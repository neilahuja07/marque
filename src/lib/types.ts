export type ProductType = "Past Paper" | "Mock Test" | "Worksheet" | "Revision Notes";

export type Product = {
  id: string;
  slug: string;
  title: string;
  description: string;
  subject: string;
  level: string;
  examCode: string;
  type: ProductType;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  pages: number;
  downloads: number;
  cover: string;
  bestseller: boolean;
  published: boolean;
  featured: boolean;
  tags: string[];
  author: string;
  updatedAt: string;
  createdAt?: string;
  examBoard?: string;
  session?: string;
  paper?: string;
  variant?: string;
  language?: string;
  format?: string;
  version?: string;
  thumbnail?: string;
  previewImages?: string[];
  pdfUrl?: string;
  longDescription?: string;
  whatsIncluded?: string[];
  syllabusCoverage?: string[];
  ratingDistribution?: { stars: number; count: number }[];
  reviews?: { name: string; role: string; rating: number; date: string; text: string }[];
  productFaqs?: FAQ[];
};

export type FAQ = {
  question: string;
  answer: string;
};
