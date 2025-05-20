// app/api/user-borrowed-books/route.ts

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        borrows: {
          where: { status: "APPROVED" },
          orderBy: { borrowedAt: "desc" },
          include: { book: true },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const books = user.borrows.map((borrow) => ({
      ...borrow.book,
      borrowedAt: borrow.borrowedAt,
    }));

    return NextResponse.json({ books }, { status: 200 });
  } catch (err) {
    console.error("❌ Fetch error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
