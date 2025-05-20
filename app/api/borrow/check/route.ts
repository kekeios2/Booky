// app/api/borrow/check/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    // Get current user from session
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { borrowed: false, error: "Not authenticated" },
        { status: 401 }
      );
    }

    // Get bookId from query parameters
    const url = new URL(request.url);
    const bookId = url.searchParams.get("bookId");
    
    if (!bookId) {
      return NextResponse.json(
        { borrowed: false, error: "BookId is required" },
        { status: 400 }
      );
    }

    // Get current user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { borrowed: false, error: "User not found" },
        { status: 404 }
      );
    }

    // Check if user has borrowed this book
    const borrow = await prisma.borrow.findFirst({
      where: {
        userId: user.id,
        bookId: parseInt(bookId),
      },
    });

    return NextResponse.json({ borrowed: !!borrow });
  } catch (error) {
    console.error("Error checking borrow status:", error);
    return NextResponse.json(
      { borrowed: false, error: "Failed to check borrow status" },
      { status: 500 }
    );
  }
}