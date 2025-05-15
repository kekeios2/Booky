"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LuMoveLeft, LuDroplets } from "react-icons/lu";

import { Button } from "@/components/ui/button";
import Image from "next/image";

const Page = () => {
  const router = useRouter();
  const [coverColor, setCoverColor] = useState("#763947");
  const [image, setImage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    formData.set("image", image);
    formData.set("coverColor", coverColor);

    try {
      const response = await fetch("/api/admin/books", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add book");
      }

      toast.success("Book added successfully");
      form.reset();
      setCoverColor("#763947");
      setImage("");
      router.push("/admin/books");
    } catch (error: any) {
      toast.error(error.message || "Failed to add book");
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

  return (
    <>
      <Button className="w-fit mb-6" asChild>
        <Link href="/admin/books">
          <LuMoveLeft className="mr-2" />
          Go Back
        </Link>
      </Button>

      <section className="w-full max-w-2xl space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Book Title</label>
            <input
              type="text"
              name="title"
              className="w-full border px-4 py-2 rounded-md"
              placeholder="Book title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Author</label>
            <input
              type="text"
              name="author"
              className="w-full border px-4 py-2 rounded-md"
              placeholder="Author name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Category</label>
            <input
              type="text"
              name="category"
              className="w-full border px-4 py-2 rounded-md"
              placeholder="Category (e.g. History)"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Rating</label>
            <input
              type="number"
              name="rating"
              className="w-full border px-4 py-2 rounded-md"
              placeholder="Rating from 0 to 5"
              min="0"
              max="5"
              step="0.1"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Description</label>
            <input
              type="text"
              name="description"
              className="w-full border px-4 py-2 rounded-md"
              placeholder="Short description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Summary</label>
            <textarea
              name="summary"
              className="w-full border px-4 py-2 rounded-md"
              placeholder="Full summary of the book"
              rows={4}
              required
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Book PDF URL
            </label>
            <input
              type="url"
              name="pdfUrl"
              className="w-full border px-4 py-2 rounded-md"
              placeholder="https://..."
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Book Image URL
            </label>
            <input
              type="url"
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

          {/* ✅ Cover Color */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Cover Color
            </label>
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
                Pick
              </button>
            </div>
            <input type="hidden" name="coverColor" value={coverColor} />
          </div>

          <Button type="submit" className="w-full">
            Add Book
          </Button>
        </form>
      </section>
    </>
  );
};

export default Page;
