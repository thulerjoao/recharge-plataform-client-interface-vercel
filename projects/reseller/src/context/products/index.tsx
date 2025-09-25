/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { connectionAPIGet } from "@4miga/services/connectionAPI/connection";
import { useAuth } from "context/auth";
import { createContext, ReactNode, useContext, useState } from "react";
import { PackageType, ProductType } from "types/productTypes";
import { apiUrl } from "utils/apiUrl";

interface ProductsProviderProps {
  children: ReactNode;
}

interface PackagesProviderData {
  products: ProductType[];
  packages: PackageType[];
  productPackages: ProductType;
  setProducts: (products: ProductType[]) => void;
  fetchProducts: (storeId: string) => void;
  setPackages: (packages: PackageType[]) => void;
  setProductPackages: (products: ProductType) => void;
}

const ProductsContext = createContext<PackagesProviderData>(
  {} as PackagesProviderData,
);

export const ProductsProvider = ({ children }: ProductsProviderProps) => {
  const [packages, setPackages] = useState<PackageType[]>();
  const [productPackages, setProductPackages] = useState<ProductType>();
  const [products, setProducts] = useState<ProductType[]>();

  const fetchProducts = async (storeId: string) => {
    const products = await connectionAPIGet<ProductType[]>(
      `/product/packages/?storeId=${storeId}`,
      apiUrl,
    );
    setProducts(products);
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        packages,
        productPackages,
        setProducts,
        fetchProducts,
        setPackages,
        setProductPackages,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);
