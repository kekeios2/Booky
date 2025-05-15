// /app/api/borrow/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "You have to Sign in First !!" }, { status: 401 });
  }

  const { bookId } = await req.json();

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // ✅ Check if already borrowed this book
    const alreadyBorrowed = await prisma.borrow.findFirst({
      where: {
        userId: user.id,
        bookId: Number(bookId),
      },
    });

    if (alreadyBorrowed) {
      return NextResponse.json(
        { error: "You have already borrowed this book." },
        { status: 409 }
      );
    }

    // ✅ Create borrow record
    await prisma.borrow.create({
      data: {
        userId: user.id,
        bookId: Number(bookId),
        status: "PENDING",
      },
    });

    return NextResponse.json({ message: "Borrow request sent for approval." });
  } catch (error) {
    console.error("Borrow error:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
