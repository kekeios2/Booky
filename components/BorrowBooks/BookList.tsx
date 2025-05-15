import { Book } from "@/types/types";
import BookCover from "../BookCover";
import { useState } from "react";
import ReturnButton from "../ReturnButton";

interface BookListProps {
  books: Book[];
  openModal: (book: Book) => void;
}

const BookList = ({ books, openModal }: BookListProps) => {
  const [book, setBooks] = useState<Book[]>([]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 w-full">
      {books.map((book) => (
        <div
          key={book.id}
          className="bg-[#1E1E2D] rounded-2xl p-6 relative w-full hover:scale-[1.01] transition-transform"
        >
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

          <div className="pt-3">
            <h3 className="text-white font-medium text-lg line-clamp-2">
              {book.title} - By {book.author}
            </h3>
            <p className="text-gray-400 text-sm mt-1 line-clamp-1 mb-6 italic">
              {book.category}
            </p>
            <div className="flex justify-evenly mt-3">
              <button
                onClick={() => openModal(book)} // open modal on click
                className="px-3 py-1 rounded-lg btn-primary text-gray-900 font-medium hover:text-white hover:bg-[#383851] transition"
              >
                Take a Look
              </button>
              <ReturnButton
                bookId={book.id}
                onSuccess={() =>
                  setBooks((prev) => prev.filter((b) => b.id !== book.id))
                }
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookList;
