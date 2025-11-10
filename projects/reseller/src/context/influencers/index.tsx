/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { connectionAPIGet } from "@4miga/services/connectionAPI/connection";
import { createContext, ReactNode, useContext, useState } from "react";
import { InfluencerResponseType } from "types/influencerType";

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

  const getInfluencers = async (
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

    await connectionAPIGet<InfluencerResponseType>(
      `/influencer?${params.toString()}`,
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
