"use client";

import React, { InputHTMLAttributes, ReactElement } from "react";
import { StyleSheetManager } from "styled-components";
import { ExternalComponent, InputElement, LeftElement } from "./style";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  height: 40 | 48;
  leftElement?: ReactElement;
  loading?: boolean;
  password?: boolean;
  maxCharacters?: number;
  text?: string;
  margin?: string;
  padding?: string;
}

const Input: React.FC<InputProps> = ({
  leftElement,
  loading,
  password,
  maxCharacters,
  height,
  text,
  margin,
  padding,
  ...props
}) => {
  return (
    <StyleSheetManager
      shouldForwardProp={(prop) =>
        prop !== "loading" &&
        prop !== "margin" &&
        prop !== "leftElement" &&
        prop !== "maxCharacters" &&
        prop !== "leftPaddingInPx" &&
        prop !== "password"
      }
    >
      <ExternalComponent margin={margin}>
        {leftElement && <LeftElement>{leftElement}</LeftElement>}
        <InputElement {...props} height={height} padding={padding} />
      </ExternalComponent>
    </StyleSheetManager>
  );
};

export default Input;
