import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { CustomPrismaAdapter } from "./custom-prisma-adapter";

export const authOptions: NextAuthOptions = {
  adapter: CustomPrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, _req) {
        if (!credentials?.email || !credentials.password) return null;

        const existingUser = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!existingUser || !existingUser.password) return null;
        if (!existingUser.activated)
          throw new Error("Please verify your email to activate your account.");

        const passwordMatch = await compare(
          credentials.password,
          existingUser.password
        );

        if (!passwordMatch) return null;

        return {
          id: existingUser.id,
          name: existingUser.fullName ?? "", // Map fullName to name for NextAuth
          email: existingUser.email ?? "",
          univId: existingUser.univId?.toString() ?? "",
          image: existingUser.image ?? "",
          role: existingUser.role ?? "User",
        };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
  ],

  pages: {
    signIn: "/login",
    error: "/auth/error",
  },

  session: {
    strategy: "jwt",
  },

  debug: process.env.NODE_ENV === "development",

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.univId = user.univId;
        token.fullName = user.name ?? "";
        token.role = user.role || "User";
      }
      return token;
    },
    
    async session({ session, token }) {
      if (session.user) {
        session.user.univId = token.univId as string;
        session.user.fullName = token.fullName as string;
        session.user.role = token.role;
      }
      return session;
    },
    
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
};