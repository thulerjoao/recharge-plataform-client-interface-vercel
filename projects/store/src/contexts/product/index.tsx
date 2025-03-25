"use client";

import React, { createContext, ReactNode, useContext, useState } from "react";
import { ProductType } from "types/productTypes";

interface ProductContextProps {
  currentProduct: ProductType;
  setCurrentProduct: React.Dispatch<React.SetStateAction<ProductType>>;
}

const ProductContext = createContext<ProductContextProps | undefined>(
  undefined,
);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [currentProduct, setCurrentProduct] = useState<ProductType>();

  return (
    <ProductContext.Provider
      value={{
        currentProduct,
        setCurrentProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = (): ProductContextProps => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};
