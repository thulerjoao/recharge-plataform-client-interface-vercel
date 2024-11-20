"use client";

import { useDevice } from "context/deviceContext";
import AsideBar from "public/components/asideBar";
import React from "react";
import { StyleSheetManager } from "styled-components";
import { LayoutStyle } from "./style";
import MobiletHeader from "public/components/mobileHeader";

interface LayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  const { device } = useDevice();
  return (
    <StyleSheetManager shouldForwardProp={(prop) => prop !== "device"}>
      <LayoutStyle>
        <section className="mainContent">
          {(device === "desktop" || device === "tablet") && <AsideBar />}
          {device === "mobile" && <MobiletHeader />}
          {children}
        </section>
      </LayoutStyle>
    </StyleSheetManager>
  );
};

export default MainLayout;
