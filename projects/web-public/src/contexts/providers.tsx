import { ReactNode } from "react";
import { AuthProvider } from "./auth";
import { DeviceProvider } from "./deviceContext";

interface ProviderProps {
  children: ReactNode;
}

const Providers = ({ children }: ProviderProps) => {
  return (
    <AuthProvider>
      <DeviceProvider>{children}</DeviceProvider>
    </AuthProvider>
  );
};

export default Providers;
