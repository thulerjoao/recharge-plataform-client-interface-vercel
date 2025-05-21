"use client";

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
  const currentRoute = usePathname();
  const handleSearch = () => {
    const pagesWithSearch = ["/sales", "/recharge"];
    return pagesWithSearch.includes(currentRoute);
  };

  return (
    <StyleSheetManager shouldForwardProp={(prop) => prop !== "device"}>
      <LayoutStyle>
        <section className="mainContent">
          <div className="desktopNavBar">
            <AsideBar />
          </div>
          <div className="mobileNavbar">
            <MobiletHeader search={handleSearch()} />
          </div>
          {children}
          <div className="mobileBottomSpace" />
        </section>
      </LayoutStyle>
    </StyleSheetManager>
  );
};

export default MainLayout;
