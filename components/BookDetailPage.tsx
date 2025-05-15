"use client";

import { useEffect, useState, Suspense } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { CiStar } from "react-icons/ci";
import { toast } from "sonner";
import dynamic from "next/dynamic";
import BookDetailsSkeleton from "./BookDetailsSkeleton";
import Link from "next/link";

const Navbar = dynamic(() => import("@/components/Navbar"));
const BookCover = dynamic(() => import("@/components/BookCover"), {
  ssr: false,
  loading: () => <div className="w-64 h-96 bg-gray-700 rounded" />,
});
const Footer = dynamic(() => import("@/components/Footer"));

type Book = {
  id: number;
  title: string;
  author: string;
  category: string;
  rating: number;
  description: string;
  summary: string;
  image: string;
  coverColor: string;
};

const BookDetailPage = () => {
  const params = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [recommendedBooks, setRecommendedBooks] = useState<Book[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    const fetchBook = async () => {
      const bookId = params?.id;
      if (!bookId) return;

      try {
        const response = await fetch(`/api/books/${bookId}`);
        const data = await response.json();
        if (response.ok) setBook(data.book);
        else throw new Error(data?.error || "Book not found");
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(message);
        toast.error("Failed to load book");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [params?.id]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      const bookId = params?.id;
      if (!bookId) return;

      try {
        const res = await fetch(`/api/recommendion?id=${bookId}`);
        const data = await res.json();
        if (res.ok) setRecommendedBooks(data.recommendations);
        else throw new Error(data?.error || "Book not found");
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(message);
        toast.error("Failed to load book");
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [params?.id]);

  if (loading) return <BookDetailsSkeleton />;

  if (!book) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0F0F1C] to-[#181826] text-white flex items-center justify-center">
        <p>Book not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F0F1C] to-[#181826] text-white">
      <Navbar />
      <div className="container mx-auto px-6 py-8 max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center gap-6 md:gap-8 lg:gap-16 w-full max-w-screen-xl mt-10">
          {/* Book Cover with reflection */}
          <div className="w-full lg:w-2/5 relative h-64 md:h-80 lg:h-96 flex justify-center lg:justify-start mt-6 lg:mt-0">
            {/* Main Book Cover */}
            <BookCover
              coverImage={book.image}
              coverColor={book.coverColor}
              variant={isMobile ? "regular" : "wide"}
              className="relative z-10"
            />
            <BookCover
              coverImage={book.image}
              coverColor={book.coverColor}
              variant={isMobile ? "regular" : "wide"}
              className="absolute left-[100px] rotate-[9.62deg] blur-[6px] opacity-60 "
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
              className="flex w-fit mx-auto lg:mx-0 btn-primary text-black py-2 px-6 rounded-[5px] font-bold text-base tracking-wide transition-all duration-300 shadow-lg mt-4 cursor-pointer"
              onClick={async (e) => {
                e.preventDefault();
                try {
                  const res = await fetch("/api/borrow", {
                    method: "POST",
                    body: JSON.stringify({ bookId: book.id }),
                    headers: { "Content-Type": "application/json" },
                  });
                  const data = await res.json();
                  res.ok
                    ? toast.success(data.message)
                    : toast.error(data.error);
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
      </div>

      <section className="px-6 py-12 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-[#D6E0FF]">
          More similar books
        </h2>

        {recommendedBooks.length === 0 ? (
          <p className="text-gray-400">No recommendations found.</p>
        ) : (
          <div className="flex overflow-x-auto space-x-6 scrollbar-hide">
            {recommendedBooks.slice(0, 10).map((rec) => (
              <Link href={`/books/${rec.id}`} key={rec.id} passHref>
                <div className="flex-shrink-0 w-full  flex flex-col items-center cursor-pointer">
                  <div className="relative rounded-lg overflow-hidden">
                    <BookCover
                      coverColor={rec.coverColor}
                      coverImage={rec.image}
                      variant="medium"
                      className="relative z-10"
                    />
                  </div>
                  <div className="w-full mt-2 text-center">
                    <h3 className="text-white font-medium text-sm truncate">
                      {rec.title}
                    </h3>
                    <p className="text-gray-400 text-xs mt-1 italic">
                      {rec.author}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default BookDetailPage;
