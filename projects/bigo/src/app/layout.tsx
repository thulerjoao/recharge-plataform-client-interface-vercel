import Providers from "contexts/providers";
import StyledComponentsRegistry from "lib/registry";
import React from "react";
import "./globals.css";
import Loading from "./loading";

export const metadata = {
  title: {
    template: "%s - 4miga",
    default: "4miga Games",
  },
  description:
    "Recargas Bigo Live - Recarregue seus diamantes Bigo Live de forma rápida e segura",
  keywords: ["Bigo Live", "recargas", "diamantes", "4miga", "games"],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "4miga Games - Recargas Bigo Live",
    description: "Recarregue seus diamantes Bigo Live de forma rápida e segura",
    type: "website",
    locale: "pt_BR",
  },
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
            <Loading>{children}</Loading>
          </StyledComponentsRegistry>
        </Providers>
      </body>
    </html>
  );
}
