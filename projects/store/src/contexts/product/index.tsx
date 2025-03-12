"use client";

import { connectionAPIGet } from "@4miga/services/connectionAPI/connection";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { ProductType } from "types/globalTypes";
import { apiUrl } from "utils/apiUrl";

interface ProductContextProps {
  products: ProductType[];
  currentProduct: ProductType;
  setCurrentProduct: React.Dispatch<React.SetStateAction<ProductType>>;
  updateProducts: () => void;
}

const ProductContext = createContext<ProductContextProps | undefined>(
  undefined,
);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [currentProduct, setCurrentProduct] = useState<ProductType>(null);

  const updateProducts = () => {
    connectionAPIGet<ProductType[]>("/product", apiUrl).then((res) => {
      setProducts(res);
    });
  };

  useEffect(() => {
    updateProducts();
  }, []);

  console.log(products);

  return (
    <ProductContext.Provider
      value={{
        products,
        updateProducts,
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
