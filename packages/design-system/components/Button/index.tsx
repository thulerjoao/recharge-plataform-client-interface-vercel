"use client";

import React from "react";
import { StyleSheetManager } from "styled-components";
import { fontTypesEnum } from "../../theme/modules/font";
import { ButtonInput, Spinner } from "./style";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  fontType?: fontTypesEnum;
  height: 28 | 32 | 40 | 48;
  rounded?: boolean;
  loading?: boolean;
  shadow?: boolean;
  margin?: string;
}

const Button: React.FC<ButtonProps> = ({
  title,
  fontType,
  height,
  rounded,
  loading,
  shadow,
  margin,
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
        prop !== "fontType"
      }
    >
      <ButtonInput
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
