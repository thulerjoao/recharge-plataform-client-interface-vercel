// read-only route: fetches product packages with tag-based caching
import { apiUrl } from "@4miga/services/connectionAPI/url";
import { ProductType } from "types/productTypes";
import { storeId } from "utils/apiUrl";

export const revalidate = 60; // Revalidate every minute

export async function GET() {
  try {
    const res = await fetch(`${apiUrl}/product/packages?storeId=${storeId}`, {
      next: { revalidate, tags: ["products"] },
    });

    if (!res.ok) {
      return Response.json([], {
        status: 200,
        headers: { "Cache-Tag": "products" },
      });
    }

    const data = await res.json();
    const products: ProductType[] = Array.isArray(data) ? data : [data];
    return Response.json(products, {
      status: 200,
      headers: { "Cache-Tag": "products" },
    });
  } catch (error: any) {
    return Response.json([], {
      status: 200,
      headers: { "Cache-Tag": "products" },
    });
  }
}
