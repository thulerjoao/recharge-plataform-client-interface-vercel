"use client";

import React, { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import {
  ServerStyleSheet,
  StyleSheetManager,
  ThemeProvider,
} from "styled-components";
import { Theme } from "@4miga/design-system/theme/theme";

export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  const content = (
    <ThemeProvider theme={Theme.resellerColors}>{children}</ThemeProvider>
  );

  if (typeof window !== "undefined") return content;

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      {content}
    </StyleSheetManager>
  );
}
