/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { connectionAPIPost } from "@4miga/services/connectionAPI/connection";

import { useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import axios from "axios";

import { LoginResponse } from "types/loginTypes";
import { UserType } from "types/userTypes";
import { apiUrl } from "utils/apiUrl";

interface AuthProviderProps {
  children: ReactNode;
}

interface loginParams {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface AuthProviderData {
  logged: boolean;
  login: (data: LoginResponse, rememberMe: boolean) => Promise<boolean>;
  logout: () => void;
  user: Partial<UserType>;
}

const AuthContext = createContext<AuthProviderData>({} as AuthProviderData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const route = useRouter();
  const [logged, setLogged] = useState<boolean>(false);
  const [user, setUser] = useState<Partial<UserType>>(null);
  const [expiresIn, setExpiresIn] = useState<number>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("/api/token", {
          withCredentials: true,
        });
        const refreshToken = response.data?.refreshToken;
        console.log(refreshToken);
        if (!refreshToken) throw new Error("Login expirado");
        await connectionAPIPost<LoginResponse>(
          `/customer/refresh-token`,
          { refreshToken },
          apiUrl,
        ).then((res) => {
          const rememberMe = true;
          login(res, rememberMe);
        });
      } catch {
        return;
      }
    };
    checkAuth();
  }, []);

  const login = async (data: LoginResponse, rememberMe: boolean) => {
    const accessToken = data.access.accessToken;
    const refreshToken = data.access.refreshToken;
    const expiresIn = data.access.expiresIn;
    const user: Partial<UserType> = {
      email: data.customer.email,
      name: data.customer.name,
      phone: data.customer.phone,
      individualIdentification: {
        type: data.customer.individualIdentification.type,
        value: data.customer.individualIdentification.value,
      },
    };

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accessToken,
          refreshToken,
          rememberMe: rememberMe,
        }),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Erro ao fazer login");
      setLogged(true);
      setUser(user);
      setExpiresIn(expiresIn);
      return true;
    } catch (error) {
      return false;
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/logout", { method: "DELETE" });
      await new Promise((resolve) => setTimeout(resolve, 100));
      const response = await axios.get("/api/token", { withCredentials: true });
      if (response.data?.token) {
        await fetch("/api/logout", { method: "DELETE" });
      } else {
        setLogged(false);
        route.replace("/");
      }
    } catch (error) {
      return;
    }
  };

  return (
    <AuthContext.Provider value={{ logged, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
