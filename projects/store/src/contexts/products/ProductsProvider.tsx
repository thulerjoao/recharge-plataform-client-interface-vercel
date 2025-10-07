"use client";

import React, { createContext, useContext, useState } from "react";
import { ProductType } from "types/productTypes";

interface ProductsContextType {
  products: ProductType[] | null;
  setProducts: (products: ProductType[]) => void;
}

const ProductsContext = createContext<ProductsContextType | null>(null);

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

  console.log("productsContext", products);

  return (
    <ProductsContext.Provider value={{ products, setProducts }}>
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
