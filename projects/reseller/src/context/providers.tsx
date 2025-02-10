import { ReactNode } from "react";
import { AuthProvider } from "./auth";
import { DeviceProvider } from "./deviceContext";

interface ProviderProps {
  children: ReactNode;
}

const Providers = ({ children }: ProviderProps) => {
  return (
    <DeviceProvider>
      <AuthProvider>{children}</AuthProvider>
    </DeviceProvider>
  );
};

export default Providers;
