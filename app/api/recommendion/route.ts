import { NextResponse } from "next/server";
import { generateEmbedding } from "@/lib/embedding";
import { cosineSimilarity } from "@/lib/similarity";
import { prisma } from "@/lib/prisma";

// ✅ نوع مبسط للكتاب (يُستخدم في map)
type BookLite = {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  author: string;
  rating: number;
  coverColor: string;
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const idParam = searchParams.get("id");
  const id = idParam ? parseInt(idParam, 10) : null;

  if (!id || isNaN(id)) {
    return NextResponse.json({ error: "Invalid book ID" }, { status: 400 });
  }

  // 🔍 جلب الكتاب الهدف
  const target = await prisma.book.findUnique({
    where: { id },
  });

  if (!target) {
    return NextResponse.json({ error: "Book not found" }, { status: 404 });
  }

  const targetEmbedding = await generateEmbedding(target.description);

  // 📚 جلب جميع الكتب (بدون الهدف)
  const allBooks: BookLite[] = await prisma.book.findMany({
    where: {
      id: { not: id },
    },
    select: {
      id: true,
      title: true,
      description: true,
      image: true,
      category: true,
      author: true,
      rating: true,
      coverColor: true,
    },
  });

  // 🧠 حساب التشابه
  const results = await Promise.all(
    allBooks.map(async (book: BookLite) => {
      const emb = await generateEmbedding(book.description);
      const score = cosineSimilarity(targetEmbedding, emb);
      return { book, score };
    })
  );

  // 🔝 ترتيب واختيار أفضل 6 توصيات
  const top = results
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map((r) => r.book);

  return NextResponse.json({ recommendations: top });
}
