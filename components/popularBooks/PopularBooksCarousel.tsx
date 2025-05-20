"use client";

import { useState } from "react";
import PopularBookCard from "./PopularBookCard";
import { Book } from "@/types/types";

interface PopularBooksCarouselProps {
  books: Book[];
}

const PopularBooksCarousel = ({ books }: PopularBooksCarouselProps) => {
  const itemsPerPage = 12;
  const totalPages = Math.ceil(books.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleBooks = books.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 px-4">
        {visibleBooks.map((book) => (
          <div key={book.id}>
            <PopularBookCard book={book} />
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-end gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded border text-sm font-bold ${
                currentPage === i + 1
                  ? "bg-[#c9af90] text-black"
                  : "bg-gray-800 text-white hover:bg-gray-700"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PopularBooksCarousel;
