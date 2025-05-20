// components/SaveButton.tsx
"use client";

import { toast } from "sonner";
import { useSavedStatus } from "@/hooks/useSavedStatus";

interface SaveButtonProps {
  bookId: number;
  initialSaved?: boolean;
}

export default function SaveButton({ bookId, initialSaved = false }: SaveButtonProps) {
    const [isSaved, setIsSaved] = useSavedStatus(bookId);

  const handleToggleSave = async () => {
    try {
      const res = await fetch("/api/saved-books", {
        
        method: isSaved ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId }),
      });
      console.log(res)

      if (res.status === 401) {
        toast.error("You must be logged in to modify saved books.");
        return;
      }

      const data = await res.json();

      if (res.ok) {
        setIsSaved(!isSaved);
        toast.success(data.message || (isSaved ? "Book removed." : "Book saved."));
      } else {
        toast.error(data.error || "Failed to update.");
      }
    } catch {
      toast.error("Something went wrong.");
    }
  };

  return (
    <button
      onClick={handleToggleSave}
      className="flex items-center justify-center bg-transparent border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-medium py-2 px-6 rounded-lg transition"
    >
      <svg
        className="w-5 h-5 mr-2"
        fill={isSaved ? "white" : "none"}
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
        />
      </svg>
      <span>{isSaved ? "Saved" : "Save for Later"}</span>
    </button>
  );
}
