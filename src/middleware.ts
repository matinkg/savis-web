import { NextRequest, NextResponse } from "next/server";
import { ExtractPayloadEdgeFunctions } from "./helper/auth/extractPayloadEdgeFunctions";

const protectedAdminRoutes = ["/admin-panel"];
const protectedUserRoutes = ["/user-panel"];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("authToken");
  const pathname = req.nextUrl.pathname;

  // اگر توکن وجود نداشته باشد
  if (!token) {
    if (protectedAdminRoutes.some((route) => pathname.startsWith(route))) {
      const adminLoginUrl = new URL("/auth/admin/signin", req.url);
      return NextResponse.redirect(adminLoginUrl);
    }
    if (protectedUserRoutes.some((route) => pathname.startsWith(route))) {
      const userLoginUrl = new URL("/auth/signin", req.url);
      return NextResponse.redirect(userLoginUrl);
    }
    return NextResponse.next();
  }

  const payload: any = ExtractPayloadEdgeFunctions(token.value);
  console.log("🚀 ~ middleware ~ payload:", payload);
  const roles = Array.isArray(payload?.role) ? payload?.role : [payload?.role];
  return NextResponse.next();
}

export const config = {
  matcher: ["/user-panel/:path*", "/admin-panel/:path*"],
};
