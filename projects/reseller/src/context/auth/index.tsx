/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { connectionAPIPost } from "@4miga/services/connectionAPI/connection";
import { usePathname, useRouter } from "next/navigation";
import { createContext, ReactNode, useContext, useState } from "react";
import { baseUrl } from "service/baseUrl";
import { UserType } from "types/globalTypes";

interface AuthProviderProps {
  children: ReactNode;
}

interface loginParams {
  email: string;
  password: string;
  // isChecked: Boolean;
}

interface AuthProviderData {
  logged: boolean;
  login: (param: loginParams) => void;
  logout: () => void;
  userStorage: UserType;
}

const AuthContext = createContext<AuthProviderData>({} as AuthProviderData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const currentPath = usePathname();
  const route = useRouter();
  const [logged, setLogged] = useState<boolean>(false);
  const [userStorage, setUserStorage] = useState<UserType>({
    id: "",
    name: "",
    email: "",
    password: "",
  });

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     try {
  //       const res = await fetch("/api/auth/token/route");
  //       if (res.ok) {
  //         const data = await res.json();
  //         console.log(data);
  //         login(data);
  //       }
  //     } catch (error) {
  //       logout();
  //     }
  //   };
  //   checkAuth();
  // }, []);

  const login = async (body: loginParams) => {
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

    try {
      const res = await fetch("/api/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, user }),
        credentials: "include",
      });
      console.log(res);
      if (!res.ok) throw new Error("Falha ao realizar login");
      setLogged(true);
      const data = await res.json();
      user && setUserStorage(data.user);
      console.log(data.user);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setLogged(false);
    route.replace("/");
  };

  return (
    <AuthContext.Provider value={{ logged, login, logout, userStorage }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
