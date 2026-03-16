"use client";

import Text from "@4miga/design-system/components/Text";
import { usePathname, useRouter } from "next/navigation";
import Contact from "public/components/contact/contact";
import Description from "public/components/description/description";
import Footer from "public/components/footer/footer";
import Header from "public/components/header/header";
import SecurityAdvertise from "public/components/securityAdvertise/securityAdvertise";
import React, { Suspense, useEffect } from "react";
import { StyleSheetManager } from "styled-components";
import { useTheme } from "styled-components";
import BottomOffer from "public/components/bottomOffer/bottomOffer";
import { LayoutStyle } from "./style";
import WhatsAppFloatingButton from "public/components/whatsappFloatingButton";
interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const theme = useTheme();
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
        <WhatsAppFloatingButton />
        <section className="mainContent">
          <div className="description">
            <Suspense fallback={null}>
              <Description />
            </Suspense>
          </div>
          {children}
        </section>
        <section className="offerAndCoupons">
          <BottomOffer />
          <div className="couponsLink">
            <Text
              tag="p"
              align="center"
              fontName="REGULAR"
              color={theme.text_03}
              margin="32px 0 16px 0"
            >
              Quer gastar ainda menos?
            </Text>
            <Text
              tag="a"
              align="center"
              fontName="REGULAR_MEDIUM"
              color={theme.mainColor}
              underline
              pointer
              onClick={() => router.push("/coupons")}
              style={{ cursor: "pointer" }}
            >
              Cupons disponíveis
            </Text>
          </div>
          {/* <div className="couponsLink">
            <Text
              tag="p"
              align="center"
              fontName="REGULAR"
              color={theme.text_03}
              margin="0px 0 16px 0"
            >
              Calcule aqui sua meta mensal de Beans
            </Text>
            <Text
              tag="a"
              align="center"
              fontName="REGULAR_MEDIUM"
              color={theme.mainColor}
              underline
              pointer
              onClick={() => router.push("/calc")}
              style={{ cursor: "pointer" }}
            >
              Calculadora de Beans
            </Text>
          </div> */}
        </section>
        <SecurityAdvertise />
        <Contact />
        <Footer />
      </LayoutStyle>
    </StyleSheetManager>
  );
};

export default Layout;
