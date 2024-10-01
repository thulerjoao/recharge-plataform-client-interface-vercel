"use client";

import React from "react";
import styled from "styled-components";

const StyledTxt = styled.span`
  font-family: sans-serif;
`;

interface Props {
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "u";
  children: React.ReactNode;
}

const Text = ({ tag, children, ...props }: Props) => {
  return (
    <StyledTxt as={tag} {...props}>
      {children}
    </StyledTxt>
  );
};

export default Text;
