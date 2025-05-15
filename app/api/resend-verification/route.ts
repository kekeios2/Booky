// app/api/auth/resend-verification/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateActivationToken, sendVerificationEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    // Log the entire request for debugging
    console.log("Received resend verification request");
    
    // Parse the request body carefully
    let email;
    try {
      const body = await req.json();
      email = body.email;
      console.log("Request body parsed, email:", email);
    } catch (error) {
      console.error("Failed to parse request body:", error);
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    if (!email) {
      console.error("Email is missing in request");
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Find the user
    console.log("Looking up user in database");
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      console.error("User not found:", email);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log("User found:", user.id);

    if (user.activated) {
      console.log("Account already activated for:", email);
      return NextResponse.json(
        { message: "Account is already activated" },
        { status: 200 }
      );
    }

    // Delete any existing tokens for this user
    console.log("Removing old activation tokens");
    await prisma.activateToken.deleteMany({
      where: { userId: user.id },
    });

    // Generate new activation token
    console.log("Generating new activation token");
    const token = await generateActivationToken(user.id);
    console.log("Generated token:", token);

    // Send verification email
    console.log("Sending verification email to:", email);
    await sendVerificationEmail(email, token);

    console.log("Verification email sent successfully to:", email);
    return NextResponse.json(
      { message: "Verification email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to resend verification email:", error);
    // Return more detailed error messages for debugging
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `Failed to send verification email: ${errorMessage}` },
      { status: 500 }
    );
  }
}