import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { accessToken, refreshToken, rememberMe } = await req.json();

    if (!accessToken) {
      return NextResponse.json({ error: "Missing token" }, { status: 400 });
    }

    if (!refreshToken) {
      return NextResponse.json({ error: "Missing token" }, { status: 400 });
    }

    const cookieStore = cookies();

    cookieStore.set("token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      ...(rememberMe && { maxAge: 60 * 60 * 24 * 365 * 10 }),
    });

    cookieStore.set("inSession", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
