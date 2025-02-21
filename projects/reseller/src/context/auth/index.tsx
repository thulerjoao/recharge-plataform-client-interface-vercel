/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import {
  connectionAPIGet,
  connectionAPIPost,
} from "@4miga/services/connectionAPI/connection";
import { usePathname, useRouter } from "next/navigation";
import { LoginSchema } from "public/components/login/common/login/schema";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { baseUrl } from "service/baseUrl";
import { UserType } from "types/globalTypes";
import { apiUrl } from "utils/apiUrl";

interface AuthProviderProps {
  children: ReactNode;
}

interface loginParams {
  email: string;
  password: string;
  isChecked: boolean;
}

interface AuthProviderData {
  logged: boolean;
  login: (param: LoginSchema) => void;
  logout: () => void;
  user: UserType;
}

const AuthContext = createContext<AuthProviderData>({} as AuthProviderData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const currentPath = usePathname();
  const route = useRouter();
  const [logged, setLogged] = useState<boolean>(false);

  const [user, setUser] = useState<UserType>(null);

  useEffect(() => {
    const checkAuth = async () => {
      await connectionAPIGet<{ user: UserType }>(`/auth`, apiUrl).then(
        (res) => {
          setUser(res.user);
          setLogged(true);
          route.replace("/home");
        },
      );
    };
    checkAuth();
  }, []);

  const login = async (data: loginParams) => {
    const body = {
      email: data.email,
      password: data.password,
    };
    const loginResponse = await connectionAPIPost<{
      token: string;
      user: UserType;
    }>("/auth", body, baseUrl).catch((err) => {
      throw new Error("Usuário ou senha inválidos");
    });

    const { token, user } = loginResponse;

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, rememberMe: data.isChecked }),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Erro ao fazer login");
      setLogged(true);
      setUser(user);
      route.replace("/home");
    } catch (error) {
      return false;
    }
  };

  const logout = async () => {
    try {
      await fetch("api/logout", {
        method: "DELETE",
      });
      setLogged(false);
      route.replace("/");
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
