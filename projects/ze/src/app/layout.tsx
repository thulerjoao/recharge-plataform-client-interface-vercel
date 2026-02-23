import Providers from "contexts/providers";
import StyledComponentsRegistry from "lib/registry";
import ToastProvider from "lib/toast-provider";
import React from "react";
import "./globals.css";
import Loading from "./loading";
import { Theme } from "@4miga/design-system/theme/theme";

export const metadata = {
  title: {
    template: "%s - Zé recargas",
    default: "Zé recargas",
  },
  description:
    "Recargas Bigo Live – Compre seus diamantes com rapidez e total segurança",
  keywords: ["Bigo Live", "recargas", "diamantes", "ze", "games", "bigo"],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Zé Recargas - Recargas Bigo e Poppo Live",
    description:
      "Recargas Bigo e Poppo Live – Compre seus diamantes com rapidez e total segurança",
    type: "website",
    locale: "pt_BR",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 1.0,
  themeColor: Theme.zeColors.mainColor,
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
            <ToastProvider />
            <Loading>{children}</Loading>
          </StyledComponentsRegistry>
        </Providers>
      </body>
    </html>
  );
}
