"use client";

import { InputHTMLAttributes, ReactElement, forwardRef } from "react";
import { StyleSheetManager, useTheme } from "styled-components";
import Text from "../Text";
import {
  ExternalComponent,
  InputElement,
  LeftElement,
  RightElement,
} from "./style";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  height: 32 | 36 | 40 | 48 | 53;
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

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
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
    },
    ref,
  ) => {
    const theme = useTheme();
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
              <Text fontName="SMALL_MEDIUM" color={theme.text_01}>
                {title}
              </Text>
            </div>
          )}
          {leftElement && <LeftElement>{leftElement}</LeftElement>}
          {rightElement && <RightElement>{rightElement}</RightElement>}
          <InputElement
            {...props}
            ref={ref}
            height={height}
            padding={padding}
          />
        </ExternalComponent>
      </StyleSheetManager>
    );
  },
);

Input.displayName = "Input";

export default Input;
