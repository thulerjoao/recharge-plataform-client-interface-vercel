import { ReactNode } from "react";
import { AuthProvider } from "./auth";
import { DeviceProvider } from "./deviceContext";
import { OrdersProvider } from "./orders";

interface ProviderProps {
  children: ReactNode;
}

const Providers = ({ children }: ProviderProps) => {
  return (
    <DeviceProvider>
      <OrdersProvider>
        <AuthProvider>{children}</AuthProvider>
      </OrdersProvider>
    </DeviceProvider>
  );
};

export default Providers;
