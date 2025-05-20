"use client";

import { useInView } from "react-intersection-observer";
import PopularBooksCarousel from "./PopularBooksCarousel";
import { Book } from "@/types/types";

interface PopularBooksWrapperProps {
  books: Book[];
  error: string;
}

const PopularBooksWrapper = ({ books, error }: PopularBooksWrapperProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section ref={ref} className="px-4 py-12 relative group min-h-[300px]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-[#d6e0ffa1] ml-10">
          Popular Books
        </h2>

        {!inView ? (
          <div className="text-gray-400 text-sm text-center py-8">
            Preparing recommendations...
          </div>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <PopularBooksCarousel books={books} />
        )}
      </div>
    </section>
  );
};

export default PopularBooksWrapper;
