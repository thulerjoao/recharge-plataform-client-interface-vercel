import { revalidateTag } from "next/cache";

export async function POST(request: Request) {
  try {
    // Optional: simple bearer token auth for webhook calls
    const authHeader = request.headers.get("authorization");
    const expectedToken = process.env.REVALIDATE_TOKEN;
    if (expectedToken) {
      const provided = authHeader?.replace("Bearer ", "");
      if (!provided || provided !== expectedToken) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    revalidateTag("products");

    return Response.json({
      revalidated: true,
      tag: "products",
    });
  } catch (error) {
    console.error("Error revalidating products tag:", error);
    return Response.json(
      { error: "Error revalidating products" },
      { status: 500 },
    );
  }
}
