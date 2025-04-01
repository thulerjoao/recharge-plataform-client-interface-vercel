"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
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

  useEffect(() => {
    if (!products) {
      // Se não tiver produtos, busca novamente
      // Pode incluir uma lógica de fallback, mas isso será tratado pelo Server Component
    }
  }, [products]);

  return (
    <ProductsContext.Provider value={products}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);
