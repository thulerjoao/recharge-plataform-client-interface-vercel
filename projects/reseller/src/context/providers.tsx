import { ReactNode } from "react";

import { DeviceProvider } from "./deviceContext";

interface ProviderProps {
  children: ReactNode;
}

const Providers = ({ children }: ProviderProps) => {
  return <DeviceProvider>{children}</DeviceProvider>;
};

export default Providers;
