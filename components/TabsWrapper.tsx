"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const BorrowedBooks = dynamic(
  () => import("@/components/BorrowBooks/BorrowedBooks")
);
const SavedBooks = dynamic(() => import("@/components/BorrowBooks/SavedBooks"));

export default function TabsWrapper() {
  const [activeTab, setActiveTab] = useState("borrowed");

  return (
    <div>
      <div className="flex items-center space-x-10 mb-6">
        <button
          onClick={() => setActiveTab("borrowed")}
          className={`text-lg pb-1 border-b-2 font-bold transition-all ${
            activeTab === "borrowed"
              ? "text-[#5468FF] border-[#5468FF]"
              : "text-gray-500 border-transparent"
          }`}
        >
          Borrowed Books
        </button>
        <button
          onClick={() => setActiveTab("saved")}
          className={`text-lg pb-1 border-b-2 font-bold transition-all ${
            activeTab === "saved"
              ? "text-[#5468FF] border-[#5468FF]"
              : "text-gray-500 border-transparent"
          }`}
        >
          Saved Books
        </button>
      </div>

      {activeTab === "borrowed" && <BorrowedBooks />}
      {activeTab === "saved" && <SavedBooks />}
    </div>
  );
}
