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

export interface CustomerPurchaseFilters {
  daysWithoutPurchase?: number;
  minPurchases?: number;
  maxDaysWithoutPurchase?: number;
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
  purchaseFilters: CustomerPurchaseFilters;
  setPurchaseFilters: (f: CustomerPurchaseFilters) => void;
  getCustomers: (
    page: number,
    limit: number,
    search?: string,
    status?: CustomerStatusFilter,
    purchaseFilters?: CustomerPurchaseFilters,
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
  const [purchaseFilters, setPurchaseFilters] =
    useState<CustomerPurchaseFilters>({});

  const getCustomers = async (
    page: number,
    limit: number,
    search?: string,
    statusFilter?: CustomerStatusFilter,
    purchaseFiltersParam?: CustomerPurchaseFilters,
  ) => {
    setLoadingCustomers(true);

    const params = new URLSearchParams();
    params.append("page", page.toString());
    params.append("limit", limit.toString());

    if (search && search.trim() !== "") {
      params.append("search", search.trim());
    }

    params.append("status", statusFilter ?? status);

    const pf = purchaseFiltersParam ?? purchaseFilters;
    if (
      pf.daysWithoutPurchase != null &&
      !Number.isNaN(pf.daysWithoutPurchase)
    ) {
      params.append("daysWithoutPurchase", String(pf.daysWithoutPurchase));
    }
    if (pf.minPurchases != null && !Number.isNaN(pf.minPurchases)) {
      params.append("minPurchases", String(pf.minPurchases));
    }
    if (
      pf.maxDaysWithoutPurchase != null &&
      !Number.isNaN(pf.maxDaysWithoutPurchase)
    ) {
      params.append(
        "maxDaysWithoutPurchase",
        String(pf.maxDaysWithoutPurchase),
      );
    }

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
        purchaseFilters,
        setPurchaseFilters,
        getCustomers,
      }}
    >
      {children}
    </CustomersContext.Provider>
  );
};

export const useCustomers = () => useContext(CustomersContext);
