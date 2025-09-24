import { ReactNode } from "react";
import { AuthProvider } from "./auth";

import { InfluencersProvider } from "./influencers";
import { OrdersProvider } from "./orders";
import ProductsProviderWrapper from "./products/ProductsProviderWrapper";
import { CouponsProvider } from "./coupon";
import { PackagesProvider } from "./packages";

interface ProviderProps {
  children: ReactNode;
}

const Providers = ({ children }: ProviderProps) => {
  return (
    <ProductsProviderWrapper>
      <AuthProvider>
        <OrdersProvider>
          <InfluencersProvider>
            <PackagesProvider>
              <CouponsProvider>{children}</CouponsProvider>
            </PackagesProvider>
          </InfluencersProvider>
        </OrdersProvider>
      </AuthProvider>
    </ProductsProviderWrapper>
  );
};

export default Providers;
