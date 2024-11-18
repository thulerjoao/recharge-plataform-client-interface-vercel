"use client";

import { useDevice } from "context/deviceContext";
import AsideBarDesktop from "public/components/asideBarDesktop";
import React from "react";
import { StyleSheetManager } from "styled-components";
import { LayoutStyle } from "./style";
import AsideBarTablet from "public/components/asideBarTablet";

interface LayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  const { device } = useDevice();
  return (
    <StyleSheetManager shouldForwardProp={(prop) => prop !== "device"}>
      <LayoutStyle>
        <section className="mainContent">
          {device === "desktop" ? <AsideBarDesktop /> : <AsideBarTablet />}
          {children}
        </section>
      </LayoutStyle>
    </StyleSheetManager>
  );
};

export default MainLayout;
