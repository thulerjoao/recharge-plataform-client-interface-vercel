import Providers from "context/providers";
import PrivateRoute from "guard/PrivateRoute";
import StyledComponentsRegistry from "lib/registry";
import React from "react";
import "./globals.css";

export const metadata = {
  title: {
    template: "%s - 4miga",
    default: "4miga Reseller",
  },
  description: "Project created by 4miga",
  charset: "utf-8",
};

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 1.0,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body>
        <Providers>
          <StyledComponentsRegistry>
            <PrivateRoute>{children}</PrivateRoute>
          </StyledComponentsRegistry>
        </Providers>
      </body>
    </html>
  );
}
