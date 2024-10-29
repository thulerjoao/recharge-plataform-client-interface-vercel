"use client";

import SecondaryLayout from "layouts/secondaryLayout/secondaryLayout";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <SecondaryLayout>{children}</SecondaryLayout>;
};

export default Layout;
