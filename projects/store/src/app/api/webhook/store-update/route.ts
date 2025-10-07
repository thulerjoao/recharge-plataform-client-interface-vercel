import { NextRequest } from "next/server";

interface StoreUpdateWebhook {
  storeId: string;
  action: "created" | "updated" | "deleted";
  timestamp: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: StoreUpdateWebhook = await request.json();
    const { storeId, action, timestamp } = body;

    console.log(`Store webhook received: ${storeId} ${action} at ${timestamp}`);

    // Call the product route POST method to invalidate cache
    const response = await fetch(`${request.nextUrl.origin}/api/product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        webhook: true,
        storeId,
        action,
        timestamp,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to invalidate cache: ${response.statusText}`);
    }

    const result = await response.json();
    console.log(`Cache invalidated via POST /api/product:`, result);

    return Response.json(
      {
        success: true,
        message:
          "Products cache invalidated via POST /api/product (store changes)",
        data: {
          storeId,
          action,
          timestamp,
          cacheInvalidated: true,
          method: "POST /api/product",
          result,
        },
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Error processing store webhook:", error?.message || error);

    return Response.json(
      {
        success: false,
        error: "Failed to process store webhook",
        details: error?.message || "Unknown error",
      },
      { status: 500 },
    );
  }
}
