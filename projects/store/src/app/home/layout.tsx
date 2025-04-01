import PrimaryLayout from "layouts/primaryLayout/primaryLayout";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <PrimaryLayout>{children}</PrimaryLayout>;
};

export default Layout;
