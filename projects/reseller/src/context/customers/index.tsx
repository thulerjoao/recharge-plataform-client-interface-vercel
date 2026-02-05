/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { connectionAPIGet } from "@4miga/services/connectionAPI/connection";
import { createContext, ReactNode, useContext, useState } from "react";
import {
  CustomerStatusFilter,
  StoreUsersResponseType,
} from "types/customerType";

interface CustomersProviderProps {
  children: ReactNode;
}

interface CustomersProviderData {
  loadingCustomers: boolean;
  customers: StoreUsersResponseType | undefined;
  filter: string;
  page: number;
  setPage: (page: number) => void;
  setFilter: (filter: string) => void;
  status: CustomerStatusFilter;
  setStatus: (status: CustomerStatusFilter) => void;
  getCustomers: (
    page: number,
    limit: number,
    search?: string,
    status?: CustomerStatusFilter,
  ) => void;
}

const CustomersContext = createContext<CustomersProviderData>(
  {} as CustomersProviderData,
);

export const CustomersProvider = ({ children }: CustomersProviderProps) => {
  const [loadingCustomers, setLoadingCustomers] = useState<boolean>(true);
  const [customers, setCustomers] = useState<StoreUsersResponseType>();
  const [filter, setFilter] = useState<string>("");
  const [status, setStatus] = useState<CustomerStatusFilter>("all");
  const [page, setPage] = useState<number>(1);

  const getCustomers = async (
    page: number,
    limit: number,
    search?: string,
    statusFilter?: CustomerStatusFilter,
  ) => {
    setLoadingCustomers(true);

    const params = new URLSearchParams();
    params.append("page", page.toString());
    params.append("limit", limit.toString());

    if (search && search.trim() !== "") {
      params.append("search", search.trim());
    }

    params.append("status", statusFilter ?? status);

    await connectionAPIGet<StoreUsersResponseType>(`/user?${params.toString()}`)
      .then((res) => {
        setCustomers(res);
      })
      .finally(() => {
        setLoadingCustomers(false);
      });
  };

  return (
    <CustomersContext.Provider
      value={{
        loadingCustomers,
        customers,
        page,
        setPage,
        filter,
        setFilter,
        status,
        setStatus,
        getCustomers,
      }}
    >
      {children}
    </CustomersContext.Provider>
  );
};

export const useCustomers = () => useContext(CustomersContext);
