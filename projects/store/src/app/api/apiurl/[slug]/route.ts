// /app/api/api-url/[slug]/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(
  _req: Request,
  { params }: { params: { slug: string } },
) {
  const { slug } = params;

  if (!slug) {
    return NextResponse.json({ error: "Slug ausente" }, { status: 400 });
  }

  const fullApiUrl = `${slug}`;

  cookies().set("apiUrl", fullApiUrl, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });

  return NextResponse.json({ success: true, apiUrl: fullApiUrl });
}
