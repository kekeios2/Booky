// types.ts
export interface Book {
  id: string;
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
