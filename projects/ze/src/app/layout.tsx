import Providers from "contexts/providers";
import StyledComponentsRegistry from "lib/registry";
import ToastProvider from "lib/toast-provider";
import React from "react";
import "./globals.css";
import Loading from "./loading";
import { Theme } from "@4miga/design-system/theme/theme";

export const metadata = {
  title: {
    template: "%s - Zé recarga",
    default: "Zé recarga",
  },
  description:
    "Recarga Bigo Live – Compre seus diamantes com rapidez e total segurança",
  keywords: ["Bigo Live", "recarga", "diamantes", "ze", "games", "bigo"],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Zé Recarga - Recarga Bigo e Poppo Live",
    description:
      "Recarga Bigo e Poppo Live – Compre seus diamantes com rapidez e total segurança",
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
