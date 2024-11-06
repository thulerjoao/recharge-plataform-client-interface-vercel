"use client";

import React from "react";
import { StyleSheetManager } from "styled-components";
import { LayoutStyle } from "./style";
import AsideBar from "public/components/asideBar";

interface LayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <StyleSheetManager shouldForwardProp={(prop) => prop !== "device"}>
      <LayoutStyle>
        <section className="mainContent">
          <AsideBar />
          {children}
        </section>
      </LayoutStyle>
    </StyleSheetManager>
  );
};

export default MainLayout;
