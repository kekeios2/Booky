// hooks/useSearch.ts
"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { toast } from "sonner";

type Book = {
  id: string;
  title: string;
  author: string;
  category: string;
  rating: number;
  image: string;
  coverColor?: string;
};

export const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");
  const [hasSearched, setHasSearched] = useState(false);
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setHasSearched(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/books");
        if (!response.ok) throw new Error("Failed to fetch books");

        const data = await response.json();
        if (data && Array.isArray(data.books)) {
          setBooks(data.books);
          setCategories([
            "All",
            ...new Set(data.books.map((b: Book) => b.category)),
          ] as string[]);
        } else {
          throw new Error("Invalid book data received");
        }
      } catch (err: any) {
        setError(err.message || "An error occurred");
        toast.error("Failed to load books");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);
  const filteredBooks = useMemo(() => {
    if (!hasSearched) return [];

    let result = books.filter(
      (book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (selectedCategory !== "All") {
      result = result.filter((book) => book.category === selectedCategory);
    }

    if (sortOrder === "highest") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortOrder === "lowest") {
      result.sort((a, b) => a.rating - b.rating);
    }

    return result;
  }, [books, searchQuery, selectedCategory, sortOrder, hasSearched]);

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (searchQuery.trim() === "") {
        toast.warning("Pls Write something .. ");
        return;
      }
      setHasSearched(true);
    },
    [searchQuery]
  );

  return {
    searchQuery,
    setSearchQuery,
    books,
    loading,
    error,
    categories,
    selectedCategory,
    setSelectedCategory,
    sortOrder,
    setSortOrder,
    filteredBooks,
    hasSearched,
    handleSearch,
  };
};
