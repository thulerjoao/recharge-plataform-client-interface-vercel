import { revalidatePath } from "next/cache";

export async function POST() {
  try {
    // Revalidate products route
    revalidatePath("/api/product");

    return Response.json({
      revalidated: true,
      message: "Products cache revalidated successfully",
    });
  } catch (error) {
    console.error("Error revalidating products:", error);
    return Response.json(
      { error: "Error revalidating products" },
      { status: 500 },
    );
  }
}
