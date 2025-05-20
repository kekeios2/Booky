"use client";
import { useEffect, useState } from "react";

export function useSavedStatus(bookId: number) {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const checkSaved = async () => {
      try {
        const res = await fetch(`/api/saved-books?bookId=${bookId}`);
        const data = await res.json();
        setIsSaved(data.saved);
      } catch {
        setIsSaved(false);
      }
    };

    if (bookId) checkSaved();
  }, [bookId]);

  return [isSaved, setIsSaved] as const;
}
