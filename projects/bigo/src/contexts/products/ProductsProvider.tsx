"use client";

import React, { createContext, useContext, useState } from "react";
import { ProductType } from "types/productTypes";

interface ProductsContextType {
  product: ProductType | null;
  setProduct: (product: ProductType) => void;
}

const ProductsContext = createContext<ProductsContextType | null>(null);

export const ProductsProvider = ({
  children,
  initialProduct,
}: {
  children: React.ReactNode;
  initialProduct: ProductType;
}) => {
  const [product, setProduct] = useState<ProductType | null>(initialProduct);

  return (
    <ProductsContext.Provider value={{ product, setProduct }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }

  return context;
};
