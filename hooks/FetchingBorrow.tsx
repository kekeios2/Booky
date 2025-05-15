import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Book } from "@/types/types";

const useFetchBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/user-borrowed-books")
      .then(async (res) => {
        const data = await res.json();
        console.log(data); // طباعة البيانات للتحقق منها
        if (!res.ok || !Array.isArray(data.books)) {
          throw new Error("Invalid data format received.");
        }

        // إضافة تحقق من أن pdfUrl موجود أو تعيين قيمة افتراضية
        const updatedBooks = data.books.map((book: { pdfUrl: any; }) => ({
          ...book,
          pdfUrl: book.pdfUrl || '',  // تعيين قيمة فارغة أو قيمة افتراضية إذا كان pdfUrl مفقودًا
        }));

        setBooks(updatedBooks);
      })
      .catch((err) => {
        const msg = err.message || "Something went wrong";
        setError(msg);
        toast.error(`⚠️ ${msg}`);
      })
      .finally(() => setLoading(false));
  }, []);

  return { books, loading, error };
};

export default useFetchBooks;
