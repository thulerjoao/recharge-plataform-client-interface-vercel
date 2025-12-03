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
  page: number;
  setPage: (page: number) => void;
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
  const [page, setPage] = useState<number>(1);

  const getOrders = async (page: number, limit: number) => {
    setLoadingOrders(true);
    const params = new URLSearchParams();
    params.append("page", page.toString());
    params.append("limit", limit.toString());

    await connectionAPIGet<OrderResponseType>(
      `/orders?${params.toString()}`,
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
    <OrdersContext.Provider
      value={{ loadingOrders, orders, getOrders, page, setPage }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => useContext(OrdersContext);
