"use client";

import { usePathname } from "next/navigation";
import Contact from "public/components/contact/contact";
import Description from "public/components/description/description";
import Footer from "public/components/footer/footer";
import Header from "public/components/header/header";
import SecurityAdvertise from "public/components/securityAdvertise/securityAdvertise";
import React, { useEffect } from "react";
import { StyleSheetManager } from "styled-components";
import { LayoutStyle } from "./style";
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
