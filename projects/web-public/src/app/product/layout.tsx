"use client";

import React from "react";
import Contact from "utils/components/contact/contact";
import Footer from "utils/components/footer/footer";
import Header from "utils/components/header/header";
import SecurityAdvertise from "utils/components/securityAdvertise/securityAdvertise";
import { LayoutStyle } from "./styles/layout.style";
import Description from "./utils/components/description/description";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
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
  );
};

export default Layout;
