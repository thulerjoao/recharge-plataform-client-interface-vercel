import { ReactNode } from "react";
import { AuthProvider } from "./auth";
import { OrdersProvider } from "./orders";
import ProductsProviderWrapper from "./products/ProductsProviderWrapper";
import StoreProviderWrapper from "./store/StoreProviderWrapper";

interface ProviderProps {
  children: ReactNode;
}

const Providers = ({ children }: ProviderProps) => {
  return (
    <AuthProvider>
      <OrdersProvider>
        <StoreProviderWrapper>
          <ProductsProviderWrapper>{children}</ProductsProviderWrapper>
        </StoreProviderWrapper>
      </OrdersProvider>
    </AuthProvider>
  );
};

export default Providers;
