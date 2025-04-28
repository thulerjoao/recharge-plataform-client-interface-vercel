import { fetchProducts } from "lib/api";
import { ProductType } from "types/productTypes";
import { ProductsProvider } from "./ProductsProvider";
import React from "react";

const ProductsProviderWrapper = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const products: ProductType[] = await fetchProducts();

  return (
    <ProductsProvider initialProducts={products}>{children}</ProductsProvider>
  );
};

export default ProductsProviderWrapper;
