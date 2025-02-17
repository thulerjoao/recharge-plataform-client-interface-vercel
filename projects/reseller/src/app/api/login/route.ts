import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { token, user } = await req.json();

    if (!token || !user) {
      return NextResponse.json(
        { error: "Missing token or user" },
        { status: 400 },
      );
    }

    console.log({ token, user });

    const cookieStore = cookies();

    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    cookieStore.set("user", JSON.stringify(user), {
      httpOnly: false, // O usuário pode precisar desse dado no client
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
