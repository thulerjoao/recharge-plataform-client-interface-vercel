/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { connectionAPIGet } from "@4miga/services/connectionAPI/connection";
import { useAuth } from "contexts/auth";
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

  const updateOrders = () => {
    setLoadingOrders(true);
    if (logged) {
      connectionAPIGet<OrderType[]>("/order/customer", apiUrl)
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
    return orders.slice(start, end);
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
