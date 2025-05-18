"use client";

import Image from "next/image";
import { toast } from "sonner";
import BookCover from "@/components/BookCover";
import { CiStar } from "react-icons/ci";

interface HeroBookCardProps {
  book: any;
  isMobile: boolean;
  index: number;
}

const HeroBookCard = ({ book, isMobile, index }: HeroBookCardProps) => {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-6 md:gap-8 lg:gap-16 w-full max-w-screen-xl mt-10">
      {/* Book Cover with reflection */}
      <div className="w-full lg:w-2/5 relative h-64 md:h-80 lg:h-96 flex justify-center lg:justify-start mt-6 lg:mt-0">
        {/* Main Book Cover */}
        <BookCover
          coverImage={book.image}
          coverColor={book.coverColor}
          variant={isMobile ? "regular" : "wide"}
          className="relative z-10"
          priority
          
        />
        <BookCover
          coverImage={book.image}
          coverColor={book.coverColor}
          variant={isMobile ? "regular" : "wide"}
          className="absolute left-[100px] rotate-[9.62deg] blur-[6px] opacity-60 "
          priority
        />
      </div>

      {/* Book Info */}
      <div className="w-full lg:w-3/5 space-y-4 text-center lg:text-left">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
          {book.title}
        </h1>

        <div className="flex ">
          <div className="flex text-primary ">
            <p className="text-gray-300 italic text-sm md:text-base mr-1.5">
              By
            </p>
            {book.author}
          </div>
          <div className="flex text-primary mx-6">
            <p className="text-gray-300 italic text-sm md:text-base mr-1.5">
              Category
            </p>
            {book.category}
          </div>
          <div className="flex items-center ">
            {[...Array(5)].map((_, i) => (
              <CiStar
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(book.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-400"
                }`}
              />
            ))}
            <span className=" text-primary">{book.rating}</span>
            <span className="">/5</span>
          </div>
        </div>

        {/* Book Description */}
        <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto lg:mx-0 min-h-[4.5rem]">
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
          className="flex w-fit mx-auto lg:mx-0 btn-primary text-black py-2 px-6 rounded-[5px] font-bold text-base tracking-wide transition-all duration-300 shadow-lg mt-4"
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
            src="/images/Blacklogo.svg"
            alt="logo"
            width={20}
            height={20}
            className="mr-2 "
          />
          Borrow The Book
        </button>
      </div>
    </div>
  );
};

export default HeroBookCard;
