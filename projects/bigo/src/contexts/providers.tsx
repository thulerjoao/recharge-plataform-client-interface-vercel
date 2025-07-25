import { ReactNode } from "react";
// import { AuthProvider } from "./auth";
import { OrdersProvider } from "./orders";
import ProductsProviderWrapper from "./products/ProductsProviderWrapper";
import { AuthProvider } from "./auth";

interface ProviderProps {
  children: ReactNode;
}

const Providers = ({ children }: ProviderProps) => {
  return (
    <AuthProvider>
      <OrdersProvider>
        <ProductsProviderWrapper>{children}</ProductsProviderWrapper>
      </OrdersProvider>
    </AuthProvider>
  );
};

export default Providers;
