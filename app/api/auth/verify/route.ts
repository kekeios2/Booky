// app/api/auth/verify/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    // Log the verification request
    console.log("Processing verification request");
    
    const token = req.nextUrl.searchParams.get("token");
    console.log("Token:", token);
    
    if (!token) {
      console.error("Token is missing");
      return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }
    
    // Find the token in the database
    console.log("Looking up token in database");
    const activateToken = await prisma.activateToken.findUnique({
      where: { token },
      include: { user: true },
    });
    
    if (!activateToken) {
      console.error("Invalid token, not found in database");
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
    }
    
    console.log("Token found:", activateToken.id, "for user:", activateToken.userId);
    
    // Check if the token is expired (optional - add your own expiry logic)
    const tokenCreatedAt = new Date(activateToken.createdAt);
    const now = new Date();
    const tokenAgeHours = (now.getTime() - tokenCreatedAt.getTime()) / (1000 * 60 * 60);
    
    if (tokenAgeHours > 24) { // Token expires after 24 hours
      console.log("Token expired - created:", tokenCreatedAt, "age in hours:", tokenAgeHours);
      // Delete the expired token
      await prisma.activateToken.delete({
        where: { id: activateToken.id },
      });
      
      return NextResponse.json({ error: "Token has expired" }, { status: 400 });
    }
    
    // Activate the user
    console.log("Activating user:", activateToken.userId);
    await prisma.user.update({
      where: { id: activateToken.userId },
      data: { activated: true },
    });
    
    // Delete the used token
    console.log("Deleting used token");
    await prisma.activateToken.delete({
      where: { id: activateToken.id },
    });
    
    console.log("User activated successfully, redirecting to login");
    // Return a success response AND redirect to the login page
    return NextResponse.redirect(new URL('/login?verified=true', req.url));
  } catch (error) {
    console.error("Token verification error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: `Verification failed: ${errorMessage}` }, { status: 500 });
  }
}