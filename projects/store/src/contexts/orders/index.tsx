/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { connectionAPIGet } from "@4miga/services/connectionAPI/connection";
import { useAuth } from "contexts/auth";
import { createContext, ReactNode, useContext, useState } from "react";

import { OrderResponseType, OrderType } from "types/orderType";
import { apiUrl } from "utils/apiUrl";

interface OrdersProviderProps {
  children: ReactNode;
}

interface OrdersProviderData {
  loadingOrders: boolean;
  orders: OrderResponseType | undefined;
  getOrders: (page: number, limit: number) => void;
  // updateOrders: () => void;
}

const OrdersContext = createContext<OrdersProviderData>(
  {} as OrdersProviderData,
);

export const OrdersProvider = ({ children }: OrdersProviderProps) => {
  const [loadingOrders, setLoadingOrders] = useState<boolean>(true);
  const [orders, setOrders] = useState<OrderResponseType>();
  const { logged } = useAuth();

  const parseCreatedAt = (createdAt: string): Date => {
    const [datePart, timePart] = createdAt.split(" - ");
    const [day, month, year] = datePart.split("/").map(Number);
    const [hours, minutes] = timePart.split(":").map(Number);
    return new Date(year, month - 1, day, hours, minutes);
  };

  // const updateOrders = () => {
  //   setLoadingOrders(true);
  //   if (logged) {
  //     connectionAPIGet<OrderType[]>("/orders?page=1&limit=6", apiUrl)
  //       .then((res) => {
  //         const sorted = res.sort((a, b) => {
  //           const dateA = parseCreatedAt(a.createdAt);
  //           const dateB = parseCreatedAt(b.createdAt);
  //           return dateB.getTime() - dateA.getTime();
  //         });
  //         setOrders(sorted);
  //       })
  //       .finally(() => {
  //         setLoadingOrders(false);
  //       });
  //   }
  // };

  const getOrders = (page: number, limit: number) => {
    setLoadingOrders(true);
    connectionAPIGet<OrderResponseType>(
      `/orders?page=${page}&limit=${limit}`,
      apiUrl,
    )
      .then((res) => {
        setOrders(res);
      })
      .finally(() => {
        setLoadingOrders(false);
      });
  };

  return (
    <OrdersContext.Provider value={{ loadingOrders, orders, getOrders }}>
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => useContext(OrdersContext);
