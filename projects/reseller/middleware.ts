import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token && req.nextUrl.pathname !== "/") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const path = req.nextUrl.pathname;

  return NextResponse.next(); // Continua a execução normalmente
}

export const config = {
  matcher: [
    "/home/:path*",
    "/old-recharge/:path*",
    "/products/:path*",
    "/recharge/:path*",
    "/sales/:path*",
    "/wallet/:path*",
    "/settings/:path*",
  ], // Aplica o middleware a todas as rotas, exceto APIs e arquivos estáticos
};
