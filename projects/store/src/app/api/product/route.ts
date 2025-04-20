import { ProductType } from "types/productTypes";
import { apiUrl } from "utils/apiUrl";

export const revalidate = 86400;

export async function GET() {
  try {
    const res = await fetch(`${apiUrl}/product`, {
      next: { revalidate },
    });

    // Se a resposta foi recebida, mas não é 2xx
    if (!res.ok) {
      console.warn(`Falha na resposta da API externa: ${res.statusText}`);
      return Response.json([], { status: 200 });
    }

    const products: ProductType[] = await res.json();

    return Response.json(products, { status: 200 });
  } catch (error: any) {
    // Erros como ECONNREFUSED, URL inválida, timeout etc.
    console.error(
      "Erro de conexão com a API externa:",
      error?.message || error,
    );
    return Response.json([], { status: 200 });
  }
}

// import { ProductType } from "types/productTypes";
// import { apiUrl } from "utils/apiUrl";

// export const revalidate = 86400;

// export async function GET() {
//   try {
//     const res = await fetch(`${apiUrl}/product`, {
//       next: { revalidate },
//     });

//     if (!res.ok) {
//       return Response.json(
//         { error: "Erro ao buscar produtos" },
//         { status: 500 },
//       );
//     }

//     const products: ProductType[] = await res.json();

//     return Response.json(products, { status: 200 });
//   } catch (error) {
//     return Response.json({ error: "Erro interno" }, { status: 500 });
//   }
// }
