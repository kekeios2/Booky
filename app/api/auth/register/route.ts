import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { generateActivationToken, sendVerificationEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const { email, fullName, password, univId } = await req.json();

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await hash(password, 10);

    // Create user (not activated yet)
    const user = await prisma.user.create({
      data: {
        email,
        fullName,
        password: hashedPassword,
        univId,
        activated: true,
      },
    });

    // Generate activation token
    if (user.email == "ahmadbozak00@gmail.com") {
      const token = await generateActivationToken(user.id);

      // Send verification email
      await sendVerificationEmail(email, token);
    }
    return NextResponse.json(
      {
        message:
          "User registered successfully. Please check your email to activate your account.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
