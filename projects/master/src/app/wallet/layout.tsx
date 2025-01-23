"use client";

import MainLayout from "layouts/mainLayout/mainLayout";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <MainLayout>{children}</MainLayout>;
};

export default Layout;
