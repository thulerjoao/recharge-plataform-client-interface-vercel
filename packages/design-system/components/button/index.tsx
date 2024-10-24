"use client";

import React from "react";
import { StyleSheetManager } from "styled-components";
import { ButtonInput, Spinner } from "./style";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  height: 28 | 32 | 40 | 48;
  width?: number;
  rounded?: boolean;
  loading?: boolean;
  shadow?: boolean;
  margin?: string;
}

const Button: React.FC<ButtonProps> = ({
  title,
  height,
  rounded,
  loading,
  shadow,
  margin,
  width,
  ...props
}: ButtonProps) => {
  return (
    <StyleSheetManager
      shouldForwardProp={(prop) =>
        prop !== "height" &&
        prop !== "loading" &&
        prop !== "title" &&
        prop !== "rounded" &&
        prop !== "loading" &&
        prop !== "shadow" &&
        prop !== "margin" &&
        prop !== "width" &&
        prop !== "fontName"
      }
    >
      <ButtonInput
        width={width}
        margin={margin}
        loading={loading}
        height={height}
        rounded={rounded}
        shadow={shadow}
        {...props}
      >
        {!loading ? <p>{title}</p> : <Spinner />}
      </ButtonInput>
    </StyleSheetManager>
  );
};

export default Button;
