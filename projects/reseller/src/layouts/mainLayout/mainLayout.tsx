"use client";

import AsideBar from "public/components/asideBar";
import React from "react";
import { StyleSheetManager } from "styled-components";
import { CurrentMobile } from "utils/mobileFunction";
import { LayoutStyle } from "./style";

interface LayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  const device = CurrentMobile();
  return (
    <StyleSheetManager shouldForwardProp={(prop) => prop !== "device"}>
      <LayoutStyle>
        <section className="mainContent">
          {device !== "mobile" && <AsideBar />}
          {children}
        </section>
      </LayoutStyle>
    </StyleSheetManager>
  );
};

export default MainLayout;
