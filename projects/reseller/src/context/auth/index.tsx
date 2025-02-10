/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { connectionAPIGet } from "@4miga/services/connectionAPI/connection";
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
  token: string;
  user: UserType;
  isChecked: Boolean;
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

  const checkTokenExpiration = () => {
    const token = localStorage.getItem("token");
    token && sessionStorage.setItem("token", token);

    connectionAPIGet<{ data: UserType }>("/user/myself", baseUrl)
      .then((res) => {
        setUserStorage(res.data);
        setLogged(true);
        route.replace("/home");
      })
      .catch(() => {
        logout();
      });
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) checkTokenExpiration();
  }, []);

  const login = ({ token, user, isChecked }: loginParams) => {
    if (isChecked) {
      localStorage.setItem("token", token);
    }
    sessionStorage.setItem("token", token);
    setLogged(true);
    user && setUserStorage(user);
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
