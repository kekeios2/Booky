// lib/custom-prisma-adapter.ts

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { Adapter } from "next-auth/adapters";

export function CustomPrismaAdapter(prisma: PrismaClient): Adapter {
  const standardAdapter = PrismaAdapter(prisma);

  return {
    ...standardAdapter,

    async createUser(data: { email: any; name: any; image: any; }) {
      const randomUnivId = Math.floor(Math.random() * 1_000_000_000);

      const newUser = await prisma.user.create({
        data: {
          email: data.email ?? "",
          fullName: data.name ?? "",
          image: data.image ?? "",
          univId: randomUnivId,
          role: "User",
          activated: true,
        },
      });

      return {
        id: newUser.id,
        name: newUser.fullName ?? "",
        email: newUser.email ?? "",
        image: newUser.image ?? "",
        emailVerified: null,
      };
    },

    async getUser(id) {
      const user = await prisma.user.findUnique({ where: { id } });
      if (!user) return null;

      return {
        id: user.id,
        name: user.fullName ?? "",
        email: user.email ?? "",
        image: user.image ?? "",
        emailVerified: null,
      };
    },

    async getUserByEmail(email) {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) return null;

      return {
        id: user.id,
        name: user.fullName ?? "",
        email: user.email ?? "",
        image: user.image ?? "",
        emailVerified: null,
      };
    },

    async getUserByAccount({ provider, providerAccountId }) {
      const account = await prisma.account.findUnique({
        where: {
          provider_providerAccountId: {
            provider,
            providerAccountId,
          },
        },
        include: { user: true },
      });

      if (!account || !account.user) return null;

      return {
        id: account.user.id,
        name: account.user.fullName ?? "",
        email: account.user.email ?? "",
        image: account.user.image ?? "",
        emailVerified: null,
      };
    },

    async updateUser(data) {
      const updatedUser = await prisma.user.update({
        where: { id: data.id },
        data: {
          fullName: data.name ?? "",
          email: data.email ?? "",
          image: data.image ?? "",
        },
      });

      return {
        id: updatedUser.id,
        name: updatedUser.fullName ?? "",
        email: updatedUser.email ?? "",
        image: updatedUser.image ?? "",
        emailVerified: null,
      };
    },
  };
}
