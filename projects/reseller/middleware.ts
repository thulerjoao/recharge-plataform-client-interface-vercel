import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const loggedPages = [
    "/home",
    "/old-recharge",
    "/products",
    "/recharge",
    "/sales",
    "/wallet",
    "/settings",
  ];
  const unloggedPages = ["/"];
  const path = req.nextUrl.pathname;

  if (!token && req.nextUrl.pathname !== "/") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!token && !unloggedPages.includes(path)) {
    return NextResponse.redirect(new URL("/", req.url)); // Se não estiver logado, redireciona para login
  }

  if (token && !loggedPages.some((p) => path.startsWith(p))) {
    return NextResponse.redirect(new URL("/home", req.url)); // Se logado e acessando rota inválida, redireciona para home
  }

  return NextResponse.next(); // Continua a execução normalmente
}

export const config = {
  matcher: ["/((?!_next|api|static|favicon.ico).*)"], // Aplica o middleware a todas as rotas, exceto APIs e arquivos estáticos
};
