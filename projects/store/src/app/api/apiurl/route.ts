import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     const { apiUrl } = await req.json();

//     if (!apiUrl) {
//       return NextResponse.json({ error: "Missing apiUrl" }, { status: 400 });
//     }

//     const response = NextResponse.json({ success: true });

//     response.cookies.set("apiUrl", apiUrl, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//       path: "/",
//     });

//     return response;
//   } catch (error) {
//     return NextResponse.json({ error: "Invalid request" }, { status: 400 });
//   }
// }

export async function GET() {
  const cookieStore = cookies();
  const apiUrl = cookieStore.get("apiUrl")?.value;
  console.log(">>> COOKIE apiUrl =", apiUrl);
  return NextResponse.json({
    apiUrl,
  });
}
