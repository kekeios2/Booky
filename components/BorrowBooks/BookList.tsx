"use client";

import { Book } from "@/types/types";
import BookCover from "../BookCover";
import ReturnButton from "../ReturnButton";
import { MdMenuBook } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { useState } from "react";

interface BookListProps {
  books: Book[];
  openModal: (book: Book) => void;
}

const BookList = ({ books, openModal }: BookListProps) => {
  const [bookList, setBookList] = useState<Book[]>(books);

  const handleReturnSuccess = (bookId: number) => {
    setBookList((prev) => prev.filter((b) => b.id !== bookId));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 w-full">
      {bookList.map((book) => (
        <div
          key={book.id}
          className="bg-[#1E1E2D] rounded-2xl p-6 relative w-[280px] hover:scale-[1.01] transition-transform"
        >
          {/* Cover */}
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

          {/* Info */}
          <div className="pt-3">
            <h3 className="text-white font-medium text-lg line-clamp-2">
              {book.title} - By {book.author}
            </h3>
            <p className="text-gray-400 text-sm mt-1 line-clamp-1 mb-4 italic">
              {book.category}
            </p>

            {/* Borrowed Date */}
            {book.borrowedAt && renderBorrowInfo(book.borrowedAt)}

            {/* Buttons */}
            <div className="flex justify-evenly mt-4">
              <button
                onClick={() => openModal(book)}
                className="px-3 py-1 rounded-lg btn-primary text-gray-900 font-medium hover:text-white hover:bg-[#383851] transition"
              >
                Take a Look
              </button>
              <ReturnButton
                bookId={book.id}
                onSuccess={() => handleReturnSuccess(book.id)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

function renderBorrowInfo(dateString: string) {
  const borrowedDate = new Date(dateString);
  const today = new Date();
  const daysAgo = Math.floor(
    (today.getTime() - borrowedDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  const daysLeft = Math.max(0, 14 - daysAgo); // Borrow period: 14 days

  return (
    <div className="mt-2 space-y-1 text-sm">
      <div className="flex items-center gap-2 text-blue-200">
        <MdMenuBook size={18} className="text-[#85817cb9]" />
        Borrowed on{" "}
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
}

export default BookList;
