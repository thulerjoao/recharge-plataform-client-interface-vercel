import { ReactNode } from "react";
import { AuthProvider } from "./auth";

import { OrdersProvider } from "./orders";
import ProductsProviderWrapper from "./products/ProductsProviderWrapper";
import { InfluencersProvider } from "./influencers";

interface ProviderProps {
  children: ReactNode;
}

const Providers = ({ children }: ProviderProps) => {
  return (
    <ProductsProviderWrapper>
      <AuthProvider>
        <OrdersProvider>
          <InfluencersProvider>{children}</InfluencersProvider>
        </OrdersProvider>
      </AuthProvider>
    </ProductsProviderWrapper>
  );
};

export default Providers;
