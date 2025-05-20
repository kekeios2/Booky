// components/book/BookDetailBody.tsx
"use client";

import { useState } from "react";
import { CiStar } from "react-icons/ci";
import BorrowButton from "@/components/borrowBtn";

export default function BookDetailBody({ book }: { book: any }) {
  const [isBorrowed, setIsBorrowed] = useState(false);

  return (
    <div className="w-full lg:w-3/5 space-y-5 text-center lg:text-left">
      {/* Book Info */}
      <div className="flex flex-wrap justify-center lg:justify-start items-center gap-3 text-sm m-0">
      <span className="bg-amber-300/30 text-[#c9af90] px-2 py-0.5 rounded-full text-xs font-semibold tracking-wide">
          Featured
        </span>
        <div className="flex items-center gap-1 text-yellow-400 text-sm">
          {[...Array(5)].map((_, i) => (
            <CiStar
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(book.rating)
                  ? "text-yellow-400"
                  : "text-gray-500"
              }`}
            />
          ))}
          <span className="text-gray-300 ml-1">{book.rating}/5</span>
        </div>
      </div>

      <h1 className="text-white text-4xl md:text-5xl font-bold tracking-tight leading-snug">
        {book.title}
      </h1>

      <p className="text-gray-400 text-sm">
        By
        <span className="text-[#c9af90] font-medium hover:underline mx-1.5">
          {book.author}
        </span>
        |
        <span className="ml-2 bg-blue-600/20 text-blue-400 px-2 py-0.5 rounded-full text-xs">
          {book.category}
        </span>
      </p>

      <p className="text-gray-300 text-base max-w-2xl mx-auto lg:mx-0 ">
        {book.description}
      </p>

      <div className="bg-[#1c2540]/60 border border-gray-700/30 rounded-lg p-6">
        <h3 className="text-white text-lg font-medium mb-3">Summary:</h3>
        <p className="text-gray-300 leading-relaxed text-sm md:text-base">
          {book.summary}
        </p>
      </div>

      <div className="flex justify-center lg:justify-start gap-4 pt-2">
        <BorrowButton bookId={book.id} isBorrowed={isBorrowed} />
      </div>
    </div>
  );
}
