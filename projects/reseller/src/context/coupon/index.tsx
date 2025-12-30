/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import {
  connectionAPIGet,
  connectionAPIPost,
  connectionAPIDelete,
} from "@4miga/services/connectionAPI/connection";
import { createContext, ReactNode, useContext, useState } from "react";
import { CouponResponseType, CouponType } from "types/couponType";
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
  featuredCoupons: CouponType[];
  loadingFeatured: boolean;
  hasLoadedFeatured: boolean;
  loadingFeaturedAction: Set<string>;
  getFeaturedCoupons: () => Promise<void>;
  addToFeatured: (couponId: string) => Promise<void>;
  removeFromFeatured: (couponId: string) => Promise<void>;
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
  const [featuredCoupons, setFeaturedCoupons] = useState<CouponType[]>([]);
  const [loadingFeatured, setLoadingFeatured] = useState<boolean>(false);
  const [hasLoadedFeatured, setHasLoadedFeatured] = useState<boolean>(false);
  const [loadingFeaturedAction, setLoadingFeaturedAction] = useState<
    Set<string>
  >(new Set());

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

  const getFeaturedCoupons = async () => {
    if (hasLoadedFeatured) {
      return;
    }

    setLoadingFeatured(true);
    try {
      const featured = await connectionAPIGet<CouponType[]>(
        "/coupon/featured",
        apiUrl,
      );
      setFeaturedCoupons(featured);
      setHasLoadedFeatured(true);
    } catch (error) {
      console.error("Erro ao buscar cupons em destaque:", error);
    } finally {
      setLoadingFeatured(false);
    }
  };

  const addToFeatured = async (couponId: string) => {
    setLoadingFeaturedAction((prev) => new Set(prev).add(couponId));
    try {
      await connectionAPIPost(`/coupon/featured`, { couponId }, apiUrl);
      const coupon = coupons?.data?.find((c) => c.id === couponId);
      if (coupon) {
        setFeaturedCoupons((prev) => {
          if (!prev.some((c) => c.id === couponId)) {
            return [...prev, coupon];
          }
          return prev;
        });
      }
    } catch (error) {
      console.error("Erro ao adicionar cupom em destaque:", error);
      throw error;
    } finally {
      setLoadingFeaturedAction((prev) => {
        const next = new Set(prev);
        next.delete(couponId);
        return next;
      });
    }
  };

  const removeFromFeatured = async (couponId: string) => {
    setLoadingFeaturedAction((prev) => new Set(prev).add(couponId));
    try {
      await connectionAPIDelete(`/coupon/featured/${couponId}`, apiUrl);
      setFeaturedCoupons((prev) => prev.filter((c) => c.id !== couponId));
    } catch (error) {
      console.error("Erro ao remover cupom de destaque:", error);
      throw error;
    } finally {
      setLoadingFeaturedAction((prev) => {
        const next = new Set(prev);
        next.delete(couponId);
        return next;
      });
    }
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
        featuredCoupons,
        loadingFeatured,
        hasLoadedFeatured,
        loadingFeaturedAction,
        getFeaturedCoupons,
        addToFeatured,
        removeFromFeatured,
      }}
    >
      {children}
    </CouponsContext.Provider>
  );
};

export const useCoupons = () => useContext(CouponsContext);
