"use client";

import dynamic from "next/dynamic";
import { MdMenuBook } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import ReturnButton from "@/components/ReturnButton";

// تحميل مكون BookCover ديناميكياً
const BookCover = dynamic(() => import("@/components/BookCover"));

type Book = {
  id: string;
  title: string;
  author: string;
  category: string;
  rating: number;
  description: string;
  summary: string;
  image: string;
  coverColor?: string;
  borrowedAt?: string;
  pdfUrl?: string; // رابط PDF الكتاب
};

export const BookCard = ({
  book,
  openModal,
}: {
  book: Book;
  openModal: (book: Book) => void;
}) => {
  return (
    <div
      key={book.id}
      className="bg-[#1E1E2D] rounded-2xl p-6 relative w-full hover:scale-[1.01] transition-transform"
    >
      <div className="relative flex justify-center p-5 rounded-[20px] overflow-hidden">
        <div
          className="absolute inset-0 opacity-50"
          style={{ backgroundColor: book.coverColor }}
        />
        <BookCover
          coverColor={book.coverColor}
          coverImage={book.image}
          variant="medium"
          className="relative z-10 shadow-xl/60"
        />
      </div>

      <div className="pt-3">
        <h3 className="text-white font-medium text-lg line-clamp-2">
          {book.title} - By {book.author}
        </h3>
        <p className="text-gray-400 text-sm mt-1 line-clamp-1 mb-6 italic">
          {book.category}
        </p>

        {book.borrowedAt &&
          (() => {
            const borrowedDate = new Date(book.borrowedAt);
            const today = new Date();
            const daysAgo = Math.floor(
              (today.getTime() - borrowedDate.getTime()) / (1000 * 60 * 60 * 24)
            );
            const daysLeft = Math.max(0, 14 - daysAgo); // Borrow period: 14 days

            return (
              <div className="mt-2 space-y-1 text-sm">
                <div className="flex items-center gap-2 text-blue-200">
                  <MdMenuBook size={18} className="text-[#85817cb9]" />
                  Borrowed on
                  {borrowedDate.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </div>

                <div className="flex items-center gap-2 text-blue-200">
                  <SlCalender size={15} className="text-[#85817cb9]" />
                  {daysLeft.toString().padStart(2, "0")} days left to due
                </div>
              </div>
            );
          })()}

        <div className="flex justify-evenly mt-3">
          <button
            onClick={() => openModal(book)}
            className="px-3 py-1 rounded-lg btn-primary text-gray-900 font-medium hover:text-white hover:bg-[#383851] transition"
          >
            Take a Look
          </button>
          <ReturnButton bookId={book.id} onSuccess={() => {}} />
        </div>
      </div>
    </div>
  );
};
