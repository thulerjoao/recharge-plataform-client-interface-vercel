/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { connectionAPIGet } from "@4miga/services/connectionAPI/connection";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { InfluencerResponseType } from "types/influencerType";
import { apiUrl } from "utils/apiUrl";

interface InfluencersProviderProps {
  children: ReactNode;
}

interface InfluencersProviderData {
  loadingInfluencers: boolean;
  setLoadingInfluencers: (loadingInfluencers: boolean) => void;
  influencers: InfluencerResponseType | undefined;
  filter: string;
  page: number;
  setPage: (page: number) => void;
  setFilter: (filter: string) => void;
  status: "all" | "active" | "inactive";
  setStatus: (status: "all" | "active" | "inactive") => void;
  getInfluencers: (
    page: number,
    limit: number,
    search?: string,
    isActive?: "all" | "active" | "inactive",
  ) => void;
}

const InfluencersContext = createContext<InfluencersProviderData>(
  {} as InfluencersProviderData,
);

export const InfluencersProvider = ({ children }: InfluencersProviderProps) => {
  const [loadingInfluencers, setLoadingInfluencers] = useState<boolean>(true);
  const [influencers, setInfluencers] = useState<InfluencerResponseType>();
  const [filter, setFilter] = useState<string>("");
  const [status, setStatus] = useState<"all" | "active" | "inactive">("all");
  const [page, setPage] = useState<number>(1);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Monitorar mudanças na URL e sincronizar estado
  useEffect(() => {
    const urlPage = pathname.split("/").pop();
    const urlSearch = searchParams.get("search") || "";
    const urlStatus =
      (searchParams.get("status") as "all" | "active" | "inactive") || "all";

    if (urlPage && !isNaN(Number(urlPage))) {
      const pageNumber = Number(urlPage);
      if (pageNumber !== page) setPage(pageNumber);
    }

    if (urlSearch !== filter) setFilter(urlSearch);
    if (urlStatus !== status) setStatus(urlStatus);
  }, [
    pathname,
    searchParams,
    page,
    filter,
    status,
    setPage,
    setFilter,
    setStatus,
  ]);

  useEffect(() => {
    setLoadingInfluencers(true);
    getInfluencers(page, 2, filter, status);
    setLoadingInfluencers(false);
  }, [page, filter, status]);

  const getInfluencers = (
    page: number,
    limit: number,
    search?: string,
    status?: "all" | "active" | "inactive",
  ) => {
    setLoadingInfluencers(true);

    const params = new URLSearchParams();
    params.append("page", page.toString());
    params.append("limit", limit.toString());

    if (search && search.trim() !== "") {
      params.append("search", search);
    }

    params.append("status", status);

    connectionAPIGet<InfluencerResponseType>(
      `/influencer?${params.toString()}`,
      apiUrl,
    )
      .then((res) => {
        setInfluencers(res);
      })
      .finally(() => {
        setLoadingInfluencers(false);
      });
  };

  return (
    <InfluencersContext.Provider
      value={{
        loadingInfluencers,
        setLoadingInfluencers,
        influencers,
        page,
        setPage,
        filter,
        setFilter,
        status,
        setStatus,
        getInfluencers,
      }}
    >
      {children}
    </InfluencersContext.Provider>
  );
};

export const useInfluencers = () => useContext(InfluencersContext);
