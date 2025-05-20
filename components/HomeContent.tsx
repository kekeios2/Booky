"use client";
import { Book } from "@/types/types";
import dynamic from "next/dynamic";
import HeroWrapper from "@/components/Hero/HeroWrapper";
import NoiseBackground from "./NoiseBackground";
const PopularBooksWrapper = dynamic(
  () => import("@/components/popularBooks/PopularBooksWrapper")
);

export default function HomeContent({ books }: { books: Book[] }) {
  return (
    <div className="min-h-screen flex flex-col  ">
      <NoiseBackground />

      <HeroWrapper books={books.slice(-5)} />
      <PopularBooksWrapper books={books} error={""} />
    </div>
  );
}
