"use client";

import Contact from "public/components/contact/contact";
import Footer from "public/components/footer/footer";
import Header from "public/components/header/header";
import React from "react";
import { StyleSheetManager } from "styled-components";
import { LayoutStyle } from "./style";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <StyleSheetManager shouldForwardProp={(prop) => prop !== "device"}>
      <LayoutStyle>
        <Header />
        {children}
        <Contact />
        <Footer />
      </LayoutStyle>
    </StyleSheetManager>
  );
};

export default Layout;
