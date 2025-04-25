import { ReactNode } from "react";
import { AuthProvider } from "./auth";

import { OrdersProvider } from "./orders";
import ProductsProviderWrapper from "./products/ProductsProviderWrapper";

interface ProviderProps {
  children: ReactNode;
}

const Providers = ({ children }: ProviderProps) => {
  return (
    <ProductsProviderWrapper>
      <OrdersProvider>
        <AuthProvider>{children}</AuthProvider>
      </OrdersProvider>
    </ProductsProviderWrapper>
  );
};

export default Providers;
