import { ReactNode } from "react";
import { AuthProvider } from "./auth";

import { ProductProvider } from "./product";

interface ProviderProps {
  children: ReactNode;
}

const Providers = ({ children }: ProviderProps) => {
  return (
    <AuthProvider>
      <ProductProvider>{children}</ProductProvider>
    </AuthProvider>
  );
};

export default Providers;
