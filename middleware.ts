import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;

  const isAdminPath =
    pathname.startsWith("/admin") || pathname.startsWith("/api/admin");

  if (isAdminPath) {
    if (!token || token.role !== "Admin") {
      // إذا كان API → رجع JSON
      if (pathname.startsWith("/api")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
      }

      // غير API → حوّله إلى الصفحة الرئيسية
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}
// middleware.ts
export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
