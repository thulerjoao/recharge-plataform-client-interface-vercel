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
    console.log("📬 Revalidating products cache:", body);

    revalidateTag("products");

    return Response.json({
      revalidated: true,
      tag: "products",
      receivedData: body, // Útil para debug
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error revalidating products tag:", error);
    return Response.json(
      { error: "Error revalidating products" },
      { status: 500 },
    );
  }
}
