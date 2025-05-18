// app/page.tsx
import { prisma } from "@/lib/prisma";
import HomeContent from "@/components/HomeContent";

export default async function Page() {
  const books = await prisma.book.findMany({
    select: {
      id: true,
      title: true,
      image: true,
      author: true,       // ✅ عشان ما ينهار split
      category: true,     // ✅ للتصنيف
      summary: true,      // ✅ للملخص
      rating: true,       // ✅ للنجوم
      coverColor:true,
      description:true,
    },
  });

  return <HomeContent books={books} />;
}
