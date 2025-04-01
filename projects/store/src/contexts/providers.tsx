import { ReactNode } from "react";
import { AuthProvider } from "./auth";
import ProductsProviderWrapper from "./products/ProductsProviderWrapper";

interface ProviderProps {
  children: ReactNode;
}

const Providers = ({ children }: ProviderProps) => {
  return (
    <AuthProvider>
      <ProductsProviderWrapper>{children}</ProductsProviderWrapper>
    </AuthProvider>
  );
};

export default Providers;
