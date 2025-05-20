// types.ts
export interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  rating: number;
  description: string;
  summary: string;
  image: string;
  coverColor?: string;
  borrowedAt?: string;
  pdfUrl?: string;
}
export interface Notification {
  id: string;
  title: string;
  body?: string;
  read: boolean;
  createdAt: string; // إذا كنت تستخدمه في الفرز أو العرض الزمني
}