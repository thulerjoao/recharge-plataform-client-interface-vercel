import { ReactNode } from "react";
import { AuthProvider } from "./auth";

import { OrdersProvider } from "./orders";

interface ProviderProps {
  children: ReactNode;
}

const Providers = ({ children }: ProviderProps) => {
  return (
    <OrdersProvider>
      <AuthProvider>{children}</AuthProvider>
    </OrdersProvider>
  );
};

export default Providers;
