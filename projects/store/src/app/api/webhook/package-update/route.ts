import { NextRequest } from "next/server";

interface PackageUpdateWebhook {
  packageId: string;
  storeId: string;
  action: "created" | "updated" | "deleted";
  timestamp: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: PackageUpdateWebhook = await request.json();
    const { packageId, storeId, action, timestamp } = body;

    console.log(
      `Package webhook received: ${packageId} ${action} for store ${storeId} at ${timestamp}`,
    );

    // Call the product route POST method to invalidate cache
    const response = await fetch(`${request.nextUrl.origin}/api/product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        webhook: true,
        packageId,
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
          "Products cache invalidated via POST /api/product (packages included)",
        data: {
          packageId,
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
    console.error("Error processing package webhook:", error?.message || error);

    return Response.json(
      {
        success: false,
        error: "Failed to process package webhook",
        details: error?.message || "Unknown error",
      },
      { status: 500 },
    );
  }
}
