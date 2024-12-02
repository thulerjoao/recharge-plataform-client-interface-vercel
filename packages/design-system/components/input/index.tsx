"use client";

import React, { InputHTMLAttributes, ReactElement } from "react";
import { StyleSheetManager } from "styled-components";
import { Theme } from "../../theme/theme";
import Text from "../Text";
import {
  ExternalComponent,
  InputElement,
  LeftElement,
  RightElement,
} from "./style";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  height: 32 | 40 | 48 | 53;
  leftElement?: ReactElement;
  rightElement?: ReactElement;
  loading?: boolean;
  password?: boolean;
  maxCharacters?: number;
  text?: string;
  title?: string;
  titleIcon?: ReactElement;
  margin?: string;
  padding?: string;
}

const Input: React.FC<InputProps> = ({
  leftElement,
  rightElement,
  loading,
  password,
  maxCharacters,
  height,
  text,
  title,
  titleIcon,
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
        prop !== "rightElement" &&
        prop !== "maxCharacters" &&
        prop !== "leftPaddingInPx" &&
        prop !== "password"
      }
    >
      <ExternalComponent margin={margin}>
        {title && (
          <div className="titleContainer">
            {titleIcon && <span>{titleIcon}</span>}
            <Text fontName="SMALL_MEDIUM" color={Theme.colors.mainlight}>
              {title}
            </Text>
          </div>
        )}
        {leftElement && <LeftElement>{leftElement}</LeftElement>}
        {rightElement && <RightElement>{rightElement}</RightElement>}
        <InputElement {...props} height={height} padding={padding} />
      </ExternalComponent>
    </StyleSheetManager>
  );
};

export default Input;
