import { ReactNode } from "react";
import { AuthProvider } from "./auth";

import { InfluencersProvider } from "./influencers";
import { OrdersProvider } from "./orders";
import ProductsProviderWrapper from "./products/ProductsProviderWrapper";
import { CouponsProvider } from "./coupon";

interface ProviderProps {
  children: ReactNode;
}

const Providers = ({ children }: ProviderProps) => {
  return (
    <ProductsProviderWrapper>
      <AuthProvider>
        <OrdersProvider>
          <InfluencersProvider>
            <CouponsProvider>{children}</CouponsProvider>
          </InfluencersProvider>
        </OrdersProvider>
      </AuthProvider>
    </ProductsProviderWrapper>
  );
};

export default Providers;
