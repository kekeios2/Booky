"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { toast } from "sonner";

const Navbar = dynamic(() => import("@/components/Navbar"));
const Footer = dynamic(() => import("@/components/Footer"));
const HeroWrapper = dynamic(() => import("@/components/Hero/HeroWrapper"));
const PopularBooksWrapper = dynamic(
  () => import("@/components/popularBooks/PopularBooksWrapper")
);

export default function HomeContent() {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("/api/books");
        const data = await res.json();
        if (Array.isArray(data.books)) {
          setBooks(data.books);
        } else {
          throw new Error("Invalid data format");
        }
      } catch (err: any) {
        const msg = err?.message || "Failed to load books";
        toast.error(msg);
        setError(msg);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#121222] to-[#181826]!">
      <Navbar />
      <HeroWrapper books={books.slice(-5)} />
      <PopularBooksWrapper books={books} loading={loading} error={error} />
      <Footer />
    </div>
  );
}
