"use client";
import { useCallback } from "react";
import { toast } from "sonner";

export function useUnsaveBook() {
  const unsave = useCallback(async (bookId: number, onSuccess?: () => void) => {
    try {
      const res = await fetch("/api/saved-books", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Book removed from saved list.");
        onSuccess?.();
      } else {
        toast.error(data.error || "Failed to remove book.");
      }
    } catch {
      toast.error("Something went wrong.");
    }
  }, []);

  return { unsave };
}
