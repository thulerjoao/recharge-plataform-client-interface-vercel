import { ReactNode } from "react";
import { AuthProvider } from "./auth";
import { CouponsProvider } from "./coupon";
import { CustomersProvider } from "./customers";
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
            <CustomersProvider>
              <CouponsProvider>{children}</CouponsProvider>
            </CustomersProvider>
          </InfluencersProvider>
        </OrdersProvider>
      </AuthProvider>
    </ProductsProvider>
  );
};

export default Providers;
