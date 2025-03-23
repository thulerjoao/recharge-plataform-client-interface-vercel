import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;
  const expiresIn = cookieStore.get("expiresIn")?.value;
  const rememberMe = cookieStore.get("rememberMe")?.value;

  return NextResponse.json({
    accessToken,
    refreshToken,
    expiresIn,
    rememberMe,
  });
}
