"use client";

import { useDevice } from "context/deviceContext";
import DefaultHeader from "public/components/defaultHeader";
import HeaderEnviroment from "public/components/headerEnviroment";
import { useState } from "react";
import { FixRechargePage } from "./style";

type Props = {
  params: {
    slug: string;
    childSlug: string;
  };
};

const Page = ({ params }: Props) => {
  const { device } = useDevice();

  return (
    <FixRechargePage>
      {(device === "desktop" || device === "tablet") && (
        <HeaderEnviroment>
          <DefaultHeader backWard title="Corrigir recarga" />
        </HeaderEnviroment>
      )}
      {device === "mobile" && (
        <DefaultHeader backWard title="Corrigir recarga" />
      )}
    </FixRechargePage>
  );
};

export default Page;
