// read-only route: fetches product packages with tag-based caching
import { apiUrl } from "@4miga/services/connectionAPI/url";
import { ProductType } from "types/productTypes";
import { storeId } from "utils/apiUrl";

export const revalidate = 10; // 1 hours

export async function GET() {
  try {
    const res = await fetch(`${apiUrl}/product/packages?storeid=${storeId}`, {
      next: { revalidate, tags: ["products"] },
    });

    if (!res.ok) {
      return Response.json([], {
        status: 200,
        headers: { "Cache-Tag": "products" },
      });
    }

    const products: ProductType[] = await res.json();
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
