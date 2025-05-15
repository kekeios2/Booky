import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      fullName?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
      univId?: string; 
      activated?: boolean;
    };
  }

  interface User {
    univId?: string; 
    fullName?: string; 
    role?: string;
    activated?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    univId?: string;
    fullName?: string; 
    role?: string;
    activated?: boolean;
  }
}
