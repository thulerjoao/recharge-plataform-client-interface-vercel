"use client";

import React from "react";
import { LayoutComponent } from "./utils/style";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <LayoutComponent>{children}</LayoutComponent>;
};

export default Layout;
