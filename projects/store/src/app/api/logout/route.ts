import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const response = new NextResponse(
    JSON.stringify({
      success: true,
      message: "Logout realizado com sucesso",
    }),
    { status: 200 },
  );

  response.cookies.set("accessToken", "", { path: "/", expires: new Date(0) });
  response.cookies.set("refreshToken", "", { path: "/", expires: new Date(0) });
  response.cookies.set("inSession", "", { path: "/", expires: new Date(0) });
  response.cookies.set("rememberMe", "", { path: "/", expires: new Date(0) });

  return response;
}
