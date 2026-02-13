import { headers } from "next/headers";
import { ProductType } from "types/productTypes";
import { StoreType } from "types/storeType";

export async function fetchProducts(): Promise<ProductType[]> {
  const host = headers().get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const baseUrl = `${protocol}://${host}`;

  const res = await fetch(`${baseUrl}/api/product`);

  if (!res.ok) {
    throw new Error("Erro ao buscar produtos");
  }

  return res.json();
}

export async function fetchStore(): Promise<StoreType> {
  const host = headers().get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const baseUrl = `${protocol}://${host}`;

  const res = await fetch(`${baseUrl}/api/store`);

  if (!res.ok) {
    throw new Error("Erro ao buscar loja");
  }

  return res.json();
}
