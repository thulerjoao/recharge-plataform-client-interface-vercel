"use client";

import { useDevice } from "contexts/deviceContext";
import React from "react";
import { StyleSheetManager } from "styled-components";
import BottomOffer from "public/components/bottomOffer/bottomOffer";
import Contact from "public/components/contact/contact";
import Footer from "public/components/footer/footer";
import Header from "public/components/header/header";
import SecurityAdvertise from "public/components/securityAdvertise/securityAdvertise";
import { LayoutStyle } from "./style";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { device } = useDevice();

  return (
    <StyleSheetManager shouldForwardProp={(prop) => prop !== "device"}>
      <LayoutStyle device={device}>
        <Header />
        {children}
        <Contact />
        <Footer />
      </LayoutStyle>
    </StyleSheetManager>
  );
};

export default Layout;
