/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { connectionAPIGet } from "@4miga/services/connectionAPI/connection";
import { createContext, ReactNode, useContext, useState } from "react";

import { InfluencerResponseType } from "types/influencerType";
import { apiUrl } from "utils/apiUrl";

interface InfluencersProviderProps {
  children: ReactNode;
}

interface InfluencersProviderData {
  loadingInfluencers: boolean;
  influencers: InfluencerResponseType | undefined;
  getInfluencers: (page: number, limit: number) => void;
}

const InfluencersContext = createContext<InfluencersProviderData>(
  {} as InfluencersProviderData,
);

export const InfluencersProvider = ({ children }: InfluencersProviderProps) => {
  const [loadingInfluencers, setLoadingInfluencers] = useState<boolean>(true);
  const [influencers, setInfluencers] = useState<InfluencerResponseType>();

  const getInfluencers = (page: number, limit: number) => {
    setLoadingInfluencers(true);
    connectionAPIGet<InfluencerResponseType>(
      `/influencer?page=${page}&limit=${limit}`,
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
      value={{ loadingInfluencers, influencers, getInfluencers }}
    >
      {children}
    </InfluencersContext.Provider>
  );
};

export const useInfluencers = () => useContext(InfluencersContext);
