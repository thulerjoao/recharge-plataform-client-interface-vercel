import SecondaryLayout from "layouts/secondaryLayout/secondaryLayout";
import { fetchProducts } from "lib/api";
import React from "react";
import { ProductType } from "types/productTypes";
import { formatString } from "utils/formatString";
// import { getCurrentPath } from "utils/getPath";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = async ({ children }) => {
  const products = await fetchProducts();

  return <SecondaryLayout products={products}>{children}</SecondaryLayout>;
};

export default Layout;
