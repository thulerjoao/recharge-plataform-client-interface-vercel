import { ReactNode } from "react";
import { DeviceProvider } from "./deviceContext";
import { AuthProvider } from "./authContext";

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
