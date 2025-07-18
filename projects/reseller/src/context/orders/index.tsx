/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { connectionAPIGet } from "@4miga/services/connectionAPI/connection";
import { useAuth } from "context/auth";
import { createContext, ReactNode, useContext, useState } from "react";

import { OrderType } from "types/orderType";
import { apiUrl } from "utils/apiUrl";

interface OrdersProviderProps {
  children: ReactNode;
}

interface OrdersProviderData {
  loadingOrders: boolean;
  orders: OrderType[];
  getOrders: (page: number) => OrderType[];
  updateOrders: () => void;
}

const OrdersContext = createContext<OrdersProviderData>(
  {} as OrdersProviderData,
);

export const OrdersProvider = ({ children }: OrdersProviderProps) => {
  const [loadingOrders, setLoadingOrders] = useState<boolean>(false);
  const [orders, setOrders] = useState<OrderType[]>([]);
  const { logged } = useAuth();

  // const parseCreatedAt = (createdAt: string): Date => {
  //   const [datePart, timePart] = createdAt.split(" - ");
  //   const [day, month, year] = datePart.split("/").map(Number);
  //   const [hours, minutes] = timePart.split(":").map(Number);
  //   return new Date(year, month - 1, day, hours, minutes);
  // };

  // const updateOrders = () => {
  //   setLoadingOrders(true);
  //   if (logged) {
  //     connectionAPIGet<OrderType[]>("/order/user", apiUrl)
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

  // const getOrders = (page: number) => {
  //   const start = (page - 1) * 6;
  //   const end = start + 6;
  //   return orders.slice(start, end);
  // };

  const updateOrders = () => {
    setLoadingOrders(true);
    if (logged) {
      connectionAPIGet<OrderType[]>("/order/user", apiUrl)
        .then((res) => {
          setOrders(res);
          setLoadingOrders(false);
        })
        .then(() => {
          setLoadingOrders(false);
        });
    }
  };

  const getOrders = (page: number) => {
    const start = (page - 1) * 6;
    const end = start + 6;
    return orders.slice().reverse().slice(start, end);
  };

  return (
    <OrdersContext.Provider
      value={{ loadingOrders, orders, getOrders, updateOrders }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => useContext(OrdersContext);
