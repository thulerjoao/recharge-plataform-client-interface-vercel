/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import {
  connectionAPIGet,
  connectionAPIPost,
} from "@4miga/services/connectionAPI/connection";
import axios from "axios";
import { useRouter } from "next/navigation";
import { LoginSchema } from "public/components/login/common/login/schema";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { UserType } from "types/globalTypes";
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
  login: (param: LoginSchema) => void;
  logout: () => void;
  user: UserType;
}

const AuthContext = createContext<AuthProviderData>({} as AuthProviderData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const route = useRouter();
  const [logged, setLogged] = useState<boolean>(false);

  const [user, setUser] = useState<UserType>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("/api/token", {
          withCredentials: true,
        });
        const token = response.data?.token;
        if (!token) throw new Error("Login expirado");
        await connectionAPIGet<{ user: UserType }>(`/auth`, apiUrl).then(
          (res) => {
            setUser(res.user);
            setLogged(true);
            axios
              .post("/api/login", {
                token: token,
                rememberMe: true,
              })
              .then(() => route.replace("/home"))
              .catch();
          },
        );
      } catch {
        return;
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
    }>("/auth", body, apiUrl).catch((err) => {
      throw new Error("Usuário ou senha inválidos");
    });

    const { token, user } = loginResponse;

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, rememberMe: data.rememberMe }),
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
