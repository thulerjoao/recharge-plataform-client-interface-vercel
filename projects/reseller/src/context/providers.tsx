import { ReactNode } from "react";
import { AuthProvider } from "./auth";

import { CouponsProvider } from "./coupon";
import { InfluencersProvider } from "./influencers";
import { OrdersProvider } from "./orders";
import { ProductsProvider } from "./products";

interface ProviderProps {
  children: ReactNode;
}

const Providers = ({ children }: ProviderProps) => {
  return (
    <ProductsProvider>
      <AuthProvider>
        <OrdersProvider>
          <InfluencersProvider>
            <CouponsProvider>{children}</CouponsProvider>
          </InfluencersProvider>
        </OrdersProvider>
      </AuthProvider>
    </ProductsProvider>
  );
};

export default Providers;
