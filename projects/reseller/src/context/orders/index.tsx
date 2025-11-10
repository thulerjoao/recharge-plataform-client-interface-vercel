/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { connectionAPIGet } from "@4miga/services/connectionAPI/connection";
import { createContext, ReactNode, useContext, useState } from "react";

import { OrderResponseType, OrderStatus } from "types/orderType";

interface OrdersProviderProps {
  children: ReactNode;
}

interface OrdersProviderData {
  loadingOrders: boolean;
  setLoadingOrders: (loadingOrders: boolean) => void;
  orders: OrderResponseType | undefined;
  filter: string;
  page: number;
  setPage: (page: number) => void;
  setFilter: (filter: string) => void;
  status: OrderStatus | undefined;
  setStatus: (status: OrderStatus | undefined) => void;
  getOrders: (
    page: number,
    limit: number,
    search?: string,
    status?: string,
  ) => void;
}

const OrdersContext = createContext<OrdersProviderData>(
  {} as OrdersProviderData,
);

export const OrdersProvider = ({ children }: OrdersProviderProps) => {
  const [loadingOrders, setLoadingOrders] = useState<boolean>(false);
  const [orders, setOrders] = useState<OrderResponseType>();
  const [filter, setFilter] = useState<string>("");
  const [status, setStatus] = useState<OrderStatus | undefined>(undefined);
  const [page, setPage] = useState<number>(1);

  const getOrders = async (
    page: number,
    limit: number,
    search?: string,
    status?: string,
  ) => {
    setLoadingOrders(true);

    const params = new URLSearchParams();
    params.append("page", page.toString());
    params.append("limit", limit.toString());

    if (search && search.trim() !== "") {
      params.append("search", search);
    }

    if (status && status !== "all") {
      params.append("status", status);
    }

    await connectionAPIGet<OrderResponseType>(
      `/orders/admin?${params.toString()}`,
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
      value={{
        loadingOrders,
        setLoadingOrders,
        orders,
        filter,
        page,
        setPage,
        setFilter,
        status,
        setStatus,
        getOrders,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => useContext(OrdersContext);
