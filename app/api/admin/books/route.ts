import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// ✅ [GET] Get all Books
export async function GET() {
  try {
    const books = await prisma.book.findMany();
    return NextResponse.json({ books });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "Admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const id = formData.get("id")?.toString();
    const title = formData.get("title")?.toString() || "";
    const author = formData.get("author")?.toString() || "";
    const category = formData.get("category")?.toString() || "";
    const rating = Number(formData.get("rating"));
    const description = formData.get("description")?.toString() || "";
    const summary = formData.get("summary")?.toString() || "";
    const coverColor = formData.get("coverColor")?.toString() || "";
    const image = formData.get("image")?.toString() || "";

    if (!id) {
      return NextResponse.json(
        { error: "Book ID is required" },
        { status: 400 }
      );
    }

    const updatedBook = await prisma.book.update({
      where: { id: Number(id) },
      data: {
        title,
        author,
        category,
        rating,
        description,
        summary,
        image,
        coverColor,
      },
    });

    return NextResponse.json({ book: updatedBook });
  } catch (error) {
    console.error("Error updating book:", error);
    return NextResponse.json(
      { error: "Failed to update book" },
      { status: 500 }
    );
  }
}

// ✅ [POST] Create new book
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== "Admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const id = formData.get("id")?.toString();
    const title = formData.get("title")?.toString() || "";
    const author = formData.get("author")?.toString() || "";
    const category = formData.get("category")?.toString() || "";
    const rating = Number(formData.get("rating"));
    const description = formData.get("description")?.toString() || "";
    const summary = formData.get("summary")?.toString() || "";
    const coverColor = formData.get("coverColor")?.toString() || "";
    const image = formData.get("image")?.toString() || "";
    const pdfUrl = formData.get("pdfUrl")?.toString() || "";

    const newBook = await prisma.book.create({
      data: {
        title,
        author,
        category,
        rating,
        description,
        summary,
        image,
        coverColor,
        pdfUrl,
      },
    });

    return NextResponse.json(
      {
        message: "Book added",
        book: newBook,
        redirectTo: "/admin/books", // Add this property
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating book:", error);
    return NextResponse.json({ error: "Error creating book" }, { status: 500 });
  }
}

// ✅ [DELETE] Delete book
export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "Admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    await prisma.book.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json(
      { message: "Book deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting book:", error);
    return NextResponse.json(
      { error: "Failed to delete book" },
      { status: 500 }
    );
  }
}

