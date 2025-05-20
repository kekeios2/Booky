// components/BorrowBooks/SavedBooks.tsx
"use client";

import { useEffect, useState } from "react";
import { Book } from "@/types/types";
import BookCover from "@/components/BookCover";
import { toast } from "sonner";
import SaveButton from "@/components/BookDetail/saveBtn";
import Link from "next/link";

const SavedBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const res = await fetch("/api/saved-books");
        const data = await res.json();
        if (res.ok) {
          setBooks(data.savedBooks.map((entry: any) => entry.book));
        } else {
          toast.error(data.error || "Failed to fetch saved books");
        }
      } catch {
        toast.error("Error fetching saved books.");
      } finally {
        setLoading(false);
      }
    };
    fetchSaved();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading borrowed books...</p>
        </div>
      </div>
    );
  }
  if (books.length === 0) {
    return (
      <div className="mt-8 border-2 border-dashed border-[#5468FF] rounded-xl p-8 text-center">
        <h3 className="text-lg font-semibold text-[#8A94A6] mb-2">
          Browse Books to Save
        </h3>
        <p className="text-sm text-[#8A94A6] mb-4">
          Books you save will appear here for easy access
        </p>
        <button className="bg-[#5468FF] text-white px-6 py-2 rounded-full text-sm font-bold">
          Browse Now
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 w-full">
      {books.map((book) => (
        <Link href={`/books/${book.id}`} key={book.id}>
          <div
            className="bg-[#1E1E2D] rounded-2xl p-6 relative w-[280px] hover:scale-[1.01] transition-transform"
          >
            {/* Cover */}
            <div className="relative flex justify-center p-5 rounded-[20px] overflow-hidden">
              <div
                className="absolute inset-0 opacity-50"
                style={{ backgroundColor: book.coverColor }}
              />
              <BookCover
                coverColor={book.coverColor}
                coverImage={book.image}
                variant="medium"
                className="relative z-10 shadow-xl/60"
              />
            </div>

            {/* Info */}
            <h3 className="text-white font-bold text-md truncate mt-2">
              {book.title}
            </h3>
            <p className="text-gray-400 text-sm truncate">{book.author}</p>
            <div className="mt-4">
              {/* Buttons */}
              <div className="flex justify-evenly mt-4">
                <SaveButton bookId={book.id} />
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SavedBooks;
