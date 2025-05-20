"use client";

import React from "react";
import { toast } from "sonner";

interface ReturnButtonProps {
  bookId: number;
  onSuccess?: () => void;
}

const ReturnButton = ({ bookId, onSuccess }: ReturnButtonProps) => {
  const handleReturn = async () => {
    try {
      const res = await fetch(`/api/borrow/return/${bookId}`, {
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.error || "Failed to return book.");
        return;
      }

      toast.success("Book returned successfully!");
      onSuccess?.();
    } catch (err) {
      toast.error("Unexpected error. Please try again.");
      console.error("Return error:", err);
    }
  };

  return (
    <button
      onClick={handleReturn}
      className="px-3 py-1 rounded-lg bg-[#2A2A3A] text-gray-400 hover:text-white hover:bg-[#383851] transition"
    >
      Return it
    </button>
  );
};

export default ReturnButton;
