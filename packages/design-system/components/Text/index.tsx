"use client";

import React, { useMemo } from "react";
import { StyleSheetManager } from "styled-components";
import { fontNames } from "../../theme/modules/font";
import { TextContainer } from "./style";

interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {
  align?: "center" | "start" | "end" | "justify";
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "u" | "a";
  fontName: fontNames;
  color?: string;
  margin?: string;
  nowrap?: boolean;
  pointer?: boolean;
  underline?: boolean;
  children: React.ReactNode;
}

const Text = ({
  margin,
  tag,
  align,
  fontName,
  color,
  nowrap,
  pointer,
  underline,
  children,
  ...props
}: TextProps) => {
  const fontSize = useMemo(() => {
    switch (fontName) {
      case "SUPER_TINY":
      case "SUPER_TINY_MEDIUM":
      case "SUPER_TINY_SEMI_BOLD":
        return "10px";
      case "TINY":
      case "TINY_MEDIUM":
      case "TINY_SEMI_BOLD":
        return "12px";
      case "SMALL":
      case "SMALL_MEDIUM":
      case "SMALL_SEMI_BOLD":
        return "14px";
      case "REGULAR":
      case "REGULAR_MEDIUM":
      case "REGULAR_SEMI_BOLD":
        return "16px";
      case "LARGE":
      case "LARGE_MEDIUM":
      case "LARGE_SEMI_BOLD":
        return "20px";
      case "BIG":
      case "BIG_MEDIUM":
      case "BIG_SEMI_BOLD":
      case "BIG_BOLD":
        return "24px";
      default:
        return "16px";
    }
  }, [fontName]);

  const fontWeight = useMemo(() => {
    switch (fontName) {
      case "TINY":
      case "SMALL":
      case "REGULAR":
      case "LARGE":
      case "BIG":
      case "SUPER_TINY":
        return 400;
      case "TINY_MEDIUM":
      case "SMALL_MEDIUM":
      case "REGULAR_MEDIUM":
      case "LARGE_MEDIUM":
      case "BIG_MEDIUM":
      case "SUPER_TINY_MEDIUM":
        return 500;
      case "TINY_SEMI_BOLD":
      case "SMALL_SEMI_BOLD":
      case "REGULAR_SEMI_BOLD":
      case "LARGE_SEMI_BOLD":
      case "BIG_SEMI_BOLD":
      case "SUPER_TINY_SEMI_BOLD":
        return 600;
      case "BIG_BOLD":
        return 700;
      default:
        return 400;
    }
  }, [fontName]);

  return (
    <StyleSheetManager
      shouldForwardProp={(prop) =>
        prop !== "align" &&
        prop !== "margin" &&
        prop !== "fontSype" &&
        prop !== "fontWeight" &&
        prop !== "color" &&
        prop !== "nowrap" &&
        prop !== "pointer" &&
        prop !== "underline" &&
        prop !== "threeDotsLimit"
      }
    >
      <TextContainer
        margin={margin}
        align={align}
        as={tag}
        fontSize={fontSize}
        fontWeight={fontWeight}
        color={color}
        nowrap={nowrap}
        pointer={pointer}
        underline={underline}
        {...props}
      >
        {children}
      </TextContainer>
    </StyleSheetManager>
  );
};

export default Text;
