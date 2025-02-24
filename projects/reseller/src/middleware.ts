import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const logged = req.cookies.get("logged")?.value;

  if (!logged) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/home/:path*",
    "/sales/:path*",
    "/products/:path*",
    "/recharge/:path*",
    "/wallet/:path*",
    "/config/:path*",
  ],
};
