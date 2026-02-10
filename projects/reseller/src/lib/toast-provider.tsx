"use client";

import { Theme } from "@4miga/design-system/theme/theme";
import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3500,
        style: {
          background: Theme.resellerColors.background_01,
          color: Theme.resellerColors.text_01,
          border: `1px solid ${Theme.resellerColors.mainColor}`,
          borderRadius: "12px",
          padding: "16px",
          fontSize: "14px",
          fontFamily: "'Montserrat', 'Open Sans', sans-serif",
        },
        success: {
          iconTheme: {
            primary: Theme.resellerColors.mainColor,
            secondary: Theme.resellerColors.text_01,
          },
        },
        error: {
          style: {
            background: Theme.resellerColors.background_01,
            color: Theme.resellerColors.text_01,
            border: `1px solid ${Theme.resellerColors.refused}`,
            borderRadius: "12px",
            padding: "16px",
            fontSize: "14px",
            fontFamily: "'Montserrat', 'Open Sans', sans-serif",
          },
          iconTheme: {
            primary: Theme.resellerColors.refused,
            secondary: Theme.resellerColors.text_01,
          },
        },
      }}
    />
  );
}
