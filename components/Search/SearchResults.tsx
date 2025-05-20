// components/search/SearchResults.tsx
import { useRouter } from "next/navigation";
import BookCover from "@/components/BookCover";
import NoBookFound from "@/components/noBookFound";

interface Book {
  id: string;
  title: string;
  author: string;
  image: string;
  coverColor?: string;
}

interface Props {
  loading: boolean;
  hasSearched: boolean;
  filteredBooks: Book[];
}

export default function SearchResults({
  loading,
  hasSearched,
  filteredBooks,
}: Props) {
  const router = useRouter();

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-12 animate-pulse">
        {[...Array(6)].map((_, idx) => (
          <div key={idx} className="flex flex-col">
            <div className="aspect-[2/3] w-full bg-gray-700 rounded-md mb-2"></div>
            <div className="h-4 bg-gray-600 w-3/4 rounded mb-1"></div>
            <div className="h-3 bg-gray-600 w-1/2 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (hasSearched && filteredBooks.length === 0) {
    return <NoBookFound />;
  }

  if (!hasSearched) {
    return (
      <div className="mt-20 text-center text-gray-400 space-y-4">
        <h2 className="text-xl md:text-2xl font-semibold text-white">
          Looking for your next great read?
        </h2>
        <p className="text-base md:text-lg text-gray-400">
         
          Once you hit <span className="font-medium text-[#c9af90]">Search</span>, your results will appear here.
        </p>
      </div>
    );
  }
  
  return (
    <div className="max-w-6xl mx-auto px-4 pb-16 mt-12">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {filteredBooks.slice(0, 8).map((book) => (
          <div
            key={book.id}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => router.push(`/books/${book.id}`)}
          >
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
              <p className="text-gray-400 text-xs mt-1 italic">{book.author}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
