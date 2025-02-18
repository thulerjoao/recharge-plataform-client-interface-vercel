import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE() {
  const cookieStore = cookies();

  cookieStore.set("token", "", { expires: new Date(0), path: "/" });

  return NextResponse.json({
    success: true,
    message: "Logout realizado com sucesso",
  });
}
