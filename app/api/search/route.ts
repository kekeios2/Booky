import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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

  const userResults = users.map((u:any) => ({ ...u, type: "user" }));
  const bookResults = books.map((b :any) => ({ ...b, type: "book" }));

  return NextResponse.json([...userResults, ...bookResults]);
}
