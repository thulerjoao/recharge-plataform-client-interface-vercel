import { ProductType } from "types/productTypes";
import { apiUrl } from "utils/apiUrl";

export async function GET() {
  const getUrl = async () => {
    try {
      const response = await axios.get("/api/apiurl", {
        withCredentials: true,
      });
      return response.data?.apiUrl ?? null;
    } catch {
      return null;
    }
  };

  const cookiesApiUrl = await getUrl();
  const chosenUrl = cookiesApiUrl ? `https://${cookiesApiUrl}` : apiUrl;

  try {
    const res = await fetch(`${chosenUrl}/product`);
    if (!res.ok) {
      console.warn(`API externa respondeu com status ${res.status}`);
      return Response.json([], {
        status: 200,
        headers: {
          "Cache-Control": "no-store",
        },
      });
    }

    const products: ProductType[] = await res.json();

    if (!products || products.length === 0) {
      console.warn("Lista de produtos vazia recebida.");
      return Response.json([], {
        status: 200,
        headers: {
          "Cache-Control": "no-store",
        },
      });
    }

    return Response.json(products, {
      status: 200,
      headers: {
        "Cache-Control": `s-maxage=86400, stale-while-revalidate=59`,
      },
    });
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return Response.json([], {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
      },
    });
  }
}
