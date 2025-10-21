"use client";

import React, { createContext, useContext, useState } from "react";
import { StoreType } from "types/storeType";

interface StoreContextType {
  store: StoreType | null;
  setStore: (store: StoreType) => void;
}

const StoreContext = createContext<StoreContextType | null>(null);

export const StoreProvider = ({
  children,
  initialStore,
}: {
  children: React.ReactNode;
  initialStore: StoreType;
}) => {
  const [store, setStore] = useState<StoreType | null>(initialStore);

  return (
    <StoreContext.Provider value={{ store, setStore }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }

  return context;
};

export default StoreProvider;
