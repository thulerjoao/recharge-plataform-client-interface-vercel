/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { connectionAPIGet } from "@4miga/services/connectionAPI/connection";
import { createContext, ReactNode, useContext, useState } from "react";
import { CouponResponseType } from "types/couponType";
import { apiUrl } from "@4miga/services/connectionAPI/url";

interface CouponsProviderProps {
  children: ReactNode;
}

interface CouponsProviderData {
  loadingCoupons: boolean;
  setLoadingCoupons: (loadingCoupons: boolean) => void;
  coupons: CouponResponseType | undefined;
  filter: string;
  page: number;
  setPage: (page: number) => void;
  setFilter: (filter: string) => void;
  status: "all" | "active" | "inactive";
  setStatus: (status: "all" | "active" | "inactive") => void;
  couponType: "all" | "percentage" | "fixed" | "first-purchase";
  setCouponType: (
    couponType: "all" | "percentage" | "fixed" | "first-purchase",
  ) => void;
  getCoupons: (
    page: number,
    limit: number,
    search?: string,
    isActive?: "all" | "active" | "inactive",
    couponType?: "all" | "percentage" | "fixed" | "first-purchase",
  ) => void;
}

const CouponsContext = createContext<CouponsProviderData>(
  {} as CouponsProviderData,
);

export const CouponsProvider = ({ children }: CouponsProviderProps) => {
  const [loadingCoupons, setLoadingCoupons] = useState<boolean>(true);
  const [coupons, setCoupons] = useState<CouponResponseType>();
  const [filter, setFilter] = useState<string>("");
  const [status, setStatus] = useState<"all" | "active" | "inactive">("all");
  const [couponType, setCouponType] = useState<
    "all" | "percentage" | "fixed" | "first-purchase"
  >("all");
  const [page, setPage] = useState<number>(1);

  const getCoupons = async (
    page: number,
    limit: number,
    search?: string,
    status?: "all" | "active" | "inactive",
    couponType?: "all" | "percentage" | "fixed" | "first-purchase",
  ) => {
    setLoadingCoupons(true);

    const params = new URLSearchParams();
    params.append("page", page.toString());
    params.append("limit", limit.toString());

    if (search && search.trim() !== "") {
      params.append("search", search);
    }

    if (status && status !== "all") {
      params.append("status", status);
    }

    if (couponType && couponType !== "all") {
      params.append("type", couponType);
    }

    await connectionAPIGet<CouponResponseType>(
      `/coupon?${params.toString()}`,
      apiUrl,
    )
      .then((res) => {
        setCoupons(res);
      })
      .finally(() => {
        setLoadingCoupons(false);
      });
  };

  return (
    <CouponsContext.Provider
      value={{
        loadingCoupons,
        setLoadingCoupons,
        coupons,
        page,
        setPage,
        filter,
        setFilter,
        status,
        setStatus,
        couponType,
        setCouponType,
        getCoupons,
      }}
    >
      {children}
    </CouponsContext.Provider>
  );
};

export const useCoupons = () => useContext(CouponsContext);
