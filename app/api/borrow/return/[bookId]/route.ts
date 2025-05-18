import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { createNotification } from "@/lib/notifications";

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

  // ✅ استخراج bookId من URL
  const bookId = req.nextUrl.pathname.split("/")[4];

  if (!bookId) {
    return NextResponse.json({ error: "Book ID is required" }, { status: 400 });
  }

  // ✅ جلب الكتاب للحصول على الاسم
  const book = await prisma.book.findUnique({
    where: { id: parseInt(bookId) },
  });

  if (!book) {
    return NextResponse.json({ error: "Book not found" }, { status: 404 });
  }

  // ✅ حذف سجل الإعارة
  const deletedBorrow = await prisma.borrow.deleteMany({
    where: {
      userId: user.id,
      bookId: parseInt(bookId),
      status: "APPROVED",
    },
  });

  if (deletedBorrow.count === 0) {
    return NextResponse.json(
      { error: "No active borrow record found" },
      { status: 400 }
    );
  }

  // ✅ إرسال إشعار
  await createNotification(
    user.id,
    "Book Returned",
    `Your book "${book.title}" has been returned successfully.`
  );

  return NextResponse.json({
    message: "Book returned and borrow record deleted successfully",
  });
}
