import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const totalUsers = await prisma.user.count();
    const totalBooks = await prisma.book.count();
    const borrowRequests = await prisma.borrow.count({
      where: { status: "PENDING" },
    });

    const latestUsers = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    });

    const latestBorrow = await prisma.borrow.findMany({
      orderBy: { borrowedAt: "desc" },
      take: 5,
      include: {
        user: true,
        book: true,
      },
    });

    const activity = await prisma.borrow.groupBy({
      by: ["borrowedAt"],
      _count: { _all: true },
      orderBy: { borrowedAt: "asc" },
    });

    const chartData = activity.map((item) => ({
      date: new Date(item.borrowedAt).toLocaleDateString("en-EG"),
      count: item._count._all,
    }));

    return NextResponse.json({
      totalUsers,
      totalBooks,
      borrowRequests,
      latestUsers,
      latestBorrow,
      chartData,
    });
  } catch (error) {
    console.error("Dashboard API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
