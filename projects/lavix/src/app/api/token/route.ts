import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;
  const rememberMe = cookieStore.get("rememberMe")?.value;

  return NextResponse.json({
    refreshToken,
    rememberMe,
  });
}
