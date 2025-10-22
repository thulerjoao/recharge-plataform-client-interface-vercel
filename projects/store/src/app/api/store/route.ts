// read-only route: fetches product packages with tag-based caching
import { apiUrl } from "@4miga/services/connectionAPI/url";
import { StoreType } from "types/storeType";
import { storeId } from "utils/apiUrl";

export const revalidate = 86400; // Revalidate every day

export async function GET() {
  try {
    const res = await fetch(`${apiUrl}/store/${storeId}`, {
      next: { revalidate, tags: ["store"] },
    });

    if (!res.ok) {
      return Response.json([], {
        status: 200,
        headers: { "Cache-Tag": "store" },
      });
    }

    const store: StoreType = await res.json();
    return Response.json(store, {
      status: 200,
      headers: { "Cache-Tag": "store" },
    });
  } catch (error: any) {
    return Response.json([], {
      status: 200,
      headers: { "Cache-Tag": "store" },
    });
  }
}
