import Providers from "contexts/providers";
import StyledComponentsRegistry from "lib/registry";
import ToastProvider from "lib/toast-provider";
import WhatsAppFloatingButton from "public/components/whatsappFloatingButton/whatsappFloatingButton";
import React from "react";
import "./globals.css";
import Loading from "./loading";
import { Theme } from "@4miga/design-system/theme/theme";

export const metadata = {
  title: {
    template: "%s - Lavix",
    default: "Lavix",
  },
  description:
    "Recargas Bigo Live - Recarregue seus diamantes Bigo Live de forma rápida e segura",
  keywords: ["Bigo Live", "recargas", "diamantes", "Lavix"],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Lavix - Recargas Bigo Live",
    description: "Recarregue seus diamantes Bigo Live de forma rápida e segura",
    type: "website",
    locale: "pt_BR",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 1.0,
  themeColor: Theme.lavixColors.mainColor,
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
