import Link from "next/link";
import BookCover from "@/components/BookCover";
import { Book } from "@/types/types";

interface PopularBookCardProps {
  book: Book;
}

const PopularBookCard = ({ book }: PopularBookCardProps) => {
  const firstName = book.author?.split(" ")?.[0] || "Unknown";

  return (
    <Link href={`/books/${book.id}`} passHref>
      <div className="flex flex-col items-center cursor-pointer">
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
            {book.title} - By {firstName}
          </h3>
          <p className="text-gray-400 text-xs mt-1 italic">{book.category}</p>
        </div>
      </div>
    </Link>
  );
};

export default PopularBookCard;
