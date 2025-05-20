import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// ✅ GET: check if saved OR list all
export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url);
  const bookId = url.searchParams.get("bookId");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  if (bookId) {
    const saved = await prisma.savedBook.findUnique({
      where: {
        userId_bookId: {
          userId: user.id,
          bookId: Number(bookId),
        },
      },
    });
    return NextResponse.json({ saved: !!saved });
  }

  const saved = await prisma.savedBook.findMany({
    where: { userId: user.id },
    include: { book: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ savedBooks: saved });
}

// ✅ POST: save book
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { bookId } = await req.json();

  if (!bookId) {
    return NextResponse.json({ error: "Missing bookId" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const existing = await prisma.savedBook.findUnique({
    where: {
      userId_bookId: {
        userId: user.id,
        bookId: Number(bookId),
      },
    },
  });

  if (existing) {
    return NextResponse.json({ message: "Already saved" });
  }

  await prisma.savedBook.create({
    data: {
      userId: user.id,
      bookId: Number(bookId),
    },
  });

  return NextResponse.json({ message: "Book saved successfully!" });
}

// ✅ DELETE: unsave book
export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { bookId } = await req.json();

  if (!bookId) {
    return NextResponse.json({ error: "Missing bookId" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  await prisma.savedBook.delete({
    where: {
      userId_bookId: {
        userId: user.id,
        bookId: Number(bookId),
      },
    },
  });

  return NextResponse.json({ message: "Book removed from saved list." });
}
