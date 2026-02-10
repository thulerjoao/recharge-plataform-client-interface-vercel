"use client";

import { useTheme } from "styled-components";
import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  const theme = useTheme();
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3500,
        style: {
          background: theme.background_01,
          color: theme.text_01,
          border: `1px solid ${theme.mainColor}`,
          borderRadius: "12px",
          padding: "16px",
          fontSize: "14px",
          fontFamily: "'Montserrat', 'Open Sans', sans-serif",
        },
        success: {
          iconTheme: {
            primary: theme.mainColor,
            secondary: theme.text_01,
          },
        },
        error: {
          style: {
            background: theme.background_01,
            color: theme.text_01,
            border: `1px solid ${theme.refused}`,
            borderRadius: "12px",
            padding: "16px",
            fontSize: "14px",
            fontFamily: "'Montserrat', 'Open Sans', sans-serif",
          },
          iconTheme: {
            primary: theme.refused,
            secondary: theme.text_01,
          },
        },
      }}
    />
  );
}
