"use client";

import dynamic from "next/dynamic";
const Navbar = dynamic(() => import("@/components/Navbar"));
const Footer = dynamic(() => import("@/components/Footer"));
import HeroWrapper from "@/components/Hero/HeroWrapper";
const PopularBooksWrapper = dynamic(
  () => import("@/components/popularBooks/PopularBooksWrapper")
);

export default function HomeContent({ books }: { books: any[] }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#121222] to-[#181826]!">
      <Navbar />
      <HeroWrapper books={books.slice(-5)} />
      <PopularBooksWrapper books={books}  error={""} />
      <Footer />
    </div>
  );
}
