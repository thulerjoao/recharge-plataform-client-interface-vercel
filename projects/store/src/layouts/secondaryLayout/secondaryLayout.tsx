"use client";

import Contact from "public/components/contact/contact";
import Description from "public/components/description/description";
import Footer from "public/components/footer/footer";
import Header from "public/components/header/header";
import SecurityAdvertise from "public/components/securityAdvertise/securityAdvertise";
import React from "react";
import { StyleSheetManager } from "styled-components";
import { ProductType } from "types/productTypes";
import { LayoutStyle } from "./style";
interface LayoutProps {
  children: React.ReactNode;
  products: ProductType[];
}

const Layout: React.FC<LayoutProps> = ({ children, products }) => {
  return (
    <StyleSheetManager shouldForwardProp={(prop) => prop !== "device"}>
      <LayoutStyle>
        <Header />
        <section className="mainContent">
          <Description products={products} />
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
