import { ProductType } from "types/globalTypes";
import { apiUrl } from "utils/apiUrl";

export const revalidate = 86400;

export async function GET() {
  try {
    const res = await fetch(`${apiUrl}/product`, {
      next: { revalidate },
    });

    if (!res.ok) {
      return Response.json(
        { error: "Erro ao buscar produtos" },
        { status: 500 },
      );
    }

    const products: ProductType[] = await res.json();

    return Response.json(products, { status: 200 });
  } catch (error) {
    return Response.json({ error: "Erro interno" }, { status: 500 });
  }
}
