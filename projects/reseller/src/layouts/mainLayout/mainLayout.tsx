"use client";

import { useDevice } from "context/deviceContext";
import { usePathname } from "next/navigation";
import AsideBar from "public/components/asideBar";
import MobiletHeader from "public/components/mobileHeader";
import React from "react";
import { StyleSheetManager } from "styled-components";
import { LayoutStyle } from "./style";

interface LayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  const { device } = useDevice();
  const currentRoute = usePathname();
  const handleSearch = () => {
    const pagesWithSearch = ["/sales", "/recharge"];
    return pagesWithSearch.includes(currentRoute);
  };

  return (
    <StyleSheetManager shouldForwardProp={(prop) => prop !== "device"}>
      <LayoutStyle>
        <section className="mainContent">
          {(device === "desktop" || device === "tablet") && <AsideBar />}
          {device === "mobile" && <MobiletHeader search={handleSearch()} />}
          {children}
        </section>
      </LayoutStyle>
    </StyleSheetManager>
  );
};

export default MainLayout;
