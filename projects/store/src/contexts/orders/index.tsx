/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { connectionAPIGet } from "@4miga/services/connectionAPI/connection";
import { useAuth } from "contexts/auth";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { OrderType } from "types/orderType";
import { apiUrl } from "utils/apiUrl";

interface OrdersProviderProps {
  children: ReactNode;
}

interface OrdersProviderData {
  orders: OrderType[];
}

const OrdersContext = createContext<OrdersProviderData>(
  {} as OrdersProviderData,
);

export const OrdersProvider = ({ children }: OrdersProviderProps) => {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const { logged } = useAuth();

  useEffect(() => {
    if (logged) {
      connectionAPIGet<OrderType[]>("/order/customer", apiUrl).then((res) => {
        setOrders(res);
      });
    }
  }, [logged]);

  console.log(orders);

  return (
    <OrdersContext.Provider value={{ orders }}>
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => useContext(OrdersContext);
