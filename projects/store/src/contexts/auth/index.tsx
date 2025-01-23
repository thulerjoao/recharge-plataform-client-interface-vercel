/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { connectionAPIGet } from "@4miga/services/connectionAPI/connection";
import { useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { baseUrl } from "service/baseUrl";

import { loginParams, UserType } from "types/globalTypes";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthProviderData {
  logged: boolean;
  login: (param: loginParams) => void;
  logout: () => void;
  userStorage: UserType;
}

const AuthContext = createContext<AuthProviderData>({} as AuthProviderData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
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
