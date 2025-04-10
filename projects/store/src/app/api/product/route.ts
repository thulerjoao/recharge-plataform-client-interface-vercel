import { ProductType } from "types/productTypes";
import { apiUrl } from "utils/apiUrl";

export const revalidate = 86400;

export async function GET() {
  try {
    const res = await fetch(`${apiUrl}/product`, {
      next: { revalidate },
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
