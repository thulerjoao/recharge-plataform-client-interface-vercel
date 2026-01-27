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
          background: Theme.colors.maindark,
          color: Theme.colors.mainlight,
          border: `1px solid ${Theme.colors.mainHighlight}`,
          borderRadius: "12px",
          padding: "16px",
          fontSize: "14px",
          fontFamily: "'Montserrat', 'Open Sans', sans-serif",
        },
        success: {
          iconTheme: {
            primary: Theme.colors.mainHighlight,
            secondary: Theme.colors.mainlight,
          },
        },
        error: {
          style: {
            background: Theme.colors.maindark,
            color: Theme.colors.mainlight,
            border: `1px solid ${Theme.colors.refused}`,
            borderRadius: "12px",
            padding: "16px",
            fontSize: "14px",
            fontFamily: "'Montserrat', 'Open Sans', sans-serif",
          },
          iconTheme: {
            primary: Theme.colors.refused,
            secondary: Theme.colors.mainlight,
          },
        },
      }}
    />
  );
}
