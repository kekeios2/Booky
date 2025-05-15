// import { NextRequest, NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import { prisma } from "@/lib/prisma";
// import { randomUUID } from "crypto";

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const { email, fullName, password, univId } = body;

//     // إنشاء المستخدم
//     const user = await prisma.user.create({
//       data: {
//         email,
//         fullName,
//         password: await bcrypt.hash(password, 12),
//         univId: Number(univId),
//         image: "",
//         role: "User",
//         activated: false,
//       },
//       select: {
//         id: true,
//         email: true,
//         fullName: true,
//         activated: true,
//       },
//     });

//     // إنشاء توكن التفعيل
//     const token = await prisma.activateToken.create({
//       data: {
//         token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ""),
//         userId: user.id,
//       },
//     });

//     // استدعاء API إرسال الإيميل
//     const sendMailResponse = await fetch(
//       `${process.env.NEXT_PUBLIC_APP_URL}/api/send-email`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email: user.email,
//           token: token.token,
//         }),
//       }
//     );

//     if (!sendMailResponse.ok) {
//       console.error("Failed to send activation email");
//       // ممكن تعيد المحاولة أو ترجع خطأ مناسب
//     }

//     return NextResponse.json(
//       {
//         message: "Registration successful. Please check your email to activate your account.",
//         user: user,
//         email: user.email,
//       },
//       { status: 201 }
//     );
//   } catch (error: any) {
//     console.error("❌ Registration error:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

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
        activated: false,
      },
    });

    // Generate activation token
    const token = await generateActivationToken(user.id);

    // Send verification email
    await sendVerificationEmail(email, token);

    return NextResponse.json(
      { message: "User registered successfully. Please check your email to activate your account." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Registration failed" },
      { status: 500 }
    );
  }
}