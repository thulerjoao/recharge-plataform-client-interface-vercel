"use client";

import { useDevice } from "contexts/deviceContext";
import React from "react";
import { StyleSheetManager } from "styled-components";
import Contact from "utils/components/contact/contact";
import Footer from "utils/components/footer/footer";
import Header from "utils/components/header/header";
import SecurityAdvertise from "utils/components/securityAdvertise/securityAdvertise";
import Description from "./common/components/description/description";
import { LayoutStyle } from "./styles/layout.style";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { device } = useDevice();

  return (
    <StyleSheetManager shouldForwardProp={(prop) => prop !== "device"}>
      <LayoutStyle device={device}>
        <Header />
        <section className="mainContent">
          <Description />
          {children}
        </section>
        <SecurityAdvertise />
        <Contact />
        <Footer />
      </LayoutStyle>
    </StyleSheetManager>
  );
};

export default Layout;
