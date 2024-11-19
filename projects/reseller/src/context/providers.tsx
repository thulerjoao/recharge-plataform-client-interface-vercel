import { ReactNode } from "react";

interface ProviderProps {
  children: ReactNode;
}

const Providers = ({ children }: ProviderProps) => {
  return children;
};

export default Providers;
