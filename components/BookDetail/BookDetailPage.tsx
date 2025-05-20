import BookDetailHeader from "./BookDetailHeader";
import BookDetailBody from "./BookDetailBody";
import BookRecommendations from "./BookRecommendations";

export default function BookDetailPage({
  book,
  recommendedBooks,
}: {
  book: any;
  recommendedBooks: any[];
}) {
  return (
    <div className="min-h-screen  text-white">
      <main className="container mx-auto px-6 py-8 max-w-6xl">
      <div className="flex flex-col lg:flex-row items-center gap-6 md:gap-8 lg:gap-16 w-full max-w-screen-xl mt-10">
      <BookDetailHeader book={book} isMobile={false} />
          <BookDetailBody book={book} />
        </div>
      </main>
      <section className="px-6 py-12 max-w-6xl mx-auto">
        <BookRecommendations books={recommendedBooks} />
      </section>
    </div>
  );
}
