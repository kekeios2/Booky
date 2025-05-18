// app\api\notifications\[id]\route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Context {
  params: { id: string };
}

export async function DELETE(
  request: NextRequest,
  context: Context
) {
  const id = context.params.id;

  // التحقق من صحة المعرف
  if (!id || typeof id !== "string") {
    return NextResponse.json({ error: "Invalid notification ID" }, { status: 400 });
  }

  try {
    await prisma.notification.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Notification deleted successfully" });
  } catch (error: any) {
    console.error("❌ Delete error:", error);
    
    if (
      error?.code === "P2025" || // Prisma error: Record not found
      (error instanceof Error && error.message.includes("Record to delete"))
    ) {
      return NextResponse.json({ error: "Notification not found" }, { status: 404 });
    }

    return NextResponse.json({ error: "Failed to delete notification" }, { status: 500 });
  }
}
