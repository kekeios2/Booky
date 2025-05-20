// components/book/BookRecommendations.tsx
import BookCover from "@/components/BookCover";
import Link from "next/link";
import { Book } from "@/types/types";

export default function BookRecommendations({ books }: { books: Book[] }) {
  return (
    <>
      <h2 className="text-3xl font-bold mb-6 text-[#D6E0FF]">
        More similar books
      </h2>

      {books.length === 0 ? (
        <p className="text-gray-400">No recommendations found.</p>
      ) : (
        <div className="flex overflow-x-auto space-x-6 scrollbar-hide">
          {books.slice(0, 10).map((book) => (
            <Link key={book.id} href={`/books/${book.id}`} passHref>
              <div className="flex-shrink-0 w-full flex flex-col items-center cursor-pointer">
                <div className="relative rounded-lg overflow-hidden">
                  <BookCover
                    coverColor={book.coverColor}
                    coverImage={book.image}
                    variant="medium"
                    className="relative z-10"
                  />
                </div>
                <div className="w-full mt-2 text-center">
                  <h3 className="text-white font-medium text-sm truncate">
                    {book.title}
                  </h3>
                  <p className="text-gray-400 text-xs mt-1 italic">
                    {book.author}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
