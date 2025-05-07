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
    console.log("rememberMe", rememberMe);

    cookieStore.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      ...(rememberMe && { maxAge: 60 * 60 * 24 * 365 * 10 }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
