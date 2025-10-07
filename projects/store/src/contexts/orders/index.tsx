/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { connectionAPIGet } from "@4miga/services/connectionAPI/connection";
import { createContext, ReactNode, useContext, useState } from "react";

import { OrderResponseType } from "types/orderType";
import { apiUrl } from "@4miga/services/connectionAPI/url";

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
