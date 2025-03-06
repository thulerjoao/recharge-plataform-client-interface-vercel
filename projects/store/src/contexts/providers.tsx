import { ReactNode } from "react";
import { AuthProvider } from "./auth";
import { DeviceProvider } from "./deviceContext";
import { ProductProvider } from "./product";

interface ProviderProps {
  children: ReactNode;
}

const Providers = ({ children }: ProviderProps) => {
  return (
    <AuthProvider>
      <DeviceProvider>
        <ProductProvider>{children}</ProductProvider>
      </DeviceProvider>
    </AuthProvider>
  );
};

export default Providers;
