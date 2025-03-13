/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { connectionAPIPost } from "@4miga/services/connectionAPI/connection";

import { useRouter } from "next/navigation";
import { createContext, ReactNode, useContext, useState } from "react";

import axios from "axios";
import { LoginSchema } from "public/components/loginModal/common/login/schema";

import { LoginResponse } from "types/loginTypes";
import { UserType } from "types/userTypes";
import { apiUrl } from "utils/apiUrl";
import { date } from "zod";

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
  login: (param: LoginSchema) => Promise<boolean>;
  logout: () => void;
  user: Partial<UserType>;
}

const AuthContext = createContext<AuthProviderData>({} as AuthProviderData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const route = useRouter();
  const [logged, setLogged] = useState<boolean>(false);
  const [user, setUser] = useState<Partial<UserType>>(null);
  const [expiresIn, setExpiresIn] = useState<number>(null);

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     try {
  //       const response = await axios.get("/api/token", {
  //         withCredentials: true,
  //       });
  //       const token = response.data?.token;
  //       if (!token) throw new Error("Login expirado");
  //       await connectionAPIGet<{ user: UserType }>(`/auth`, apiUrl).then(
  //         (res) => {
  //           setUser(res.user);
  //           setLogged(true);
  //           axios.post("/api/login", {
  //             token: token,
  //             rememberMe: true,
  //           });
  //         },
  //       );
  //     } catch {
  //       return;
  //     }
  //   };
  //   checkAuth();
  // }, []);

  const login = async (data: loginParams) => {
    const body = {
      email: data.email,
      password: data.password,
    };
    const loginResponse = await connectionAPIPost<LoginResponse>(
      "/customer/login",
      body,
      apiUrl,
    ).catch((err) => {
      throw new Error("Usuário ou senha inválidos");
    });
    const accessToken = loginResponse.access.accessToken;
    const refreshToken = loginResponse.access.refreshToken;
    const expiresIn = loginResponse.access.expiresIn;
    const user: Partial<UserType> = {
      email: data.email,
      name: loginResponse.customer.name,
      phone: loginResponse.customer.phone,
      individualIdentification: {
        type: loginResponse.customer.individualIdentification.type,
        value: loginResponse.customer.individualIdentification.value,
      },
    };

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accessToken,
          refreshToken,
          rememberMe: data.rememberMe,
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
