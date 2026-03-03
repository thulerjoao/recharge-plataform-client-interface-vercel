import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

// Aplicar o middleware apenas para rotas protegidas
export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"], // Adapte as rotas conforme necessário
};
