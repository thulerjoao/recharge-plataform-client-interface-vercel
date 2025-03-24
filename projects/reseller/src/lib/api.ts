import { headers } from "next/headers";

export async function fetchProducts() {
  const host = headers().get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const baseUrl = `${protocol}://${host}`;

  const res = await fetch(`${baseUrl}/api/product`);

  if (!res.ok) {
    throw new Error("Erro ao buscar produtos");
  }

  return res.json();
}
