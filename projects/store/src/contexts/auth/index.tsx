"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface AuthContextProps {
  logged: boolean;
  handleLogin: () => void;
  handleLogout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [logged, setLogged] = useState<boolean>(false);

  const handleLogin = () => {
    setLogged(true);
  };

  const handleLogout = () => {
    setLogged(false);
  };

  return (
    <AuthContext.Provider
      value={{
        logged,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
