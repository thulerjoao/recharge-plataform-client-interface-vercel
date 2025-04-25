import { fetchProducts } from "lib/api";
import React from "react";
import { ProductType } from "types/productTypes";
import { ProductsProvider } from "./ProductsProvider";

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
