"use client";

import { useEffect, useState } from "react";
import HeroCarousel from "@/components/Hero/HeroCarousel";
import HeroSkeleton from "@/components/Hero/HeroSekeleton";

interface HeroWrapperProps {
  books: any[];
}

const HeroWrapper = ({ books }: HeroWrapperProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (books && books.length > 0) {
      setLoading(false);
    }
  }, [books]);

  if (loading) {
    return <HeroSkeleton />;
  }

  if (!books || books.length === 0) {
    return <p className="text-white text-center py-10">No books available</p>;
  }

  return (
    <section className="bg-transparent pb-8 md:pb-12 lg:pb-20">
      <div className="container mx-auto px-4">
        <HeroCarousel books={books} isMobile={isMobile} />
      </div>
    </section>
  );
};

export default HeroWrapper;
