/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { connectionAPIGet } from "@4miga/services/connectionAPI/connection";
import { createContext, ReactNode, useContext, useState } from "react";
import { ProductType } from "types/productTypes";
import { apiUrl } from "utils/apiUrl";

interface ProductsProviderProps {
  children: ReactNode;
}

interface PackagesProviderData {
  products: ProductType[];
  productPackages: ProductType;
  setProducts: (products: ProductType[]) => void;
  fetchProducts: (storeId: string) => void;
  setProductPackages: (products: ProductType) => void;
}

const ProductsContext = createContext<PackagesProviderData>(
  {} as PackagesProviderData,
);

export const ProductsProvider = ({ children }: ProductsProviderProps) => {
  const [productPackages, setProductPackages] = useState<ProductType>();
  const [products, setProducts] = useState<ProductType[]>();

  const fetchProducts = async (storeId: string) => {
    const products = await connectionAPIGet<ProductType[]>(
      `/product/packages/?storeId=${storeId}`,
      apiUrl,
    );
    setProducts(products);
    setProductPackages(
      products.find((product) => product.id === productPackages?.id),
    );
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        productPackages,
        setProducts,
        setProductPackages,
        fetchProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);
