/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import { PackageType, ProductType } from "types/productTypes";

interface PackagesProviderProps {
  children: ReactNode;
}

interface PackagesProviderData {
  packages: PackageType[];
  productPackages: ProductType;
  setPackages: (packages: PackageType[]) => void;
  setProductPackages: (products: ProductType) => void;
}

const PackagesContext = createContext<PackagesProviderData>(
  {} as PackagesProviderData,
);

export const PackagesProvider = ({ children }: PackagesProviderProps) => {
  const [packages, setPackages] = useState<PackageType[]>();
  const [productPackages, setProductPackages] = useState<ProductType>();

  return (
    <PackagesContext.Provider
      value={{
        packages,
        productPackages,
        setPackages,
        setProductPackages,
      }}
    >
      {children}
    </PackagesContext.Provider>
  );
};

export const usePackages = () => useContext(PackagesContext);
