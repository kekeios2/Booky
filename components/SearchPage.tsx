"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/components/Navbar"));
const BookCover = dynamic(() => import("@/components/BookCover"));
const NoBookFound = dynamic(() => import("@/components/noBookFound"));

type Book = {
  coverColor?: string;
  id: string;
  title: string;
  author: string;
  category: string;
  rating: number;
  description: string;
  summary: string;
  image: string;
};

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");
  const [hasSearched, setHasSearched] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/books");
        if (!response.ok) throw new Error("Failed to fetch books");

        const data = await response.json();
        if (data && Array.isArray(data.books)) {
          setBooks(data.books);
          setCategories([
            "All",
            ...new Set(data.books.map((b: Book) => b.category)),
          ] as string[]);
        } else {
          throw new Error("Invalid book data received");
        }
      } catch (err: any) {
        setError(err.message || "An error occurred");
        toast.error("Failed to load books");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const filteredBooks = useMemo(() => {
    let result = books.filter(
      (book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (selectedCategory !== "All") {
      result = result.filter((book) => book.category === selectedCategory);
    }

    if (sortOrder === "highest") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortOrder === "lowest") {
      result.sort((a, b) => a.rating - b.rating);
    }

    return result;
  }, [books, searchQuery, selectedCategory, sortOrder]);

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (searchQuery.trim() === "") {
        toast.warning("يرجى كتابة شيء للبحث 📚");
        return;
      }
      setHasSearched(true);
    },
    [searchQuery]
  );

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#121222] to-[#181826] text-white p-8">
        <div className="text-center">
          <h3>Discover Your Next Great Read:</h3>
          <h1 className="text-4xl font-bold mb-6">
            Explore and Search for <br />
            <span className="text-[#c9af90]">Any Book</span> In Our Library
          </h1>

          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mt-8">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search by title, author, or genre..."
                className="w-full py-3 pl-4 pr-4 bg-gray-800 border-none rounded-md focus:outline-none focus:ring-2 focus:ring-[#c9af90]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                disabled={searchQuery.trim() === ""}
                className={`ml-2 px-4 py-3 font-medium rounded-md transition ${
                  searchQuery.trim() === ""
                    ? "bg-[#5e524479] text-white cursor-not-allowed"
                    : "bg-[#c9af90] text-black hover:bg-[#a79176]"
                }`}
              >
                Search
              </button>
            </div>
          </form>

          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-gray-800 text-white px-4 py-2 rounded-md"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="bg-gray-800 text-white px-4 py-2 rounded-md"
            >
              <option value="default">Sort By</option>
              <option value="highest">Highest Rated</option>
              <option value="lowest">Lowest Rated</option>
            </select>
          </div>
        </div>

        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-12 animate-pulse">
            {[...Array(6)].map((_, idx) => (
              <div key={idx} className="flex flex-col">
                <div className="aspect-[2/3] w-full bg-gray-700 rounded-md mb-2"></div>
                <div className="h-4 bg-gray-600 w-3/4 rounded mb-1"></div>
                <div className="h-3 bg-gray-600 w-1/2 rounded"></div>
              </div>
            ))}
          </div>
        )}

        {hasSearched && !loading && (
          <div className="max-w-6xl mx-auto px-4 pb-16 mt-12">
            {filteredBooks.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {filteredBooks.slice(0, 8).map((book) => (
                  <div
                    key={book.id}
                    className="flex flex-col items-center cursor-pointer"
                    onClick={() => router.push(`/books/${book.id}`)}
                  >
                    <div className="flex-shrink-0 w-full  flex flex-col items-center cursor-pointer">
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
                  </div>
                ))}
              </div>
            ) : (
              <NoBookFound /> // Corrected here
            )}
          </div>
        )}
      </div>
    </div>
  );
}
