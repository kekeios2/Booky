"use client";
import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { toast } from "react-hot-toast";
import { LuTrash2 ,LuUserPen  } from "react-icons/lu";

import Link from "next/link";
import dynamic from "next/dynamic";

const BookCover = dynamic(() => import("@/components/BookCover"));

type Book = {
  id: number;
  title: string;
  author: string;
  category: string;
  rating: number;
  description: string;
  image: string;
  summary: string;
  coverColor: string;
  createdAt: Date | string;
  pdfUrl: string;
};

export function BookTable() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/admin/books");
        if (!response.ok) throw new Error("Failed to fetch books");
        const data = await response.json();
        setBooks(data.books);
      } catch (err: any) {
        setError(err.message || "Error fetching books");
        toast.error("Failed to load books");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this book?")) return;

    try {
      const response = await fetch(`/api/admin/books?id=${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete book");
      setBooks((prev) => prev.filter((book) => book.id !== id));
      toast.success("Book deleted successfully");
    } catch (err) {
      toast.error("Failed to delete book");
      console.error("Error:", err);
    }
  };

  const formatDate = (date: Date | string) => {
    try {
      const dateObj = typeof date === "string" ? new Date(date) : date;
      return formatDistanceToNow(dateObj, { addSuffix: true });
    } catch (err) {
      return "Invalid date";
    }
  };

  if (loading)
    return <div className="flex justify-center p-8">Loading books...</div>;
  if (error)
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl">
        {error}
      </div>
    );
  if (books.length === 0)
    return (
      <div className="bg-gray-50 border border-gray-200 text-gray-700 p-8 rounded-xl text-center">
        No books found
      </div>
    );

  return (
    <div className="bg-white rounded-xl shadow p-4 overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-gray-500 uppercase border-b">
          <tr>
            <th className="p-2">ID</th>
            <th className="p-2">Image</th>
            <th className="p-2">Title</th>
            <th className="p-2">Author</th>
            <th className="p-2">Category</th>
            <th className="p-2">Rating</th>
            <th className="p-2">Summary</th>
            <th className="p-2">Description</th>
            <th className="p-2">Created</th>
            <th className="p-2">Color</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id} className="border-b hover:bg-gray-50">
              <td className="p-2">{book.id}</td>

              <td className="p-2">
                {book.image ? (
                  <BookCover
                  coverColor={book.coverColor}
                  coverImage={book.image}
                  className="w-10! h-14!"
                />
                
                ) : (
                  <span className="text-gray-400 italic">No image</span>
                )}
              </td>

              <td className="p-2 font-medium">{book.title}</td>
              <td className="p-2">{book.author}</td>
              <td className="p-2">{book.category}</td>
              <td className="p-2">{book.rating.toFixed(1)}</td>
              <td className="p-2 max-w-xs">
                <div className="line-clamp-2 break-words">{book.summary}</div>
              </td>
              <td className="p-2 max-w-xs">
                <div className="line-clamp-2 break-words">
                  {book.description}
                </div>
              </td>
              <td className="p-2">{formatDate(book.createdAt)}</td>
              <td className="p-2">
                <div
                  className="w-6 h-6 rounded-full border"
                  style={{ backgroundColor: book.coverColor }}
                  title={book.coverColor}
                ></div>
              </td>

              <td className="p-2 flex gap-1">
                <button
                  onClick={() => handleDelete(book.id)}
                  className="text-gray-500 hover:text-red-700 p-1 rounded hover:bg-gray-100"
                  title="Delete book"
                >
                  <LuTrash2 size={18} />
                </button>
                <Link
                  href={`/admin/books/edit/${book.id}`}
                  className="text-gray-500 hover:text-blue-600 p-1 rounded hover:bg-gray-100"
                  title="Edit book"
                >
                  <LuUserPen size={18} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
