import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { refreshToken, rememberMe } = await req.json();

    if (!refreshToken) {
      return NextResponse.json(
        { error: "Missing refreshToken" },
        { status: 400 },
      );
    }

    if (rememberMe === undefined || rememberMe === null) {
      return NextResponse.json(
        { error: "Missing rememberMe" },
        { status: 400 },
      );
    }

    const cookieStore = cookies();

    cookieStore.set("refreshToken", refreshToken, {
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

    cookieStore.set("rememberMe", rememberMe, {
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
