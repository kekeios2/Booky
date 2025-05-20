import { prisma } from "@/lib/prisma";

/**
 * Handle user data after Google authentication
 * Call this function after successfully signing in with Google
 */
export async function handleGoogleSignIn(email: string, profile: any) {
  try {
    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email },
      include: { accounts: true },
    });

    if (user) {
      // Ensure the user is activated
      if (!user.activated) {
        await prisma.user.update({
          where: { id: user.id },
          data: { activated: true },
        });
      }

      // Update user profile with Google info if needed
      if (!user.image || !user.fullName) {
        await prisma.user.update({
          where: { id: user.id },
          data: {
            image: user.image || profile.picture,
            fullName: user.fullName || profile.name,
          },
        });
      }

      // Generate univId if it doesn't exist
      if (!user.univId) {
        await prisma.user.update({
          where: { id: user.id },
          data: {
            univId: Math.floor(Math.random() * 1_000_000_000),
          },
        });
      }

      // Check if Google account is already linked
      const hasGoogleAccount = user.accounts.some(
        (acc) => acc.provider === "google"
      );

      // If no Google account is linked, link it
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
