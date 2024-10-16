import React from "react";
import "./globals.css";
import Head from "next/head";
import StyledComponentsRegistry from "lib/registry";

export const metadata = {
  title: {
    template: "%s - 4miga",
    default: "4miga",
  },
  description: "Project created by 4miga",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE-edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
        />
        {/* <meta name="theme-color" content="#700A9A" /> */}
        <title>{metadata.title.default}</title>
      </Head>
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
