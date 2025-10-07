import { NextRequest } from "next/server";

interface ProductUpdateWebhook {
  productId: string;
  action: "created" | "updated" | "deleted";
  timestamp: string;
}

export async function POST(request: NextRequest) {
  try {
    console.log("=== PRODUCT WEBHOOK START ===");
    console.log("Request received at:", new Date().toISOString());
    console.log("Request URL:", request.url);
    console.log("Request method:", request.method);
    console.log(
      "Request headers:",
      Object.fromEntries(request.headers.entries()),
    );

    const body: ProductUpdateWebhook = await request.json();
    const { productId, action, timestamp } = body;

    console.log("Webhook body parsed:", {
      productId,
      action,
      timestamp,
      receivedAt: new Date().toISOString(),
    });

    console.log("Calling POST /api/product to invalidate cache...");

    // Call the product route POST method to invalidate cache
    const webhookUrl = `${request.nextUrl.origin}/api/product`;
    console.log("Webhook URL:", webhookUrl);

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        webhook: true,
        productId,
        action,
        timestamp,
      }),
    });

    console.log("POST /api/product response status:", response.status);
    console.log(
      "POST /api/product response headers:",
      Object.fromEntries(response.headers.entries()),
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("POST /api/product failed:", {
        status: response.status,
        statusText: response.statusText,
        errorText,
      });
      throw new Error(`Failed to invalidate cache: ${response.statusText}`);
    }

    const result = await response.json();
    console.log("POST /api/product response body:", result);
    console.log("Cache invalidated successfully via POST /api/product");

    console.log("=== PRODUCT WEBHOOK SUCCESS ===");

    return Response.json(
      {
        success: true,
        message: "Products cache invalidated via POST /api/product",
        data: {
          productId,
          action,
          timestamp,
          cacheInvalidated: true,
          method: "POST /api/product",
          result,
          webhookProcessedAt: new Date().toISOString(),
        },
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("=== PRODUCT WEBHOOK ERROR ===");
    console.error("Error processing webhook:", {
      message: error?.message,
      stack: error?.stack,
      timestamp: new Date().toISOString(),
    });

    return Response.json(
      {
        success: false,
        error: "Failed to process webhook",
        details: error?.message || "Unknown error",
        errorTimestamp: new Date().toISOString(),
      },
      { status: 500 },
    );
  }
}
