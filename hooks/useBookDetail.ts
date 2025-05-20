// hooks/useBookDetail.ts
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";

type Book = {
  id: number;
  title: string;
  author: string;
  category: string;
  rating: number;
  description: string;
  summary: string;
  image: string;
  coverColor: string;
};

export const useBookDetail = () => {
  const params = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [recommendedBooks, setRecommendedBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchBook = async () => {
      const bookId = params?.id;
      if (!bookId) return;

      try {
        const response = await fetch(`/api/books/${bookId}`);
        const data = await response.json();
        if (response.ok) setBook(data.book);
        else throw new Error(data?.error || "Book not found");
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(message);
        toast.error("Failed to load book");
      } finally {
        setLoading(false);
      }
    };

    const fetchRecommendations = async () => {
      const bookId = params?.id;
      if (!bookId) return;

      try {
        const res = await fetch(`/api/recommendion?id=${bookId}`);
        const data = await res.json();
        if (res.ok) setRecommendedBooks(data.recommendations);
        else throw new Error(data?.error || "Failed to fetch recommendations");
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unknown error";
        toast.error(message);
      }
    };

    fetchBook();
    fetchRecommendations();
  }, [params?.id]);

  const handleBorrow = async () => {
    try {
      const res = await fetch("/api/borrow", {
        method: "POST",
        body: JSON.stringify({ bookId: book?.id }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      res.ok ? toast.success(data.message) : toast.error(data.error);
    } catch {
      toast.error("Something went wrong. Try again.");
    }
  };

  return { book, loading, error, recommendedBooks, isMobile, handleBorrow };
};
