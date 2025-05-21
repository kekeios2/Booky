"use client";
import BookCover from "@/components/BookCover";
import { CiStar } from "react-icons/ci";
import { Book } from "@/types/types";
import { useEffect, useState } from "react";
import SaveButton from "../BookDetail/saveBtn";
import BorrowButton from "@/components/borrowBtn";
import { useSession } from "next-auth/react";

interface HeroBookCardProps {
  book: Book;
  isMobile: boolean;
  index: number;
}

const HeroBookCard = ({ book, isMobile }: HeroBookCardProps) => {
  const [isBorrowed, setIsBorrowed] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) return; // ⛔ Not signed in → skip fetch

    const checkIfBorrowed = async () => {
      try {
        const res = await fetch(`/api/borrow/check?bookId=${book.id}`, {
          credentials: "include",
        });

        if (!res.ok) {
          console.error("Failed to check borrow status:", res.status);
          return;
        }

        const data = await res.json();
        if (data?.borrowed) {
          setIsBorrowed(true);
        }
      } catch (error) {
        console.error("Error checking borrow status:", error);
      }
    };

    checkIfBorrowed();
  }, [book.id, session]);

  return (
    <div className="flex flex-col lg:flex-row items-center gap-6 md:gap-8 lg:gap-16 w-full max-w-screen-xl mt-10">
      {/* Book Cover with reflection */}
      <div className="w-full lg:w-2/5 relative  md:h-96 lg:h-[28rem] flex justify-center lg:justify-start">
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
      <div className="w-full lg:w-3/5 space-y-5 text-center lg:text-left">
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
        <p className="text-gray-300 text-base max-w-2xl mx-auto lg:mx-0 line-clamp-3 sm:line-clamp-3 md:line-clamp-3">
          {book.description}
        </p>

        <div className="bg-[#1c2540]/60 border border-gray-700/30 rounded-lg p-6">
          <h3 className="text-white text-lg font-medium mb-3">Summary:</h3>
          <p className="text-gray-300 text-base max-w-2xl mx-auto lg:mx-0 line-clamp-3 sm:line-clamp-3 md:line-clamp-3">
          {book.summary}
          </p>
        </div>
        <div className="flex justify-center lg:justify-start gap-4 pt-2">
          <BorrowButton bookId={book.id} isBorrowed={isBorrowed} />
          <SaveButton bookId={book.id} />
        </div>
      </div>
    </div>
  );
};

export default HeroBookCard;
