import { prisma } from "@/lib/prisma";

export async function createNotification(userId: string, title: string, body?: string) {
  return await prisma.notification.create({
    data: {
      userId,
      title,
      body,
    },
  });
}
