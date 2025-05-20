import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Book } from "@/types/types";

const useFetchBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      try {
        const res = await fetch("/api/user-borrowed-books");
        const data = await res.json();

        if (!res.ok || !Array.isArray(data.books)) {
          throw new Error("Invalid data format received.");
        }

        // Ensure each book has a valid pdfUrl
        const normalizedBooks = data.books.map((book: Book) => ({
          ...book,
          pdfUrl: book.pdfUrl || "", // fallback for missing pdf
        }));

        setBooks(normalizedBooks);
      } catch (err: any) {
        const msg = err?.message || "Something went wrong";
        setError(msg);
        toast.error(`⚠️ ${msg}`);
      } finally {
        setLoading(false);
      }
    };

    fetchBorrowedBooks();
  }, []);

  return { books, loading, error };
};

export default useFetchBooks;
