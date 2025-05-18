import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { sendBorrowApprovedEmail } from "@/lib/email";
import { createNotification } from "@/lib/notifications";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "Admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const { borrowId, action } = await req.json();

  if (!borrowId || !["APPROVED", "REJECTED"].includes(action)) {
    return NextResponse.json(
      { error: "Invalid request data." },
      { status: 400 }
    );
  }

  const borrow = await prisma.borrow.findUnique({
    where: { id: borrowId },
    include: { book: true },
  });

  if (!borrow || !borrow.book) {
    return NextResponse.json(
      { error: "Borrow or book not found." },
      { status: 404 }
    );
  }

  try {
    // 1. Update status
    const updatedBorrow = await prisma.borrow.update({
      where: { id: borrowId },
      data: { status: action },
      include: {
        user: true,
        book: true,
      },
    });

    // 2. Send email only if approved
    if (action === "APPROVED") {
      await createNotification(
        borrow.userId,
        "Book Approved",
        `Your request to borrow "${borrow.book.title}" has been approved.`
      );

      await sendBorrowApprovedEmail({
        to: updatedBorrow.user.email || "",
        userName: updatedBorrow.user.fullName || "there",
        bookTitle: updatedBorrow.book.title,
        profileUrl: "http://localhost:3000/profile",
      });
    } else if (action === "REJECTED") {
      await createNotification(
        borrow.userId,
        "Book Rejected",
        `Your request to borrow "${borrow.book.title}" has been rejected.`
      );

      // حذف الطلب من قاعدة البيانات
      await prisma.borrow.delete({
        where: { id: borrowId },
      });
    }

    return NextResponse.json({
      message: `Borrow request ${action.toLowerCase()}.`,
    });
  } catch (error) {
    console.error("Approval error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
