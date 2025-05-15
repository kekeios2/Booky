// lib/email.ts - Fixed version
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";
import { randomBytes } from "crypto";
import VerificationEmail from "@/email/Verification";
import BorrowApprovedEmail from "@/email/BorrowApproved";

export async function generateActivationToken(userId: string): Promise<string> {
  console.log("Generating activation token for user:", userId);

  // Generate a random token
  const token = randomBytes(32).toString("hex");
  console.log("Generated token:", token);

  // Store the token in the database
  try {
    const activateToken = await prisma.activateToken.create({
      data: {
        token,
        userId,
      },
    });
    console.log("Token stored in database with ID:", activateToken.id);
  } catch (error) {
    console.error("Failed to store token in database:", error);
    throw new Error("Failed to store activation token");
  }

  return token;
}

export async function sendVerificationEmail(email: string, token: string) {
  console.log("Attempting to send verification email to:", email);

  // Check for and log environment variables
  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is missing");
    throw new Error("RESEND_API_KEY is missing in environment variables");
  }

  console.log(
    "Using Resend API key:",
    process.env.RESEND_API_KEY.substring(0, 5) + "..."
  );
  const resend = new Resend(process.env.RESEND_API_KEY);

  if (!process.env.NEXT_PUBLIC_APP_URL) {
    console.error("NEXT_PUBLIC_APP_URL is not defined");
    throw new Error(
      "NEXT_PUBLIC_APP_URL is not defined in environment variables"
    );
  }

  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify?token=${token}`;
  console.log("Verification URL:", verificationUrl);

  // Make sure your "from" email uses a domain you've verified in Resend
  const from = process.env.EMAIL_FROM || "onboarding@resend.dev";
  console.log("Sending from:", from);

  try {
    console.log("Sending email with Resend...");

    // Before calling the API, log the full request payload
    const emailPayload = {
      from,
      to: email,
      subject: "Verify your email address",
      react: VerificationEmail({ verificationUrl }),
      text: `Please verify your email by clicking this link: ${verificationUrl}`,
    };
    console.log("Email payload:", {
      ...emailPayload,
      react: "[React Component]",
    });

    const { data, error } = await resend.emails.send(emailPayload);

    if (error) {
      console.error("Email sending error from Resend:", error);
      throw new Error(`Resend API error: ${error.message}`);
    }

    console.log("Email sent successfully:", data);
    return data;
  } catch (error) {
    console.error("Failed to send email:", error);
    // More detailed error logging
    if (error instanceof Error) {
      console.error("Error details:", error.message, error.stack);
    }
    throw error;
  }
}

export async function sendBorrowApprovedEmail({
  to,
  userName,
  bookTitle,
  profileUrl,
}: {
  to: string;
  userName: string;
  bookTitle: string;
  profileUrl: string;
}) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const from = process.env.EMAIL_FROM || "onboarding@resend.dev";

  try {
    await resend.emails.send({
      from,
      to,
      subject: "Your book borrowing request has been approved!",
      react: BorrowApprovedEmail({ userName, bookTitle, profileUrl }),
      text: `Hello ${userName}, your request to borrow "${bookTitle}" has been approved.`,
    });
  } catch (error) {   
    console.error("❌ Failed to send borrow approval email:", error);
  }
}
