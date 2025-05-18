// app\api\auth\activate\route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createNotification } from "@/lib/notifications";

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }

    const record = await prisma.activateToken.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!record) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    // فعّل المستخدم
    await prisma.user.update({
      where: { id: record.userId },
      data: { activated: true },
    });
    await createNotification(record.userId, "Account Activated", "Your account has been successfully activated.");

    // حذف التوكن بعد التفعيل (اختياري)
    await prisma.activateToken.delete({
      where: { token },
    });

    return NextResponse.json({ message: "Account activated" });
  } catch (error) {
    console.error("Activation error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
