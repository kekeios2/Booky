import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Update your middleware to include better logging
export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;

  const isAdminPath =
    pathname.startsWith("/admin") || pathname.startsWith("/api/admin");

  // Add detailed logging
  console.log({
    pathname,
    isAdminPath,
    hasToken: !!token,
    tokenRole: token?.role,
    fullToken: token, // Be careful with this in production
  });

  if (isAdminPath) {
    if (!token || token.role !== "Admin") {
      // If API → return JSON
      if (pathname.startsWith("/api")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
      }

      // Not API → redirect to homepage
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}
// middleware.ts
export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
