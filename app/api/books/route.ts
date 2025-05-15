import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    const books = await prisma.book.findMany({
      where: category ? { category } : {},
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ books });
  } catch (error) {
    console.error("❌ Error fetching books:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: String(error) },
      { status: 500 }
    );
  }
}
