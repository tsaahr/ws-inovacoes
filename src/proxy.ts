import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  const pathname = request.nextUrl.pathname;
  const isLoginRoute = pathname === "/admin/login";
  const cookieValue = request.cookies.get("ADMIN_PASSWORD")?.value;
  const isAuthenticated = Boolean(
    adminPassword && cookieValue && cookieValue === adminPassword,
  );

  if (isLoginRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (!isLoginRoute && !isAuthenticated) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
