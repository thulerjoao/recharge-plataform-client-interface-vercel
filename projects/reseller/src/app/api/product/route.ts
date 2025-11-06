import { apiUrl } from "@4miga/services/connectionAPI/url";
import { ProductType } from "types/productTypes";

export const revalidate = 60;

export async function GET() {
  try {
    const res = await fetch(`${apiUrl}/product`, {
      next: { revalidate, tags: ["products"] },
    });
    if (!res.ok) {
      console.warn(`Falha na resposta da API externa: ${res.statusText}`);
      return Response.json([], { status: 200 });
    }

    const products: ProductType[] = await res.json();

    return Response.json(products, { status: 200 });
  } catch (error: any) {
    console.error(
      "Erro de conexão com a API externa:",
      error?.message || error,
    );
    return Response.json([], { status: 200 });
  }
}
