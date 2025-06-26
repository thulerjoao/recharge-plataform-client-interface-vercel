import { fetchProducts } from "lib/api";
import { ProductType } from "types/productTypes";
import { ProductsProvider } from "./ProductsProvider";
import React from "react";
import { MockedProductsList } from "mocked/mockedApi";

const ProductsProviderWrapper = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // const products: ProductType[] = await fetchProducts();
  const products = MockedProductsList;

  return (
    <ProductsProvider initialProducts={products}>{children}</ProductsProvider>
  );
};

export default ProductsProviderWrapper;
