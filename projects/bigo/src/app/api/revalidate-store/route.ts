import { revalidateTag } from "next/cache";

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    const expectedToken = process.env.REVALIDATE_TOKEN;

    if (expectedToken) {
      const provided = authHeader?.replace("Bearer ", "");
      if (!provided || provided !== expectedToken) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    const body = await request.json();
    console.log("📬 Revalidating store cache:", body);

    revalidateTag("store");

    return Response.json({
      revalidated: true,
      tag: "store",
      receivedData: body,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error revalidating store tag:", error);
    return Response.json(
      { error: "Error revalidating store" },
      { status: 500 },
    );
  }
}
