// read-only route: fetches product packages with tag-based caching
import { apiUrl } from "@4miga/services/connectionAPI/url";
import { StoreType } from "types/storeType";
import { storeId } from "utils/apiUrl";

export const revalidate = 60; // Revalidate every 2 minutes

export async function GET() {
  try {
    const res = await fetch(`${apiUrl}/store/${storeId}`, {
      next: { revalidate, tags: ["store"] },
    });

    if (!res.ok) {
      return Response.json([], {
        status: 200,
        headers: {
          "Cache-Tag": "store",
          "Cache-Control": "no-store, must-revalidate",
        },
      });
    }

    const store: StoreType = await res.json();
    return Response.json(store, {
      status: 200,
      headers: {
        "Cache-Tag": "store",
        "Cache-Control": "no-store, must-revalidate",
      },
    });
  } catch (error: any) {
    return Response.json([], {
      status: 200,
      headers: {
        "Cache-Tag": "store",
        "Cache-Control": "no-store, must-revalidate",
      },
    });
  }
}
