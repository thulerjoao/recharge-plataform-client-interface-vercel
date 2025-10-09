import { fetchProducts } from "lib/api";
import { ProductType } from "types/productTypes";
import { ProductsProvider } from "./ProductsProvider";
import React from "react";

const ProductsProviderWrapper = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const product: ProductType = await fetchProducts();

  return (
    <ProductsProvider initialProduct={product}>{children}</ProductsProvider>
  );
};

export default ProductsProviderWrapper;
