"use client";

import React, { createContext, useContext, useState } from "react";
import { ProductType } from "types/productTypes";

const ProductsContext = createContext<ProductType[] | null>(null);

export const ProductsProvider = ({
  children,
  initialProducts,
}: {
  children: React.ReactNode;
  initialProducts: ProductType[];
}) => {
  const [products, setProducts] = useState<ProductType[] | null>(
    initialProducts,
  );

  return (
    <ProductsContext.Provider value={products}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);
