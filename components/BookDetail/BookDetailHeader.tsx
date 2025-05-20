// components/book/BookDetailHeader.tsx
import BookCover from "@/components/BookCover";

type Props = {
  book: {
    image: string;
    coverColor: string;
  };
  isMobile: boolean;
};

export default function BookDetailHeader({ book, isMobile }: Props) {
  return (
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
  );
}
