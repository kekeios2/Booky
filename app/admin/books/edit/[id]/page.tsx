"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { LuMoveLeft, LuDroplets } from "react-icons/lu";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";

type Book = {
  id: number;
  title: string;
  author: string;
  category: string;
  rating: number;
  description: string;
  image: string;
  summary: string;
  createdAt: string;
  coverColor: string;
  pdfUrl :string;
};

export default function EditBookPage() {
  const router = useRouter();
  const params = useParams();

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState("");
  const [coverColor, setCoverColor] = useState("#763947");

  useEffect(() => {
    const fetchBook = async () => {
      const bookId = params?.id;
      if (!bookId) return;

      try {
        setLoading(true);
        const response = await fetch(`/api/admin/books/${bookId}`);
        if (!response.ok) throw new Error("Failed to fetch book");
        const data = await response.json();
        setBook(data.book);
        setImage(data.book.image || "");
        setCoverColor(data.book.coverColor || "#763947");
      } catch (error) {
        toast.error("Failed to load book");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [params?.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!book) return;

    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    formData.append("id", book.id.toString());
    formData.set("image", image);
    formData.set("coverColor", coverColor);

    try {
      const response = await fetch("/api/admin/books", {
        method: "PATCH",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update book");
      }

      toast.success("Book updated successfully");
      router.push("/admin/books");
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to update book";
      toast.error(message);
      console.error(error);
    }
  };

  const openEyedropper = async () => {
    if (!("EyeDropper" in window)) {
      toast.error("Eyedropper API not supported in this browser.");
      return;
    }

    try {
      const eyeDropper = new (window as any).EyeDropper();
      const result = await eyeDropper.open();
      setCoverColor(result.sRGBHex);
      toast.success(`Color selected: ${result.sRGBHex}`);
    } catch (err) {
      console.warn("Eyedropper cancelled or failed", err);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading book...</div>;
  if (!book) return <div className="p-8 text-center">Book not found</div>;

  return (
    <div className="p-6 max-w-4xl">
      <Button className="mb-6" asChild>
        <Link href="/admin/books">
          <LuMoveLeft className="mr-2" /> Back to Books
        </Link>
      </Button>

      <h1 className="text-2xl font-bold mb-6">Edit Book</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <input type="hidden" name="id" value={book.id} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              name="title"
              defaultValue={book.title}
              className="w-full border px-4 py-2 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Author</label>
            <input
              type="text"
              name="author"
              defaultValue={book.author}
              className="w-full border px-4 py-2 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <input
              type="text"
              name="category"
              defaultValue={book.category}
              className="w-full border px-4 py-2 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Rating</label>
            <input
              type="number"
              name="rating"
              defaultValue={book.rating}
              className="w-full border px-4 py-2 rounded-md"
              min="0"
              max="5"
              step="0.1"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            name="description"
            defaultValue={book.description}
            className="w-full border px-4 py-2 rounded-md"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Summary</label>
          <textarea
            name="summary"
            defaultValue={book.summary}
            className="w-full border px-4 py-2 rounded-md"
            rows={5}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Book Image</label>
          <input
            type="text"
            name="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full border px-4 py-2 rounded-md"
            placeholder="https://ik.imagekit.io/..."
            required
          />
          {image && (
            <div className="mt-2">
              <Image
                src={image}
                width={100}
                height={200}
                alt="Book Preview"
                className="max-w-xs rounded border"
              />
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Cover Color</label>
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-full border"
              style={{ backgroundColor: coverColor }}
            />
            <span className="text-gray-600">{coverColor}</span>
            <button
              type="button"
              onClick={openEyedropper}
              className="ml-auto text-blue-600 flex items-center gap-1 hover:underline"
            >
              <LuDroplets size={18} />
            </button>
          </div>
          <input type="hidden" name="coverColor" value={coverColor} />
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/books")}
            className="w-[50%]"
          >
            Cancel
          </Button>
          <Button className="w-[50%]" type="submit">
            Update Book
          </Button>
        </div>
      </form>
    </div>
  );
}
