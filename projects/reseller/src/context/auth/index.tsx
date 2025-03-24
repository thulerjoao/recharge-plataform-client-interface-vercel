/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { connectionAPIPost } from "@4miga/services/connectionAPI/connection";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { LoginResponse } from "types/loginTypes";
import { UserType } from "types/userTypes";

import { apiUrl } from "utils/apiUrl";

interface AuthProviderProps {
  children: ReactNode;
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
  const [lastUpdated, setLastUpdated] = useState(Date.now());
  const [expiresIn, setExpiresIn] = useState<number>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("/api/token", {
          withCredentials: true,
        });
        const refreshToken = response.data?.refreshToken;
        if (!refreshToken) {
          await axios.delete("/api/logout", {
            withCredentials: true,
          });
          return;
        }
        await connectionAPIPost<LoginResponse>(
          `/customer/refresh-token`,
          { refreshToken },
          apiUrl,
        ).then(async (res) => {
          const rememberMe = true;
          const response = await login(res, rememberMe);
          if (response) route.push("/home");
        });
      } catch {
        await axios.delete("/api/logout", {
          withCredentials: true,
        });
        return;
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    if (!expiresIn) return;

    const updateToken = async () => {
      try {
        const response = await axios.get("/api/token", {
          withCredentials: true,
        });

        const refreshToken = response.data?.refreshToken;
        const rememberMe = response.data?.rememberMe;
        if (!refreshToken) {
          await axios.delete("/api/logout", {
            withCredentials: true,
          });
          throw new Error("Token expirado");
        }

        const refreshResponse = await connectionAPIPost<LoginResponse>(
          `/customer/refresh-token`,
          { refreshToken },
          apiUrl,
        );

        const newAccessToken = refreshResponse.access.accessToken;
        const newRefreshToken = refreshResponse.access.refreshToken;
        const newExpiresIn = refreshResponse.access.expiresIn;

        setExpiresIn(newExpiresIn);

        await axios.post(
          "/api/login",
          {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
            expiresIn: newExpiresIn,
            rememberMe: rememberMe,
          },
          { withCredentials: true },
        );
        setLastUpdated(Date.now());
      } catch (error) {
        console.error("Erro ao atualizar token:", error);
      }
    };

    const timeout = setTimeout(updateToken, expiresIn * 1000 * 0.98);
    return () => clearTimeout(timeout);
  }, [lastUpdated, expiresIn]);

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
          expiresIn,
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
    console.log("aquiii");
    try {
      await fetch("/api/logout", { method: "DELETE" });
      await new Promise((resolve) => setTimeout(resolve, 100));
      const response = await axios.get("/api/token", { withCredentials: true });
      console.log(response);
      if (response.data?.accessToken) {
        await fetch("/api/logout", { method: "DELETE" });
      } else {
        setLogged(false);
        setExpiresIn(null);
        setUser(null);
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
