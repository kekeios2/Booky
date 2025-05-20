// app/page.tsx

import { prisma } from "@/lib/prisma";
import HomeContent from "@/components/HomeContent";

// ✅ تمكين ISR بتحديد وقت إعادة التحديث
export const revalidate = 60;

export default async function Page() {
  const books = await prisma.book.findMany({
    select: {
      id: true,
      title: true,
      image: true,
      author: true,
      category: true,
      summary: true,
      rating: true,
      coverColor: true,
      description: true,
    },
  });

  return <HomeContent books={books} />;
}
