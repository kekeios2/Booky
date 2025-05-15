// app/api/user-borrowed-books/route.ts

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      borrows: {
        where: { status: "APPROVED" },
        orderBy: { borrowedAt: "desc" }, // تأكد من ترتيب الاستعارات
        include: { book: true },
      },
    },
  });

  // دمج معلومات الاستعارة مع الكتاب
  const books = user?.borrows.map((borrow) => ({
    ...borrow.book,
    borrowedAt: borrow.borrowedAt, 
  }));

  return NextResponse.json({ books });
}
