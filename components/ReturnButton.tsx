"use client";

import { toast } from "sonner";
import React from "react";

interface ReturnButtonProps {
  bookId: string;
  onSuccess?: () => void;
}

const ReturnButton: React.FC<ReturnButtonProps> = ({ bookId, onSuccess }) => {
  const handleReturn = async () => {
    try {
      const res = await fetch(`/api/borrow/return/${bookId}`, {
        method: "POST",
      });
      const data = await res.json();

      if (res.ok) {
        toast.success("Book returned successfully!");
        onSuccess?.();
      } else {
        toast.error(`${data.error}`);
      }
    } catch {
      toast.error("Failed to return the book. Try again.");
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
