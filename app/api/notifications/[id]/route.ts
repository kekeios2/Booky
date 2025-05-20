import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(_req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ error: "User Not Found" }, { status: 404 });
  }
  await prisma.notification.delete({
    where: {
      id: _req.url.split('/').pop(),
      userId: user.id,
    },
  });

  return NextResponse.json({ message: "All notifications deleted successfully." });
}
