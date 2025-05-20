import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ✅ نوع المستخدم مع type
type UserResult = {
  id: string;
  email: string | null;
  fullName: string | null;
  image: string | null;
  type: "user";
};

// ✅ نوع الكتاب مع type
type BookResult = {
  id: number;
  title: string;
  author: string;
  description: string;
  image: string;
  category: string;
  rating: number;
  coverColor: string;
  type: "book";
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.toLowerCase() || "";

  if (!q) return NextResponse.json([]);

  const users = await prisma.user.findMany({
    where: {
      OR: [
        { fullName: { contains: q, mode: "insensitive" } },
        { email: { contains: q, mode: "insensitive" } },
      ],
    },
    take: 5,
  });

  const books = await prisma.book.findMany({
    where: {
      OR: [
        { title: { contains: q, mode: "insensitive" } },
        { author: { contains: q, mode: "insensitive" } },
      ],
    },
    take: 5,
  });

  const userResults: UserResult[] = users.map((u): UserResult => ({
    id: u.id,
    email: u.email,
    fullName: u.fullName,
    image: u.image,
    type: "user",
  }));

  const bookResults: BookResult[] = books.map((b): BookResult => ({
    id: b.id,
    title: b.title,
    author: b.author,
    description: b.description,
    image: b.image,
    category: b.category,
    rating: b.rating,
    coverColor: b.coverColor,
    type: "book",
  }));

  return NextResponse.json([...userResults, ...bookResults]);
}
