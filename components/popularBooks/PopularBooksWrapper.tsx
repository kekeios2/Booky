"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import PopularBooksCarousel from "./PopularBooksCarousel";

interface PopularBooksWrapperProps {
  books: any[];
  loading: boolean;
  error: string;
}

const PopularBooksWrapper = ({ books, loading, error }: PopularBooksWrapperProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) {
      console.log("PopularBooks in view → loading triggered");
    }
  }, [inView]);

  return (
    <section ref={ref} className="px-4 py-12 relative group min-h-[300px]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-[#d6e0ffa1] ml-10">Popular Books</h2>

        {!inView ? (
          <div className="text-gray-400 text-sm text-center py-8">Preparing recommendations...</div>
        ) : loading ? (
          <div className="flex gap-4 overflow-x-auto animate-pulse px-4">
            {[...Array(6)].map((_, idx) => (
              <div key={idx} className="flex flex-col items-center w-[16.66%] px-2">
                <div className="w-full h-52 bg-gray-700 rounded-lg mb-2" />
                <div className="h-4 w-4/5 bg-gray-600 rounded mb-1" />
                <div className="h-3 w-3/5 bg-gray-600 rounded" />
              </div>
            ))}
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
