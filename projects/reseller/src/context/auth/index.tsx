/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { connectionAPIPost } from "@4miga/services/connectionAPI/connection";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { baseUrl } from "service/baseUrl";
import { UserType } from "types/globalTypes";

interface AuthProviderProps {
  children: ReactNode;
}

interface loginParams {
  email: string;
  password: string;
  isChecked: Boolean;
}

interface AuthProviderData {
  logged: boolean;
  login: (param: loginParams) => void;
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
      try {
        const res = await fetch("/api/auth");
        const data = await res.json();
        if (data.token) {
          setLogged(true);
          route.replace("/home");
        }
      } catch (error) {
        logout();
      }
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
    }>("/auth", body, baseUrl)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw new Error("Acesso negado");
      });

    const { token, user } = loginResponse;

    if (data.isChecked) {
      try {
        const res = await fetch("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, user }),
          credentials: "include",
        });
        if (!res.ok) throw new Error("Falha ao realizar login");
        setLogged(true);
        const data = await res.json();
        user && setUser(data.user);
        route.push("/home");
      } catch (error) {
        return false;
      }
    } else {
      return;
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
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ logged, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
