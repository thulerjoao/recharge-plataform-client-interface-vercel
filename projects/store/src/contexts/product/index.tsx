"use client";

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { ProductType } from "types/globalTypes";

interface ProductContextProps {
  products: ProductType[];
  currentProduct: ProductType;
  setCurrentProduct: React.Dispatch<React.SetStateAction<ProductType>>;
  // updateProducts: () => void;
}

const ProductContext = createContext<ProductContextProps | undefined>(
  undefined,
);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [currentProduct, setCurrentProduct] = useState<ProductType>();

  // const updateProducts = () => {
  //   connectionAPIGet<ProductType[]>("/product", apiUrl).then((res) => {
  //     setProducts(res);
  //   });
  // };

  // useEffect(() => {
  //   updateProducts();
  // }, []);

  useEffect(() => {
    async function fetchProdutos() {
      try {
        const res = await fetch("/api/product");
        if (!res.ok) throw new Error("Erro ao buscar produtos");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchProdutos();
  }, []);

  console.log(products);

  return (
    <ProductContext.Provider
      value={{
        products,
        // updateProducts,
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
