"use client";

import { useEffect, useState } from "react";
import HeroBookCard from "@/components/Hero/HeroBookCard";
import { Book } from "@/types/types";

interface HeroCarouselProps {
  books: Book[];
  isMobile: boolean;
}

const HeroCarousel = ({ books, isMobile }: HeroCarouselProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % books.length);
    }, 17000);
    return () => clearInterval(interval);
  }, [books.length]);

  return (
    <div className="relative">
      <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide">
        {books.map((book, index) => (
          <div
            key={book.id}
            className="snap-start shrink-0 w-full px-4 sm:px-8 lg:px-12"
          >
            <HeroBookCard book={book} isMobile={isMobile} index={index} />
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4 gap-2">
        {books.map((_, index) => (
          <button
            key={index}
            onClick={() =>
              document
                .querySelectorAll(".snap-start")
                [index]?.scrollIntoView({
                  behavior: "smooth",
                  inline: "center",
                })
            }
            className={`w-3 h-3 rounded-full ${
              selectedIndex === index ? "bg-[#c9af90]" : "bg-white/30"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
