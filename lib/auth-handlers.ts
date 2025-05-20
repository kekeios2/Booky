import { prisma } from "@/lib/prisma";
import { Account } from "@prisma/client"; // ✅ الاستيراد الصحيح للنوع

export async function handleGoogleSignIn(email: string, profile: any) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { accounts: true },
    });

    if (user) {
      if (!user.activated) {
        await prisma.user.update({
          where: { id: user.id },
          data: { activated: true },
        });
      }

      if (!user.image || !user.fullName) {
        await prisma.user.update({
          where: { id: user.id },
          data: {
            image: user.image || profile.picture,
            fullName: user.fullName || profile.name,
          },
        });
      }

      if (!user.univId) {
        await prisma.user.update({
          where: { id: user.id },
          data: {
            univId: Math.floor(Math.random() * 1_000_000_000),
          },
        });
      }

      // ✅ حل الخطأ باستخدام النوع الصحيح
      const hasGoogleAccount = user.accounts.some(
        (acc: Account) => acc.provider === "google"
      );

      if (!hasGoogleAccount && profile.sub) {
        await prisma.account.create({
          data: {
            userId: user.id,
            type: "oauth",
            provider: "google",
            providerAccountId: profile.sub,
          },
        });
      }
    }

    return true;
  } catch (error) {
    console.error("Error handling Google sign-in:", error);
    return false;
  }
}
