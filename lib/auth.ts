// lib\auth.ts
import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const existingUser = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!existingUser || !existingUser.password) {
          return null;
        }

        if (!existingUser.activated) {
          throw new Error(
            "Please verify your email to activate your account." +
              existingUser.email
          );
        }

        const passwordMatch = await compare(
          credentials.password,
          existingUser.password
        );

        if (!passwordMatch) {
          return null;
        }

        return {
          id: existingUser.id,
          fullName: existingUser.fullName ?? "",
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
      profile: async (profile) => {
        const existingUser = await prisma.user.findUnique({
          where: { email: profile.email },
        });

        if (existingUser) {
          if (!existingUser.univId) {
            const updatedUser = await prisma.user.update({
              where: { email: profile.email },
              data: {
                univId: 12345678,
                activated: true,
              },
            });
            return {
              id: updatedUser.id,
              fullName: updatedUser.fullName ?? profile.name ?? "",
              email: updatedUser.email ?? profile.email ?? "",
              univId: updatedUser.univId?.toString() ?? "12345678",
              image: updatedUser.image ?? profile.picture ?? "",
              role: updatedUser.role ?? "User",
            };
          }
          return {
            id: existingUser.id,
            fullName: existingUser.fullName ?? profile.name ?? "",
            email: existingUser.email ?? profile.email ?? "",
            univId: existingUser.univId?.toString() ?? "12345678",
            image: existingUser.image ?? profile.picture ?? "",
            role: existingUser.role ?? "User",
          };
        }

        const newUser = await prisma.user.create({
          data: {
            email: profile.email,
            fullName: profile.name,
            image: profile.picture,
            univId: 12345678,
            role: "User",
            activated: false,
          },
        });

        return {
          id: newUser.id,
          fullName: newUser.fullName ?? profile.name ?? "",
          email: newUser.email ?? profile.email ?? "",
          univId: newUser.univId?.toString() ?? "12345678",
          image: newUser.image ?? profile.picture ?? "",
          role: newUser.role ?? "User",
        };
      },
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
        token.fullName = user.fullName;
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
