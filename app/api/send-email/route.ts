// app\api\send-email\route.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  const { email, token } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }
  if (!token) {
    return NextResponse.json({ error: "Token is required" }, { status: 400 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: "noreply@yourdomain.com",  
      to: email,
      subject: "Please verify your email",
      text: `Please verify your email by clicking this link: ${process.env.NEXT_PUBLIC_APP_URL}/verify?token=${token}`,
    });

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("Failed to send email:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
