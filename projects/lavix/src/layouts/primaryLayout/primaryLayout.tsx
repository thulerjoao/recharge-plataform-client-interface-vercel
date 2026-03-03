"use client";

import { usePathname } from "next/navigation";
import Contact from "public/components/contact/contact";
import Footer from "public/components/footer/footer";
import Header from "public/components/header/header";
import React, { useEffect } from "react";
import { StyleSheetManager } from "styled-components";
import { LayoutStyle } from "./style";
import WhatsAppFloatingButton from "public/components/whatsappFloatingButton";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const pathname = usePathname();
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <StyleSheetManager shouldForwardProp={(prop) => prop !== "device"}>
      <LayoutStyle>
        <WhatsAppFloatingButton />
        <Header />
        {children}
        <Contact />
        <Footer />
      </LayoutStyle>
    </StyleSheetManager>
  );
};

export default Layout;
