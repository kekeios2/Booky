// app/api/admin/books/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// ✅ [GET] Fetch single book by ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Await params first before accessing its properties
    const { id: idParam } = await Promise.resolve(params);
    const id = parseInt(idParam);
    
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid book ID" }, { status: 400 });
    }
    
    const book = await prisma.book.findUnique({ where: { id } });
    
    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }
    
    return NextResponse.json({ book });
  } catch (error) {
    console.error("Error fetching book:", error);
    return NextResponse.json(
      { error: "Failed to fetch book" },
      { status: 500 }
    );
  }
}

// ✅ [DELETE] Delete book by ID with handling of related records
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    
    if (!session || session.user?.role !== "Admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    // Await params first before accessing its properties
    const { id: idParam } = await Promise.resolve(params);
    const id = parseInt(idParam);
    
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid book ID" }, { status: 400 });
    }
    
    // First check if the book exists
    const book = await prisma.book.findUnique({ where: { id } });
    
    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }
    
    // Use a transaction to delete related records first, then the book
    await prisma.$transaction(async (tx) => {
      // Delete all borrows related to this book
      await tx.borrow.deleteMany({
        where: { bookId: id }
      });
      
      // SavedBook has onDelete: Cascade, so we don't need to handle it
      
      // Finally delete the book
      await tx.book.delete({ where: { id } });
    });
    
    return NextResponse.json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Error deleting book:", error);
    return NextResponse.json(
      { error: "Failed to delete book" },
      { status: 500 }
    );
  }
}