"use client";

import Image from "next/image";
import { CiStar } from "react-icons/ci";
import { toast } from "sonner";

interface HeroBookDetailsProps {
  book: any;
}

const HeroBookDetails = ({ book }: HeroBookDetailsProps) => {
  return (
    <div className="w-full lg:w-3/5 space-y-3 md:space-y-4 text-center lg:text-left">
      <span className="inline-block text-xs md:text-sm font-medium text-blue-400 tracking-widest">
        Category : {book.category}
      </span>

      <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight">
        {book.title}
      </h1>

      <p className="text-gray-300 italic text-sm md:text-base">
        by : {book.author}
      </p>

      <div className="flex items-center justify-center lg:justify-start gap-1">
        {[...Array(5)].map((_, i) => (
          <CiStar
            key={i}
            className={`w-4 h-4 md:w-5 md:h-5 ${
              i < Math.floor(book.rating)
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-400"
            }`}
          />
        ))}
        <span className="ml-2 text-gray-300 text-sm md:text-base">
          {book.rating}/5
        </span>
      </div>

      <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto lg:mx-0 line-clamp-3 md:line-clamp-none min-h-[4.5rem]">
        {book.description}
      </p>

      <div className="bg-gray-800/50 p-3 md:p-4 rounded-lg">
        <h3 className="text-white font-medium text-sm md:text-base mb-1 md:mb-2">
          Summary:
        </h3>
        <p className="text-gray-300 text-xs md:text-sm line-clamp-4 md:line-clamp-none">
          {book.summary}
        </p>
      </div>

      <button
        className="flex w-fit mx-auto lg:mx-0 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300 text-white py-2 md:py-3 px-4 md:px-6 rounded-lg font-bold text-base md:text-lg tracking-wide transition-all duration-300 shadow-lg mt-4 md:mt-6 lg:mt-8"
        onClick={async (e) => {
          e.preventDefault();
          try {
            const res = await fetch("/api/borrow", {
              method: "POST",
              body: JSON.stringify({ bookId: book.id }),
              headers: { "Content-Type": "application/json" },
            });
            const data = await res.json();
            res.ok ? toast.success(data.message) : toast.error(data.error);
          } catch {
            toast.error("Something went wrong. Try again.");
          }
        }}
      >
        <Image
          src="/images/logo.svg"
          alt="logo"
          width={20}
          height={20}
          className="mr-2 md:mx-4"
        />
        Borrow The Book
      </button>
    </div>
  );
};

export default HeroBookDetails;
