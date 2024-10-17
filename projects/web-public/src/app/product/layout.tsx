"use client";

import React from "react";
import Header from "utils/components/header/header";
import { LayoutStyle } from "./styles/layout.style";
import { DescriptionContainer } from "./utils/components/description/style";
import SecurityAdvertise from "utils/components/securityAdvertise/securityAdvertise";
import Contact from "utils/components/contact/contact";
import Footer from "utils/components/footer/footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutStyle>
      <Header />
      <section className="mainContent">
        <DescriptionContainer />
        {children}
      </section>
      <SecurityAdvertise />
      <Contact />
      <Footer />
    </LayoutStyle>
  );
};

export default Layout;
