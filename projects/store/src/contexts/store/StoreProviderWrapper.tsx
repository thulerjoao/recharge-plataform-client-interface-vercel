import { fetchStore } from "lib/api";
import React from "react";
import { StoreType } from "types/storeType";
import { StoreProvider } from "./StoreProvider";

const StoreProviderWrapper = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const store: StoreType = await fetchStore();

  return <StoreProvider initialStore={store}>{children}</StoreProvider>;
};

export default StoreProviderWrapper;
