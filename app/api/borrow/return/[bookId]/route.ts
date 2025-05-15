import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // استخراج bookId من URL باستخدام nextUrl.pathname
  const bookId = req.nextUrl.pathname.split("/")[4];

  if (!bookId) {
    return NextResponse.json({ error: "Book ID is required" }, { status: 400 });
  }

  // Delete the borrow record for this user and book
  const deletedBorrow = await prisma.borrow.deleteMany({
    where: {
      userId: user.id,
      bookId: parseInt(bookId), // Make sure to parse the bookId as an integer
      status: "APPROVED", // Ensure the book is currently borrowed
    },
    
  });

  if (deletedBorrow.count === 0) {
    return NextResponse.json({ error: "No active borrow record found" }, { status: 400 });
  }  

  return NextResponse.json({ message: "Book returned and borrow record deleted successfully" });
}
