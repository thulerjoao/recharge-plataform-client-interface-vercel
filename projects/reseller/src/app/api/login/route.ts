import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { token, rememberMe } = await req.json();

    if (!token) {
      return NextResponse.json(
        { error: "Missing token or user" },
        { status: 400 },
      );
    }

    const cookieStore = cookies();

    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      ...(rememberMe && { maxAge: 60 * 60 * 24 * 365 * 10 }),
    });

    cookieStore.set("logged", "true", {
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
