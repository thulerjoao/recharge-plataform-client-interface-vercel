"use client";

import React, { ReactElement } from "react";
import { StyleSheetManager } from "styled-components";
import { ButtonInput, LeftElement, Spinner } from "./style";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  height: 28 | 32 | 40 | 48;
  width?: number;
  rounded?: boolean;
  loading?: boolean;
  shadow?: boolean;
  margin?: string;
  isNotSelected?: boolean;
  leftElement?: ReactElement;
}

const Button: React.FC<ButtonProps> = ({
  title,
  height,
  rounded,
  loading,
  shadow,
  margin,
  width,
  isNotSelected,
  leftElement,
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
        prop !== "isNotSelected" &&
        prop !== "leftElement" &&
        prop !== "fontName"
      }
    >
      <ButtonInput
        isNotSelected={isNotSelected}
        width={width}
        margin={margin}
        loading={loading}
        height={height}
        rounded={rounded}
        shadow={shadow}
        {...props}
      >
        {!loading ? (
          <>
            {leftElement && <LeftElement>{leftElement}</LeftElement>}
            <p>{title}</p>
          </>
        ) : (
          <Spinner />
        )}
      </ButtonInput>
    </StyleSheetManager>
  );
};

export default Button;
